import { memo } from 'react'
import isEqual from 'react-fast-compare'
import Head from 'next/head'
import { DefaultTheme } from 'styled-components'
import { Box, BoxProps, useGoods } from 'goods-core'

interface SEOProps {
  title?: string
  description?: string
  image?: string
}

interface PWAProps {
  colorName?: keyof DefaultTheme['colors']
}

interface LayoutProps extends SEOProps, BoxProps, PWAProps {
  children?: React.ReactNode
}

const defaultTitle = 'Syahrul Rofi'
const defaultDescription =
  'A passionate frontend engineer and TypeScript enthusiast'
const url = 'https://rofisyahrul.com'
const defaultImage = `${url}/profile-photo.jpg`
const creator = '@RofiSyahrul'
const appName = 'RofiSyahrul.com'

const keywords = [
  'Syahrul Rofi',
  'Rofi',
  "Rofi's website",
  "Rofi's profile",
  "Rofi's portfolio",
  'About Rofi',
  'next.js',
  'react',
  'typescript',
].join(', ')

const SEO = memo<SEOProps>(
  ({
    title = defaultTitle,
    description = defaultDescription,
    image = defaultImage,
  }) => {
    const pageTitle =
      title === defaultTitle ? title : `${title} | ${defaultTitle}`

    return (
      <Head>
        <title key='title'>{pageTitle}</title>
        <meta name='author' content='Rofi' />
        <meta name='keywords' content={`${keywords}, ${title}`} />
        <link key='canonical' rel='canonical' href={url} />
        <meta name='description' content={description} />
        <meta name='image' content={image} />

        <meta name='og:title' property='og:title' content={pageTitle} />
        <meta name='og:type' property='og:type' content='website' />
        <meta name='og:url' property='og:url' content={url} />
        <meta
          name='og:description'
          property='og:description'
          content={description}
        />
        <meta name='og:image' property='og:image' content={image} />

        <meta name='twitter:dnt' content='on' />
        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:creator' content={creator} />
        <meta name='twitter:title' content={pageTitle} />
        <meta name='twitter:description' content={description} />
        <meta name='twitter:image' content={image} />
      </Head>
    )
  },
  isEqual
)

const appleIconSizes = ['152', '144', '120', '114', '76', '72', '60', '57']
const msImageSizes = ['70x70', '144x144', '150x150', '310x150', '310x310']

const PWA: React.FC<PWAProps> = ({ colorName = 'green50' }) => {
  const { colors } = useGoods()
  const themeColor = colors[colorName]

  return (
    <Head>
      <link
        rel='apple-touch-icon'
        sizes='180x180'
        href='/icons/apple-touch-icon.png'
      />
      {appleIconSizes.map(size => (
        <link
          key={size}
          rel='apple-touch-icon'
          sizes={`${size}x${size}`}
          href={`/icons/apple-touch-icon-${size}x${size}.png`}
        />
      ))}
      <link
        rel='icon'
        type='image/png'
        sizes='32x32'
        href='/icons/favicon-32x32.png'
      />
      <link
        rel='icon'
        type='image/png'
        sizes='192x192'
        href='/icons/android-chrome-192x192.png'
      />
      <link
        rel='icon'
        type='image/png'
        sizes='384x384'
        href='/icons/android-chrome-384x384.png'
      />
      <link
        rel='icon'
        type='image/png'
        sizes='16x16'
        href='/icons/favicon-16x16.png'
      />
      <link rel='manifest' href='/manifest.json' />
      <link
        rel='mask-icon'
        href='/icons/safari-pinned-tab.svg'
        color={themeColor}
      />
      <link rel='icon' href='/icons/favicon.ico' />
      <link rel='shortcut icon' href='/icons/favicon.ico' />
      <meta name='apple-mobile-web-app-title' content={defaultTitle} />
      <meta name='application-name' content={appName} />
      <meta name='msapplication-TileColor' content={themeColor} />
      {msImageSizes.map(size => (
        <meta
          key={size}
          name='msapplication-TileImage'
          content={`/icons/mstile-${size}.png`}
        />
      ))}
      <meta name='msapplication-config' content='/browserconfig.xml' />
      <meta name='theme-color' content={themeColor} />
    </Head>
  )
}

const Layout = memo<LayoutProps>(
  ({ children, title, description, image, colorName, ...props }) => {
    return (
      <>
        <SEO title={title} description={description} image={image} />
        <PWA colorName={colorName} />
        <Box as='main' {...props}>
          {children}
        </Box>
      </>
    )
  },
  isEqual
)

Layout.displayName = 'Layout'

export default Layout
