import Image from 'next/image'

/**
 * Hero セクション — シネマティック案B
 * - 動画背景（/video/hero.mp4 プレースホルダー）
 * - 動画読み込み失敗時フォールバック: Unsplash 静止画
 * - 画像ロゴ（/logo-vertical.png、brightness-0 invert）
 * - ゴールドのセパレーター線
 * - タグライン（Noto Serif JP）
 * - SCROLLインジケーター
 */
export function Hero() {
  return (
    <section className="relative overflow-hidden bg-grace-brown" style={{ height: '820px' }}>

      {/* 動画背景 */}
      <video
        src="/video/hero.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        style={{ filter: 'brightness(0.7) contrast(1.05)' }}
        aria-hidden="true"
      >
        {/* 動画が読み込めない場合のフォールバック */}
        <Image
          src="https://images.unsplash.com/photo-1612203985729-70726954388c?q=80&w=1920&auto=format&fit=crop"
          alt=""
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
      </video>

      {/* グラデーションオーバーレイ */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, rgba(20,16,12,.55) 0%, rgba(20,16,12,.1) 35%, rgba(20,16,12,.15) 70%, rgba(20,16,12,.6) 100%)',
        }}
        aria-hidden="true"
      />

      {/* 中央コンテンツ */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-6">
        {/* 画像ロゴ（mainブランチのサイズ・スタイルを踏襲） */}
        <Image
          src="/logo-vertical.png"
          alt="Pâtisserie Grace"
          width={200}
          height={140}
          className="mx-auto mb-8 brightness-0 invert opacity-90"
          priority
        />

        {/* ゴールドのセパレーター線 */}
        <div
          className="bg-grace-gold"
          style={{ width: '60px', height: '1px', margin: '0 auto 34px' }}
          aria-hidden="true"
        />

        {/* タグライン */}
        <p
          className="font-noto-serif text-grace-offwhite"
          style={{ fontSize: '22px', letterSpacing: '3px', fontWeight: 300, opacity: 0.95 }}
        >
          美しい暮らしには、お菓子がある。
        </p>
      </div>

      {/* SCROLLインジケーター */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-grace-offwhite/80">
        <span className="font-noto-serif text-[9px] tracking-[3px]">SCROLL</span>
        <span className="text-xl">↓</span>
      </div>
    </section>
  )
}
