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
  },
  eslint: {
    ignoreDuringBuilds: process.env.CI !== 'true',
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
