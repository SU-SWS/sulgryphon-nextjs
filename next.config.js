module.exports = {
  images: {
    domains: [process.env.NEXT_IMAGE_DOMAIN],
  },
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true
      }
    ]
  }
}
