import Layout from 'components/layout'
import RollingBallImage from 'components/rolling-ball-image'

const Home: React.FC = () => {
  return (
    <Layout w minH='100vh' fAlign='center' fJustify='center'>
      <RollingBallImage />
    </Layout>
  )
}

export default Home
