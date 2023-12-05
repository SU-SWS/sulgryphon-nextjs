const drupalUrl = new URL(process.env.NEXT_PUBLIC_DRUPAL_BASE_URL);

module.exports = {
  poweredByHeader: false,
  experimental: {
    optimizeCss: true
  },
  images: {
    remotePatterns: [
      {
        protocol: drupalUrl.protocol.replace(':', ''),
        hostname: drupalUrl.hostname,
      },
    ],
    deviceSizes: [
      // 640,
      750,
      // 828,
      // 1080,
      1200,
      // 1920,
      // 2048,
      3840
    ],
    imageSizes: [
      // 16,
      // 32,
      // 48,
      // 64,
      // 96,
      128,
      // 256,
      384
    ],
    loader: 'custom',
    loaderFile: './components/patterns/elements/image-loader.tsx',
  },
  typescript: {
    ignoreBuildErrors: process.env.CI !== 'true',
  },
  async headers() {
    if (process.env.NEXT_PUBLIC_NOBOTS === 'true') {
      return [
        {
          source: '/:path*',
          headers: [
            {
              key: 'X-Robots-Tag',
              value: 'noindex,nofollow,noarchive',
            },
          ],
        }
      ]
    }
    return [];
  },
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true
      },
      {
        source: '/search/website',
        destination: '/search',
        permanent: true,
      },
      {
        source: '/sfx:path*',
        destination: 'https://sfx-01stanford.hosted.exlibrisgroup.com/01stanford:path*',
        permanent: true,
      },
      {
        source: '/sfx/:path*',
        destination: 'https://sfx-01stanford.hosted.exlibrisgroup.com/01stanford/:path*',
        permanent: true,
      }
    ]
  }
}
