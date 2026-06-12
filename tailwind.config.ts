import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // 仕様書 2.1 カラートークン
        'grace-wasabi':         '#7B8B6F',
        'grace-brown':          '#2C2421',
        'grace-gold':           '#B8956A',
        'grace-offwhite':       '#F7F3EF',
        'grace-cream':          '#EFE9E0',
        'grace-stone':          '#DDD4C5',
        'grace-line':           '#E8E2DA',
        'grace-text-primary':   '#2C2421',
        'grace-text-secondary': '#5F5E5A',
        'grace-text-tertiary':  '#888780',
        'grace-bg-primary':     '#FFFFFF',
        'grace-bg-secondary':   '#F7F3EF',
        'grace-bg-dark':        '#2C2421',
        // cinematic-b 時間フェーズトークン
        'phase-bg-morning': '#FAF5EC',
        'phase-bg-day':     '#F7F3EF',
        'phase-bg-dusk':    '#3A2D22',
        'phase-bg-night':   '#211B17',
        'phase-ink-light':  '#F7F3EF',
        'phase-ink-dark':   '#2C2421',
      },
      fontFamily: {
        // 仕様書 2.2 タイポグラフィ
        'cormorant': ['Cormorant Garamond', 'Georgia', 'serif'],
        'noto-serif': ['"Noto Serif JP"', 'Georgia', 'serif'],
        'noto-sans':  ['"Noto Sans JP"', 'sans-serif'],
        // cinematic-b 本文フォント
        'shippori': ['Shippori Mincho', 'Hiragino Mincho ProN', 'Yu Mincho', 'serif'],
      },
      spacing: {
        // 仕様書 2.3 スペーシングスケール
        'xs':  '4px',
        'sm':  '8px',
        'md':  '16px',
        'lg':  '24px',
        'xl':  '32px',
        '2xl': '48px',
        '3xl': '64px',
        '4xl': '96px',
        '5xl': '128px',
      },
      // 仕様書 2.4 ブレイクポイント（Tailwind標準に追記なし・sm/md/lg/xl をそのまま使用）
      maxWidth: {
        // 仕様書 2.5 コンテナー幅
        'content': '1280px',  // コンテンツセクション
        'article': '672px',   // 記事本文（max-w-2xl）
      },
      boxShadow: {
        'grace':    '0 2px 16px rgba(44, 36, 33, 0.08)',
        'grace-md': '0 4px 32px rgba(44, 36, 33, 0.12)',
      },
      transitionDuration: {
        'grace': '300ms',
      },
      animation: {
        // cinematic-b アニメーション
        'vapor': 'vapor 16s ease-in-out infinite',
        'draw':  'draw 2.6s ease forwards',
        'cue':   'cue 2.6s ease-in-out infinite',
      },
      keyframes: {
        vapor: {
          '0%':   { transform: 'translateY(8%) scale(.92)',   opacity: '0' },
          '25%':  { opacity: '.85' },
          '75%':  { opacity: '.5' },
          '100%': { transform: 'translateY(-14%) scale(1.06)', opacity: '0' },
        },
        draw: {
          to: { strokeDashoffset: '0' },
        },
        cue: {
          '0%, 100%': { transform: 'scaleY(.4)', transformOrigin: 'top' },
          '50%':      { transform: 'scaleY(1)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
