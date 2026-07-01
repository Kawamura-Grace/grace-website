'use client'

// お問い合わせフォーム — react-hook-form + zod バリデーション
// ハニーポット（website field）＋ reCAPTCHA v3 でスパム対策

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import type { ContactCategory } from '@/lib/notion/types'
import { cn } from '@/lib/utils/cn'

// ─── reCAPTCHA 型定義（グローバル grecaptcha） ───
type GrecaptchaInstance = {
  execute: (siteKey: string, options: { action: string }) => Promise<string>
  ready: (callback: () => void) => void
}

// ─── バリデーションスキーマ（API route と同一） ───
const schema = z.object({
  category: z.enum(
    ['取材', '法人ギフト', '卸', '採用', 'EC関連', 'メディア掲載', 'インフルエンサー提携', 'その他'],
    { errorMap: () => ({ message: 'お問い合わせ種別を選択してください' }) }
  ),
  name:     z.string().min(1, 'お名前は必須です').max(50),
  company:  z.string().max(100).optional(),
  email:    z.string().email('正しいメールアドレスを入力してください'),
  phone:    z.string().max(20).optional(),
  message:  z.string().min(10, '10文字以上入力してください').max(2000, '2000文字以内で入力してください'),
  privacyAgreed: z.literal(true, {
    errorMap: () => ({ message: 'プライバシーポリシーへの同意が必要です' }),
  }),
  website: z.string().max(0).optional(), // ハニーポット: 値があればスパムと判定
  recaptchaToken: z.string().optional(), // reCAPTCHA v3 トークン
})

type FormData = z.infer<typeof schema>

// ─── スタイル定数 ───
const inputBase = cn(
  'w-full font-noto-serif text-lg bg-white',
  'border border-grace-line px-4 py-3',
  'focus:outline-none focus:border-grace-brown transition-colors',
  'placeholder:text-grace-text-tertiary',
  'text-grace-brown',
)

const labelBase = 'block font-noto-sans text-[10px] tracking-widest text-grace-text-tertiary mb-2'

const CATEGORIES: ContactCategory[] = [
  '取材', '法人ギフト', '卸', '採用', 'EC関連', 'メディア掲載', 'インフルエンサー提携', 'その他',
]

