'use client'

// お問い合わせフォーム — react-hook-form + zod バリデーション
// ハニーポット（website field）でスパム対策

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import type { ContactCategory } from '@/lib/notion/types'
import { cn } from '@/lib/utils/cn'

// ─── バリデーションスキーマ ───

const schema = z.object({
  category:  z.enum(['商品・ご来店について', 'ギフトご相談', '取材', '法人ギフト', '卸', '採用', 'EC関連', 'メディア掲載', 'インフルエンサー提携', 'その他'] as const),
  name:      z.string().min(1, 'お名前を入力してください').max(50),
  company:   z.string().max(100).optional(),
  email:     z.string().email('正しいメールアドレスを入力してください'),
  phone:     z.string().max(20).optional(),
  message:   z.string().min(10, '10文字以上でご入力ください').max(2000, '2000文字以内でご入力ください'),
  privacy:   z.boolean().refine(v => v === true, 'プライバシーポリシーに同意してください'),
  website:   z.string().max(0).optional(), // ハニーポット: 入力があればスパムと判定
})

type FormData = z.infer<typeof schema>

// ─── スタイル定数 ───

const inputBase = cn(
  'w-full font-noto-serif text-base text-grace-brown bg-white',
  'border border-grace-line px-4 py-3',
  'focus:outline-none focus:border-grace-brown transition-colors',
  'placeholder:text-grace-text-tertiary',
)

const labelBase = 'block font-noto-sans text-[10px] tracking-widest text-grace-text-tertiary mb-2'

const CATEGORIES: ContactCategory[] = [
  '商品・ご来店について', 'ギフトご相談', '取材', '法人ギフト', '卸', '採用', 'EC関連', 'メディア掲載', 'インフルエンサー提携', 'その他',
]

export function ContactForm() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { category: '商品・ご来店について' },
  })

  const onSubmit = async (data: FormData) => {
    setSubmitError(null)

    // ハニーポット: websiteフィールドに値があればスパム→送信しない
    if (data.website) return

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body?.message ?? '送信に失敗しました')
      }
      setIsSubmitted(true)
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : '送信に失敗しました。しばらく経ってからお試しください。')
    }
  }

  // ─── 送信完了画面 ───
  if (isSubmitted) {
    return (
      <div className="bg-grace-cream border border-grace-line p-12 text-center">
        <div className="w-8 h-8 border border-grace-wasabi rounded-full flex items-center justify-center mx-auto mb-6">
          <svg width="16" height="16" className="block flex-shrink-0 text-grace-wasabi" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        </div>
        <h2 className="font-cormorant italic text-2xl text-grace-brown mb-4">Thank you</h2>
        <p className="font-noto-serif text-base text-grace-text-secondary leading-loose">
          お問い合わせありがとうございます。<br />
          3営業日以内にご返信いたします。
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      {/* ハニーポット（画面外に隠す） */}
      <div
        aria-hidden="true"
        style={{ position: 'absolute', left: '-9999px', top: 'auto', width: '1px', height: '1px', overflow: 'hidden' }}
      >
        <label htmlFor="website">ウェブサイト（入力しないでください）</label>
        <input
          id="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register('website')}
        />
      </div>

      <div className="space-y-8">
        {/* カテゴリ */}
        <div>
          <label htmlFor="category" className={labelBase}>
            お問い合わせ種別 <span className="text-grace-gold ml-1">*</span>
          </label>
          <select
            id="category"
            {...register('category')}
            className={cn(inputBase, 'appearance-none cursor-pointer')}
          >
            {CATEGORIES.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          {errors.category && (
            <p className="mt-1 font-noto-sans text-[10px] text-grace-gold">{errors.category.message}</p>
          )}
        </div>

        {/* お名前・会社名 */}
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
              会社名・店舗名 <span className="text-grace-text-tertiary ml-1">（任意）</span>
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

        {/* メール・電話 */}
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

        {/* メッセージ */}
        <div>
          <label htmlFor="message" className={labelBase}>
            メッセージ <span className="text-grace-gold ml-1">*</span>
          </label>
          <textarea
            id="message"
            rows={6}
            placeholder="お問い合わせ内容をご記入ください"
            {...register('message')}
            className={cn(inputBase, 'resize-none', errors.message && 'border-grace-gold')}
          />
          {errors.message && (
            <p className="mt-1 font-noto-sans text-[10px] text-grace-gold">{errors.message.message}</p>
          )}
        </div>

        {/* プライバシー同意 */}
        <div>
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              {...register('privacy')}
              className="mt-0.5 w-4 h-4 accent-grace-brown cursor-pointer flex-shrink-0"
            />
            <span className="font-noto-serif text-sm text-grace-text-secondary leading-relaxed">
              <a href="/privacy" target="_blank" rel="noopener noreferrer" className="underline hover:text-grace-brown transition-colors">
                プライバシーポリシー
              </a>
              に同意して送信します
              <span className="text-grace-gold ml-1">*</span>
            </span>
          </label>
          {errors.privacy && (
            <p className="mt-1 font-noto-sans text-[10px] text-grace-gold">{errors.privacy.message}</p>
          )}
        </div>

        {/* エラー表示 */}
        {submitError && (
          <div className="bg-grace-gold/10 border border-grace-gold/30 px-4 py-3">
            <p className="font-noto-sans text-[10px] tracking-wide text-grace-brown">{submitError}</p>
          </div>
        )}

        {/* 送信ボタン */}
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
