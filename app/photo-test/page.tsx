// 写真差し替えテスト画面（Preview専用・検索エンジンに載せない）
// public/photos 配下の自店写真を一覧表示し、サイズ・向きの確認に使う。本番へはマージしない
import type { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: '写真差し替えテスト',
  robots: { index: false, follow: false },
}

// ファイル名 / 用途メモ
const PHOTOS: { file: string; note: string }[] = [
  { file: 'own_exterior.jpg', note: '外観（トップ・アクセス欄）' },
  { file: 'own_exterior_wide.jpg', note: '外観（引き・未使用）' },
  { file: 'own_exterior_sign.jpg', note: '外観（看板寄り・店舗ページ）' },
  { file: 'own_cheesecake.jpg', note: 'チーズケーキ（トップ・章）' },
  { file: 'own_cheesecake6.jpg', note: 'チーズケーキ6個入（トップ・ショーケース）' },
  { file: 'own_cheesecake10.jpg', note: 'チーズケーキ10個入' },
  { file: 'own_cheesecake_single.jpg', note: 'チーズケーキ1個（未使用）' },
  { file: 'own_shortcake.jpg', note: 'ショートケーキ（トップ）' },
  { file: 'own_chocolatecake.jpg', note: 'チョコレートケーキ' },
  { file: 'own_gateau.jpg', note: 'ガトーショコラ（News見出し）' },
  { file: 'gateau_chocolat_petit.jpg', note: 'ガトーショコラ プチガトー（Sweets見出し）' },
  { file: 'own_choux.jpg', note: 'シュークリーム（コンセプト）' },
  { file: 'own_brioche.jpg', note: 'こく生ブリオッシュ（Journal見出し）' },
  { file: 'own_millefeuille.jpg', note: 'ミルフィーユ' },
  { file: 'own_carrotcake.jpg', note: 'キャロットケーキ' },
  { file: 'own_fruitcake.jpg', note: 'フルーツのホールケーキ（該当枠なし）' },
  { file: 'own_gift_s.jpg', note: '詰め合わせギフトS（トップ・焼き菓子の章）' },
  { file: 'own_gift_l_box.jpg', note: '詰め合わせギフトL（Gift見出し背景）' },
  { file: 'own_gift_lid.jpg', note: 'ギフト化粧箱の蓋（Gift法人欄背景）' },
  { file: 'own_financier_box.jpg', note: '詰め合わせ内のフィナンシェ（トップ・暫定）' },
  { file: 'own_madeleine_box.jpg', note: '詰め合わせ内のマドレーヌ（トップ・暫定）' },
  { file: 'own_shortcake2.jpg', note: 'ショートケーキ別カット（トップのショーケース）' },
  { file: 'own_gift_s2.jpg', note: '詰め合わせギフトS別カット（Gift）' },
  { file: 'own_vanilla.jpg', note: 'バニラビーンズ（コンセプト）' },
  { file: 'own_eggs.jpg', note: '卵黄（素材・該当枠なし）' },
  { file: 'own_butter.jpg', note: 'バター（素材・該当枠なし）' },
]

export default function PhotoTestPage() {
  return (
    <main style={{ padding: '32px 16px', maxWidth: 1200, margin: '0 auto' }}>
      <h1 style={{ fontSize: 20, marginBottom: 8 }}>写真差し替えテスト画面</h1>
      <p style={{ fontSize: 13, marginBottom: 24 }}>
        テスト用ブランチ専用。本番へはマージしません。
      </p>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          gap: 16,
        }}
      >
        {PHOTOS.map(({ file, note }) => (
          <figure key={file} style={{ margin: 0 }}>
            <div style={{ position: 'relative', aspectRatio: '4/5', background: '#eee' }}>
              <Image
                src={`/photos/${file}`}
                alt={note}
                fill
                sizes="(max-width: 640px) 50vw, 240px"
                style={{ objectFit: 'cover' }}
              />
            </div>
            <figcaption style={{ fontSize: 12, marginTop: 6, wordBreak: 'break-all' }}>
              {file}
              <br />
              {note}
            </figcaption>
          </figure>
        ))}
      </div>
    </main>
  )
}
