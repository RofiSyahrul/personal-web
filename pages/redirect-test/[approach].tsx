import Layout from 'components/layout'
import { Box, Spinner } from 'goods-core'
import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/dist/client/router'
import { useCallback, useEffect, useRef, useState } from 'react'

type Approach = 'hidden-anchor' | 'dummy-anchor' | 'window-location'

type Param = {
  approach: Approach
}

type Props = Param & {
  approachText: string
}

const mapAproach: Record<Approach, string> = {
  'hidden-anchor': 'Hidden Anchor Approach',
  'dummy-anchor': 'Dummy Anchor Approach',
  'window-location': 'Window Location Approach',
}

const href = 'https://google.com'

function executeDummyAnchor(isTargetBlank: boolean) {
  const link = document.createElement('a')
  link.href = href
  link.target = isTargetBlank ? '_blank' : '_self'
  link.rel = 'noopener noreferrer'
  document.body.appendChild(link)
  link.click()
  link.remove()
}

function executeWindowLocation() {
  window.location.href = href
}

export const getStaticPaths: GetStaticPaths<Param> = () => {
  return Promise.resolve({
    fallback: false,
    paths: [
      { params: { approach: 'dummy-anchor' } },
      { params: { approach: 'hidden-anchor' } },
      { params: { approach: 'window-location' } },
    ],
  })
}

export const getStaticProps: GetStaticProps<Props, Param> = ({ params }) => {
  const { approach } = params
  return Promise.resolve({
    props: {
      approach,
      approachText: mapAproach[approach],
    },
  })
}

const RedirectTest: React.FC<Props> = ({ approach, approachText }) => {
  const anchorRef = useRef<HTMLAnchorElement>(null)
  const [isClicked, setIsClicked] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const { query } = useRouter()
  const experiments = (query.experiment?.toString?.() ?? '').split(',')
  const isTargetBlank = experiments.includes('targetBlank')
  const delay = Number(query.delay?.toString?.() || '2000')

  const handleClickButton = useCallback(() => {
    if (experiments.includes('delay')) {
      setIsLoading(true)
      setTimeout(() => {
        setIsClicked(true)
        setIsLoading(false)
      }, delay)
      return
    }

    setIsClicked(true)
  }, [experiments, delay])

  useEffect(() => {
    if (isClicked) {
      if (anchorRef.current && approach === 'hidden-anchor') {
        anchorRef.current.click()
      } else if (approach === 'dummy-anchor') {
        executeDummyAnchor(isTargetBlank)
      } else if (approach === 'window-location') {
        executeWindowLocation()
      }
      setIsClicked(false)
    }
  }, [isClicked, approach, isTargetBlank])

  return (
    <Layout
      title='Redirect Test'
      description={`A test page for redirection with ${approachText}`}
      image='https://avatars.githubusercontent.com/u/44445726?v=4'
      w
      minH='100vh'
      fAlign='center'
      fJustify='center'
    >
      <Box
        as='button'
        fDir='row'
        bg='blue50'
        c='white20'
        p='xs'
        radius='l'
        b='none'
        cursor='pointer'
        hoverProps={{
          filter: 'brightness(.9)',
        }}
        onClick={handleClickButton}
      >
        {isLoading && <Spinner c='white30' s={16} mr='xs' />}
        Click here
      </Box>
      {approach === 'hidden-anchor' && (
        <a
          href={href}
          target={isTargetBlank ? '_blank' : '_self'}
          rel='noopener noreferrer'
          ref={anchorRef}
          style={{ visibility: 'hidden', height: 0, width: 0 }}
        >
          Hidden anchor
        </a>
      )}
    </Layout>
  )
}

export default RedirectTest
