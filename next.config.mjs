/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      // Vercel Blob（画像ホスティング）
      {
        protocol: 'https',
        hostname: '*.public.blob.vercel-storage.com',
      },
      // Notion添付ファイル（ビルド時にVercel Blobへ転送するが念のため許可）
      {
        protocol: 'https',
        hostname: 'prod-files-secure.s3.us-west-2.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: '*.amazonaws.com',
      },
      // Unsplash（仮写真・開業前差し替え予定）
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      // Pexels（背景写真・開業前差し替え予定）
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
      },
    ],
  },
  // ISR用 / on-demand revalidation
  experimental: {},
}

export default nextConfig
