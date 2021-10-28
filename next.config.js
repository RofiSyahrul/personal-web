const withPWA = require('next-pwa')
const env = require('dotenv').config().parsed

const generateServiceAccount = require('./scripts/generate-service-account')
const pkg = require('./package.json')

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

generateServiceAccount()

const baseConfig = withBundleAnalyzer({
  env,
  images: {
    domains: ['raw.githubusercontent.com', 'github.githubassets.com'],
  },
  async redirects() {
    return [
      {
        source: '/admin',
        destination: '/admin/index.html',
        permanent: false,
      },
    ]
  },
  webpack(config, { webpack }) {
    config.module.rules.push({
      test: /\.(woff|woff2|eot|ttf|otf)$/,
      loader: 'file-loader',
      options: {
        name: 'fonts/[name].[ext]',
        esModule: false,
      },
    })

    config.plugins.push(
      new webpack.DefinePlugin({
        __DEV__: process.env.NODE_ENV !== 'production',
        GITHUB_URL: JSON.stringify(pkg.homepage),
      })
    )

    return config
  },
})

module.exports = withPWA({
  pwa: {
    dest: 'public',
    disable: process.env.NODE_ENV !== 'production',
    register: true,
    buildExcludes: [/fonts\/.*$/],
    clientsClaim: true,
    skipWaiting: true,
  },
  ...baseConfig,
})
