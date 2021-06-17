import { useEffect } from 'react'
import { GetServerSideProps, NextPage } from 'next'

import Layout from 'components/layout'
import RollingBallImage from 'components/rolling-ball-image'

type Props = {
  redirectedLink: string
  fallback: boolean
}

type Query = {
  slug: string
}

const LinkSlugPage: NextPage<Props> = ({ redirectedLink = '', fallback }) => {
  useEffect(() => {
    if (fallback && redirectedLink.startsWith('http')) {
      setTimeout(() => {
        window.location.href = redirectedLink
      }, 5000)
    }
  }, [fallback, redirectedLink])

  return (
    <Layout w minH='100vh' fJustify='center'>
      <RollingBallImage />
    </Layout>
  )
}

export default LinkSlugPage

export const getServerSideProps: GetServerSideProps<Props, Query> = async ({
  params,
}) => {
  const { default: links } = await import('constants/links')
  const { slug } = params
  const link = links[slug]

  if (!link) {
    const availableSlugs = Object.keys(links)
    const index = Math.floor(Math.random() * availableSlugs.length)
    const alternativeSlug = availableSlugs[index]
    return {
      props: {
        fallback: true,
        redirectedLink: links[alternativeSlug] || links.pokemon,
      },
    }
  }

  return {
    redirect: {
      statusCode: 307,
      destination: link,
    },
  }
}
