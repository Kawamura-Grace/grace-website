import Image from 'next/image'

export default function TeaserPage() {
  return (
    <>
      {/* ゴールドの縦ライン装飾 */}
      <div className="accent-line" aria-hidden="true" />
      <div className="accent-line-bottom" aria-hidden="true" />

      {/* 四隅のわさび色コーナー */}
      <div className="corner corner--tl" aria-hidden="true" />
      <div className="corner corner--tr" aria-hidden="true" />
      <div className="corner corner--bl" aria-hidden="true" />
      <div className="corner corner--br" aria-hidden="true" />

      <main className="teaser-container">
        <h1 className="sr-only">Grace Patisserie</h1>

        <Image
          src="/logo-vertical.png"
          alt="Grace Patisserie"
          width={280}
          height={200}
          className="teaser-logo"
          priority
        />

        <div className="teaser-separator" aria-hidden="true" />

        <p className="teaser-philosophy">美しい暮らしには、お菓子がある。</p>

        <p className="teaser-opening-info">AUTUMN 2026 — OPEN</p>
        <p className="teaser-opening-location">愛知・春日井</p>

        <a
          href="https://www.instagram.com/grace_lifestyle_dessert"
          target="_blank"
          rel="noopener noreferrer"
          className="teaser-instagram"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
            <circle cx="12" cy="12" r="5" />
            <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
          </svg>
          INSTAGRAM
        </a>
      </main>
    </>
  )
}
