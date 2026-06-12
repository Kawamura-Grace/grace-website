// 店舗情報ページ — 静的コンテンツのみ（Notion依存なし）
import type { Metadata } from 'next'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import Link from 'next/link'

// サーバーコンポーネント — イベントハンドラなし・Notion呼び出しなし
// Vercelランタイムエラー(Digest: 257512637)の根本原因だったonMouseEnter/onMouseLeaveを除去

export const metadata: Metadata = {
  title: '店舗のご案内 | Grace',
  description: '愛知県春日井市朝宮町1-2-6。9:30-19:30。テイクアウト専門のパティスリーGraceの店舗情報です。',
}

export default function ShopPage() {
  return (
    <>
      <Header />
      <main>

        {/* ─── ページヘッダー ─── */}
        <section
          style={{
            minHeight: '56svh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 'clamp(70px,10vw,130px) 24px clamp(50px,7vw,90px)',
            textAlign: 'center',
            borderBottom: '1px solid color-mix(in srgb, var(--ink) 10%, var(--bg))',
          }}
        >
          <p
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontStyle: 'italic',
              fontWeight: 300,
              fontSize: '13px',
              letterSpacing: '0.42em',
              color: '#B8956A',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '16px',
            }}
          >
            <span style={{ width: '42px', height: '1px', background: '#B8956A', flexShrink: 0, display: 'inline-block' }} />
            Shop
            <span style={{ width: '42px', height: '1px', background: '#B8956A', flexShrink: 0, display: 'inline-block' }} />
          </p>
          <h1
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontStyle: 'italic',
              fontWeight: 300,
              fontSize: 'clamp(38px,6vw,64px)',
              letterSpacing: '0.08em',
              marginTop: '24px',
              lineHeight: 1.15,
            }}
          >
            店舗のご案内
          </h1>
        </section>

        {/* ─── 店舗写真 + 基本情報グリッド ─── */}
        <section
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
          }}
          className="shop-info-grid"
        >
          {/* 左: 店舗写真（プレースホルダー） */}
          <div style={{ position: 'relative', overflow: 'hidden', minHeight: '460px' }}>
            <img
              src="https://images.pexels.com/photos/33683554/pexels-photo-33683554.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="パティスリー Grace 店舗イメージ（仮素材）"
              loading="lazy"
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                filter: 'saturate(.82) contrast(.96)',
              }}
            />
            {/* PLACEHOLDERバッジ */}
            <span
              style={{
                position: 'absolute',
                bottom: '8px',
                right: '8px',
                zIndex: 2,
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontStyle: 'italic',
                fontSize: '8.5px',
                letterSpacing: '0.26em',
                color: 'rgba(247,243,239,.85)',
                background: 'rgba(44,36,33,.5)',
                padding: '3px 9px',
                backdropFilter: 'blur(2px)',
              }}
            >
              PLACEHOLDER
            </span>
          </div>

          {/* 右: 基本情報 */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              padding: 'clamp(48px,8vw,110px)',
            }}
          >
            <p
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontStyle: 'italic',
                fontWeight: 300,
                fontSize: '13px',
                letterSpacing: '0.42em',
                color: '#B8956A',
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
              }}
            >
              <span style={{ width: '42px', height: '1px', background: '#B8956A', flexShrink: 0, display: 'inline-block' }} />
              Shop Info
            </p>

            <h2
              style={{
                fontFamily: "'Shippori Mincho', 'Hiragino Mincho ProN', 'Yu Mincho', serif",
                fontSize: 'clamp(22px,3.4vw,30px)',
                fontWeight: 500,
                letterSpacing: '0.18em',
                marginTop: '18px',
                lineHeight: 1.9,
              }}
            >
              パティスリー Grace
            </h2>

            {/* 店舗情報テーブル */}
            <dl
              style={{
                marginTop: '32px',
                display: 'grid',
                gridTemplateColumns: 'auto 1fr',
                gap: '13px 30px',
                fontSize: '13.5px',
              }}
            >
              {([
                ['住所', '愛知県春日井市朝宮町1-2-6'],
                ['営業時間', '9:30 - 19:30'],
                ['営業日', '元旦を除き、毎日営業しています'],
                ['駐車場', '8台（お車でのご来店に便利です）'],
                ['形態', 'テイクアウト専門'],
                ['開業', '2026年 秋頃予定'],
              ] as [string, string][]).map(([dt, dd]) => (
                <>
                  <dt key={`dt-${dt}`} style={{ color: '#B8956A', letterSpacing: '0.22em', whiteSpace: 'nowrap' }}>{dt}</dt>
                  <dd key={`dd-${dt}`}>{dd}</dd>
                </>
              ))}
            </dl>

            {/* Instagram */}
            <p style={{ marginTop: '22px', fontSize: '12px', color: '#7B8B6F', letterSpacing: '0.12em' }}>
              最新の営業情報はInstagramをご覧ください。
            </p>
            <a
              href="https://www.instagram.com/patisserie_grace_/"
              target="_blank"
              rel="noopener noreferrer"
              className="shop-link-gold"
              style={{
                display: 'inline-block',
                marginTop: '8px',
                fontSize: '12.5px',
                letterSpacing: '0.18em',
                color: '#B8956A',
                borderBottom: '1px solid rgba(184,149,106,.4)',
                paddingBottom: '2px',
              }}
            >
              @patisserie_grace_
            </a>

            {/* Google Maps ボタン — hoverはCSSクラスで処理（サーバーコンポーネントのためonMouseEnter禁止） */}
            <p style={{ marginTop: '36px' }}>
              <a
                href="https://maps.google.com/?q=愛知県春日井市朝宮町1-2-6"
                target="_blank"
                rel="noopener noreferrer"
                className="shop-arrow-link"
              >
                Google Maps
                <span style={{ fontStyle: 'normal' }}>→</span>
              </a>
            </p>
          </div>
        </section>

        {/* ─── アクセス情報 ─── */}
        <section
          style={{
            padding: 'clamp(60px,8vw,100px) clamp(24px,6vw,80px)',
            borderTop: '1px solid color-mix(in srgb, var(--ink) 10%, var(--bg))',
          }}
        >
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <p
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontStyle: 'italic',
                fontWeight: 300,
                fontSize: '13px',
                letterSpacing: '0.42em',
                color: '#B8956A',
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                marginBottom: 'clamp(28px,4vw,48px)',
              }}
            >
              <span style={{ width: '42px', height: '1px', background: '#B8956A', flexShrink: 0, display: 'inline-block' }} />
              Access
            </p>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                gap: 'clamp(28px,4vw,56px)',
              }}
            >
              <div>
                <h3
                  style={{
                    fontSize: '10px',
                    letterSpacing: '0.28em',
                    color: 'color-mix(in srgb, var(--ink) 50%, var(--bg))',
                    marginBottom: '12px',
                  }}
                >
                  PARKING
                </h3>
                <p style={{ fontSize: '14px', lineHeight: 2.0, letterSpacing: '0.06em' }}>
                  店舗前に駐車場8台ございます。<br />
                  お車でのご来店が便利です。
                </p>
              </div>
              <div>
                <h3
                  style={{
                    fontSize: '10px',
                    letterSpacing: '0.28em',
                    color: 'color-mix(in srgb, var(--ink) 50%, var(--bg))',
                    marginBottom: '12px',
                  }}
                >
                  HOURS
                </h3>
                <p style={{ fontSize: '14px', lineHeight: 2.0, letterSpacing: '0.06em' }}>
                  9:30 - 19:30<br />
                  <span style={{ fontSize: '12px', color: 'color-mix(in srgb, var(--ink) 55%, var(--bg))' }}>
                    元旦を除き、毎日営業しています
                  </span>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Instagram 導線 ─── */}
        <section
          style={{
            background: '#2C2421',
            color: '#F7F3EF',
            textAlign: 'center',
            padding: 'clamp(60px,8vw,100px) 24px',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: '-10%',
              background: 'radial-gradient(ellipse 55% 60% at 50% 30%, rgba(184,149,106,.15), transparent 65%)',
              pointerEvents: 'none',
            }}
          />
          <div style={{ position: 'relative' }}>
            <p
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontStyle: 'italic',
                fontWeight: 300,
                fontSize: '13px',
                letterSpacing: '0.42em',
                color: '#B8956A',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '16px',
                marginBottom: '22px',
              }}
            >
              <span style={{ width: '42px', height: '1px', background: '#B8956A', flexShrink: 0, display: 'inline-block' }} />
              Instagram
              <span style={{ width: '42px', height: '1px', background: '#B8956A', flexShrink: 0, display: 'inline-block' }} />
            </p>
            <p
              style={{
                fontSize: '13.5px',
                color: 'rgba(247,243,239,.72)',
                letterSpacing: '0.12em',
                marginBottom: '32px',
              }}
            >
              日々の様子・ショーケースの新着情報はInstagramでご覧ください。
            </p>
            {/* hoverはCSSクラスで処理 */}
            <a
              href="https://www.instagram.com/patisserie_grace_/"
              target="_blank"
              rel="noopener noreferrer"
              className="shop-arrow-link shop-arrow-link--light"
            >
              @patisserie_grace_
              <span style={{ fontStyle: 'normal' }}>→</span>
            </a>
          </div>
        </section>

        {/* ─── お問い合わせ誘導 ─── */}
        <section
          style={{
            padding: 'clamp(50px,7vw,80px) 24px',
            textAlign: 'center',
            borderTop: '1px solid color-mix(in srgb, var(--ink) 10%, var(--bg))',
          }}
        >
          <p style={{ fontSize: '14px', letterSpacing: '0.12em', marginBottom: '28px', color: 'color-mix(in srgb, var(--ink) 65%, var(--bg))' }}>
            ご不明な点はお気軽にお問い合わせください
          </p>
          {/* Link コンポーネント — hoverはCSSクラスで処理 */}
          <Link
            href="/contact"
            className="shop-arrow-link"
          >
            Contact
            <span style={{ fontStyle: 'normal' }}>→</span>
          </Link>
        </section>

      </main>
      <Footer />

      {/* ページ専用スタイル — hover・レスポンシブをCSSで定義（サーバーコンポーネントのためonMouseEnterは使わない） */}
      <style>{`
        .shop-info-grid {
          grid-template-columns: 1fr 1fr;
        }
        @media (max-width: 768px) {
          .shop-info-grid {
            grid-template-columns: 1fr !important;
          }
        }

        /* 矢印付きリンク共通スタイル */
        .shop-arrow-link {
          display: inline-flex;
          align-items: center;
          gap: 14px;
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-style: italic;
          font-weight: 300;
          font-size: 14px;
          letter-spacing: 0.3em;
          color: inherit;
          border-bottom: 1px solid #B8956A;
          padding: 0 4px 8px;
          transition: opacity .3s, gap .3s;
        }
        .shop-arrow-link:hover {
          opacity: 0.55;
          gap: 20px;
        }

        /* 暗背景上の矢印リンク（Instagramセクション） */
        .shop-arrow-link--light {
          color: #F7F3EF;
          border-bottom-color: rgba(184,149,106,.6);
        }

        /* ゴールドカラーのシンプルリンク */
        .shop-link-gold:hover {
          opacity: 0.7;
        }
      `}</style>
    </>
  )
}
