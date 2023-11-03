module.exports = {
  poweredByHeader: false,
  experimental: {
    optimizeCss: true
  },
  images: {
    domains: [process.env.NEXT_IMAGE_DOMAIN]
  },
  typescript: {
    ignoreBuildErrors: true
  },
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/_next/image',
          destination: '/_next/image?url=:url',
          has: [{type: 'query', key: 'url', value: '(?<url>.*[jpg|png|jpeg|gif]\?itok=\\w+).*'}]
        }
      ]
    };
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
