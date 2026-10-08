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
    ],
  },
  // ISR用 / on-demand revalidation
  experimental: {},
}

export default nextConfig
