import Layout from 'components/layout'
import { Box } from 'goods-core'
import { GetStaticPaths, GetStaticProps } from 'next'
import { useCallback, useEffect, useRef, useState } from 'react'

type Approach = 'hidden-anchor' | 'dummy-anchor'

type Param = {
  approach: Approach
}

type Props = Param & {
  approachText: string
}

const mapAproach: Record<Approach, string> = {
  'hidden-anchor': 'Hidden Anchor Approach',
  'dummy-anchor': 'Dummy Anchor Approach',
}

const href = 'https://google.com'

function executeDummyAnchor() {
  const link = document.createElement('a')
  link.href = href
  link.target = '_blank'
  link.rel = 'noopener noreferrer'
  document.body.appendChild(link)
  link.click()
  link.remove()
}

export const getStaticPaths: GetStaticPaths<Param> = () => {
  return Promise.resolve({
    fallback: false,
    paths: [
      { params: { approach: 'dummy-anchor' } },
      { params: { approach: 'hidden-anchor' } },
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

const TargetBlankTest: React.FC<Props> = ({ approach, approachText }) => {
  const anchorRef = useRef<HTMLAnchorElement>(null)
  const [isClicked, setIsClicked] = useState(false)

  const handleClickButton = useCallback(() => setIsClicked(true), [])

  useEffect(() => {
    if (isClicked) {
      if (anchorRef.current && approach === 'hidden-anchor') {
        anchorRef.current.click()
      } else if (approach === 'dummy-anchor') {
        executeDummyAnchor()
      }
    }
  }, [isClicked, approach])

  return (
    <Layout
      title='Target Blank Test'
      description={`A test page for target blank with ${approachText}`}
      image='https://avatars.githubusercontent.com/u/44445726?v=4'
      w
      minH='100vh'
      fAlign='center'
      fJustify='center'
    >
      <Box
        as='button'
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
        Click here
      </Box>
      {approach === 'hidden-anchor' && (
        <a
          href={href}
          target='_blank'
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

export default TargetBlankTest