export function ContactForm() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

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

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { category: '取材' },
  })

  const onSubmit = async (data: FormData) => {
    setSubmitError(null)

    // ハニーポット: websiteフィールドに値があればスパム → 送信しない
    if (data.website) return

    // reCAPTCHA v3 トークン取得（サイトキー設定時のみ）
    const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY
    let recaptchaToken: string | undefined
    if (siteKey && typeof window !== 'undefined') {
      const w = window as unknown as { grecaptcha?: GrecaptchaInstance }
      if (w.grecaptcha) {
        recaptchaToken = await new Promise<string>((resolve) => {
          w.grecaptcha!.ready(async () => {
            const token = await w.grecaptcha!.execute(siteKey, { action: 'contact' })
            resolve(token)
          })
        })
      }
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, recaptchaToken }),
      })
      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body?.message ?? '送信に失敗しました')
      }
      setIsSubmitted(true)
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : '送信に失敗しました。しばらく経ってからお試しください。'
      )
    }
  }

  // ─── 送信完了画面 ───
  if (isSubmitted) {
    return (
      <div
        style={{
          background: 'color-mix(in srgb, var(--ink) 5%, var(--bg))',
          border: '1px solid color-mix(in srgb, var(--ink) 14%, var(--bg))',
          padding: 'clamp(40px,6vw,72px)',
          textAlign: 'center',
        }}
      >
        {/* チェックアイコン */}
        <div
          style={{
            width: '40px',
            height: '40px',
            border: '1px solid #7B8B6F',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 24px',
          }}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#7B8B6F"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <p
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontStyle: 'italic',
            fontWeight: 300,
            fontSize: '22px',
            letterSpacing: '0.08em',
            marginBottom: '16px',
          }}
        >
          Thank you
        </p>
        <p
          style={{
            fontSize: '14px',
            lineHeight: 2.1,
            letterSpacing: '0.08em',
            color: 'color-mix(in srgb, var(--ink) 70%, var(--bg))',
          }}
        >
          お問い合わせありがとうございます。<br />
          3営業日以内にご返信いたします。
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>

      {/* ハニーポット: 人間には見えない、ボットが埋めてしまうフィールド */}
      <div
        style={{ position: 'absolute', left: '-9999px', top: '-9999px' }}
        aria-hidden="true"
      >
        <label htmlFor="website">このフィールドは空のままにしてください</label>
        <input
          id="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register('website')}
        />
      </div>

      <div className="space-y-8">

        {/* 1. お問い合わせ種別 */}
        <div>
          <label htmlFor="category" className={labelBase}>
            お問い合わせ種別 <span className="text-grace-gold ml-1">*</span>
          </label>
          <select
            id="category"
            {...register('category')}
            className={cn(inputBase, 'appearance-none cursor-pointer')}
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          {errors.category && (
            <p className="mt-1 font-noto-sans text-[10px] text-grace-gold">{errors.category.message}</p>
          )}
        </div>

        {/* 2. お名前 / 3. 会社名・屋号 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className={labelBase}>
              お名前 <span className="text-grace-gold ml-1">*</span>
            </label>
            <input
              id="name"
              type="text"
              placeholder="山田 花子"
              autoComplete="name"
              {...register('name')}
              className={cn(inputBase, errors.name && 'border-grace-gold')}
            />
            {errors.name && (
              <p className="mt-1 font-noto-sans text-[10px] text-grace-gold">{errors.name.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="company" className={labelBase}>
              会社名・屋号 <span className="text-grace-text-tertiary ml-1">（任意）</span>
            </label>
            <input
              id="company"
              type="text"
              placeholder="株式会社〇〇"
              autoComplete="organization"
              {...register('company')}
              className={inputBase}
            />
          </div>
        </div>

        {/* 4. メールアドレス / 5. 電話番号 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="email" className={labelBase}>
              メールアドレス <span className="text-grace-gold ml-1">*</span>
            </label>
            <input
              id="email"
              type="email"
              placeholder="example@email.com"
              autoComplete="email"
              {...register('email')}
              className={cn(inputBase, errors.email && 'border-grace-gold')}
            />
            {errors.email && (
              <p className="mt-1 font-noto-sans text-[10px] text-grace-gold">{errors.email.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="phone" className={labelBase}>
              電話番号 <span className="text-grace-text-tertiary ml-1">（任意）</span>
            </label>
            <input
              id="phone"
              type="tel"
              placeholder="090-0000-0000"
              autoComplete="tel"
              {...register('phone')}
              className={inputBase}
            />
          </div>
        </div>

        {/* 6. お問い合わせ内容 */}
        <div>
          <label htmlFor="message" className={labelBase}>
            お問い合わせ内容 <span className="text-grace-gold ml-1">*</span>
          </label>
          <textarea
            id="message"
            rows={6}
            placeholder="お問い合わせ内容をご記入ください（10文字以上）"
            {...register('message')}
            className={cn(inputBase, 'resize-none', errors.message && 'border-grace-gold')}
          />
          {errors.message && (
            <p className="mt-1 font-noto-sans text-[10px] text-grace-gold">{errors.message.message}</p>
          )}
        </div>

        {/* 7. プライバシーポリシー同意 */}
        <div>
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              {...register('privacyAgreed')}
              className="mt-0.5 w-4 h-4 accent-grace-brown cursor-pointer flex-shrink-0"
            />
            <span className="font-noto-serif text-base text-grace-text-secondary leading-relaxed">
              <a
                href="/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-grace-brown transition-colors"
              >
                プライバシーポリシー
              </a>
              に同意して送信します
              <span className="text-grace-gold ml-1">*</span>
            </span>
          </label>
          {errors.privacyAgreed && (
            <p className="mt-1 font-noto-sans text-[10px] text-grace-gold">{errors.privacyAgreed.message}</p>
          )}
        </div>

        {/* エラー表示 */}
        {submitError && (
          <div className="bg-grace-gold/10 border border-grace-gold/30 px-4 py-3">
            <p className="font-noto-sans text-[10px] tracking-wide text-grace-brown">{submitError}</p>
          </div>
        )}

        {/* 8. 送信ボタン */}
        <div className="text-center pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className={cn(
              'inline-flex items-center justify-center gap-2 font-noto-sans text-[10px] tracking-widest',
              'px-10 py-4 border transition-all duration-300',
              isSubmitting
                ? 'border-grace-text-tertiary text-grace-text-tertiary cursor-not-allowed'
                : 'border-grace-brown text-grace-brown hover:bg-grace-brown hover:text-grace-offwhite',
            )}
          >
            {isSubmitting ? '送信中...' : 'SEND MESSAGE'}
          </button>
        </div>

      </div>
    </form>
  )
}
