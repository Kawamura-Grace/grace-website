'use client'

// メール登録フォーム — reCAPTCHA v3 対応
// EC / オープン通知セクションで使用

import { useState, useEffect } from 'react'
import { z } from 'zod'

// reCAPTCHA 型定義
type GrecaptchaInstance = {
  execute: (siteKey: string, options: { action: string }) => Promise<string>
  ready: (callback: () => void) => void
}

const schema = z.object({
  email: z.string().email('有効なメールアドレスを入力してください'),
})

export function SubscribeForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle')
  const [error, setError] = useState('')

  // reCAPTCHA v3 スクリプトを動的ロード（サイトキー未設定時はスキップ）
  useEffect(() => {
    const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY
    if (!siteKey) return
    const script = document.createElement('script')
    script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`
    script.async = true
    document.head.appendChild(script)
    return () => {
      document.head.removeChild(script)
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    const parsed = schema.safeParse({ email })
    if (!parsed.success) {
      setError(parsed.error.errors[0].message)
      return
    }

    setStatus('loading')

    // reCAPTCHA v3 トークン取得（サイトキー設定時のみ）
    const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY
    let recaptchaToken: string | undefined
    if (siteKey && typeof window !== 'undefined') {
      const w = window as unknown as { grecaptcha?: GrecaptchaInstance }
      if (w.grecaptcha) {
        recaptchaToken = await new Promise<string>((resolve) => {
          w.grecaptcha!.ready(async () => {
            const token = await w.grecaptcha!.execute(siteKey, { action: 'subscribe' })
            resolve(token)
          })
        })
      }
    }

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: parsed.data.email, recaptchaToken }),
      })
      if (res.ok) {
        setStatus('done')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  // 送信完了画面
  if (status === 'done') {
    return (
      <p
        style={{
          fontSize: '13px',
          letterSpacing: '0.18em',
          color: 'rgba(247,243,239,.75)',
          padding: '16px 0',
        }}
      >
        登録ありがとうございます。オープン情報をお届けします。
      </p>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        marginTop: '46px',
        display: 'flex',
        justifyContent: 'center',
        maxWidth: '460px',
        marginLeft: 'auto',
        marginRight: 'auto',
      }}
    >
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={error || 'メールアドレス'}
        aria-label="メールアドレス"
        style={{
          flex: 1,
          minWidth: 0,
          background: 'transparent',
          border: `1px solid ${error ? '#B8956A' : 'rgba(247,243,239,.35)'}`,
          borderRight: 'none',
          color: '#F7F3EF',
          fontFamily: "'Shippori Mincho', 'Hiragino Mincho ProN', 'Yu Mincho', serif",
          fontSize: '13px',
          padding: '15px 18px',
          outline: 'none',
        }}
      />
      <button
        type="submit"
        disabled={status === 'loading'}
        style={{
          background: '#B8956A',
          color: '#2C2421',
          border: 'none',
          cursor: status === 'loading' ? 'wait' : 'pointer',
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontStyle: 'italic',
          fontSize: '13.5px',
          letterSpacing: '0.2em',
          padding: '0 24px',
          transition: 'opacity .3s',
          opacity: status === 'loading' ? 0.7 : 1,
        }}
      >
        {status === 'loading' ? '送信中...' : 'お知らせを受け取る'}
      </button>
    </form>
  )
}
