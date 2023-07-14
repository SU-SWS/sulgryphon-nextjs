module.exports = {
  poweredByHeader: false,
  experimental: {
    appDir: true,
    optimizeCss: true
  },
  images: {
    domains: [process.env.NEXT_IMAGE_DOMAIN]
  },
  typescript: {
    ignoreBuildErrors: true
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
        source: '/all',
        destination: 'https://discover.stanford.edu/all',
        permanent: true,
      },
      {
        source: '/search/website',
        destination: '/search',
        permanent: true,
      }
    ]
  }
}
