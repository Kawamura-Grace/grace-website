#!/usr/bin/env bash
# 開業切替PRの自動マージ。4条件を全部満たしたときだけ Draft解除→squashマージする。
# 条件: ①2026年（日本時間）②PRがOPEN ③チェックが全部成功 ④mainと競合なし
# 失敗（条件未達・APIエラー）時は Issue を立てて知らせる。年が違う場合は何もしない。
set -uo pipefail

: "${GH_TOKEN:?GH_TOKEN が必要です}"
REPO="${REPO:?}"; PR_NUMBER="${PR_NUMBER:?}"; PR_HEAD_BRANCH="${PR_HEAD_BRANCH:?}"
YEAR_GUARD="${YEAR_GUARD:-2026}"; DRY_RUN="${DRY_RUN:-false}"

notify_issue() {
  # 通知用Issue。同じタイトルの未解決Issueがあれば作らない
  local title="[自動マージ失敗] 開業切替PR #${PR_NUMBER} を自動マージできませんでした"
  local body="$1"
  if [ "$DRY_RUN" = "true" ]; then echo "DRY_RUN: Issueは作らない: $body"; return; fi
  if gh issue list --repo "$REPO" --state open --search "$title in:title" --json number --jq 'length' | grep -qv '^0$'; then
    echo "同名のIssueが既にあるため作成しない"; return
  fi
  gh issue create --repo "$REPO" --title "$title" --body "$body

実行: ${GITHUB_SERVER_URL:-https://github.com}/${REPO}/actions/runs/${GITHUB_RUN_ID:-}
手動で確認し、問題なければ PR #${PR_NUMBER} を手でマージしてください。" || echo "Issue作成に失敗"
}

fail() { echo "NG: $1"; notify_issue "$1"; exit 1; }

# ① 年の判定（日本時間）。違う年なら何もしないで終了（来年以降は動かない）
year=$(TZ=Asia/Tokyo date +%Y)
if [ "$year" != "$YEAR_GUARD" ]; then
  echo "年が ${YEAR_GUARD} ではない (${year})。何もしない。"; exit 0
fi
echo "OK: 年=${year}"

# PR情報取得（mergeable は計算中だと UNKNOWN になるため最大5回待つ）
pr_json=""
for i in 1 2 3 4 5; do
  pr_json=$(gh pr view "$PR_NUMBER" --repo "$REPO" --json state,isDraft,headRefName,baseRefName,mergeable,statusCheckRollup 2>&1) \
    || fail "PR情報を取得できない: ${pr_json}"
  m=$(echo "$pr_json" | jq -r .mergeable)
  [ "$m" != "UNKNOWN" ] && break
  sleep 20
done

# 取り違え防止：ブランチ名と向き先を確認
head=$(echo "$pr_json" | jq -r .headRefName); base=$(echo "$pr_json" | jq -r .baseRefName)
[ "$head" = "$PR_HEAD_BRANCH" ] && [ "$base" = "main" ] || fail "PR #${PR_NUMBER} の head/base が想定と違う (head=${head}, base=${base})"

# ② OPENのまま
state=$(echo "$pr_json" | jq -r .state)
# 予備のcronで2回目以降に起動した場合など、既にマージ済みなら何もしない
if [ "$state" = "MERGED" ]; then echo "既にマージ済み。何もしない。"; exit 0; fi
[ "$state" = "OPEN" ] || fail "PR #${PR_NUMBER} が OPEN ではない (state=${state})"
echo "OK: state=OPEN"

# ③ チェックが全部成功（1件もない場合も失敗扱い）
total=$(echo "$pr_json" | jq '.statusCheckRollup | length')
notok=$(echo "$pr_json" | jq '[.statusCheckRollup[] | (.conclusion // .state) | select(. != "SUCCESS")] | length')
{ [ "$total" -gt 0 ] && [ "$notok" -eq 0 ]; } || fail "チェックが全部成功ではない (件数=${total}, 成功以外=${notok})"
echo "OK: チェック ${total} 件すべて成功"

# ④ mainと競合なし
mergeable=$(echo "$pr_json" | jq -r .mergeable)
[ "$mergeable" = "MERGEABLE" ] || fail "main と競合している、または判定できない (mergeable=${mergeable})"
echo "OK: mergeable=MERGEABLE"

if [ "$DRY_RUN" = "true" ]; then echo "DRY_RUN: 4条件OK。Ready/マージはしない。"; exit 0; fi

# Draft解除 → squashマージ
is_draft=$(echo "$pr_json" | jq -r .isDraft)
if [ "$is_draft" = "true" ]; then
  gh pr ready "$PR_NUMBER" --repo "$REPO" || fail "Draft解除に失敗"
  echo "Draft解除"
fi
gh pr merge "$PR_NUMBER" --repo "$REPO" --squash --subject "10/15開業切替（自動マージ） (#${PR_NUMBER})" \
  || fail "squashマージに失敗"
echo "マージ完了"
