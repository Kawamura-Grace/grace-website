# design-reference

このディレクトリは signature-v1 デザインリファレンス用。

## grace_top_mock_v1.html

視覚仕様の正本 HTML。
G:\マイドライブ\grace_top_mock_v1.html が存在する場合はここにコピーして使用。

現状: ファイルが Google Drive ルートに見つからなかったため、
仕様は依頼文（Phase 1 実装指示）に基づき実装済み。

mock HTML が入稿された場合:
1. このディレクトリに grace_top_mock_v1.html を配置
2. デザイントークン・レイアウトと実装を照合し差分を修正

## デザイントークン（実装済み）

| トークン    | 値       |
|------------|---------|
| wasabi     | #7B8B6F |
| brown      | #2C2421 |
| gold       | #B8956A |
| cream      | #F7F3EF |
| cream-deep | #EFE9E2 |

## アクション言語

- easing: cubic-bezier(.22,1,.36,1)
- duration: 0.8s / 1.2s
- reveal: opacity 0→1 + translateY(12px→0), threshold 0.15
