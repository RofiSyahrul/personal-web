import { GetServerSideProps, NextPage } from 'next'

const LinkIndexPage: NextPage = () => <></>

export default LinkIndexPage

export const getServerSideProps: GetServerSideProps = async () => {
  const { default: links } = await import('constants/links')
  return {
    redirect: {
      statusCode: 307,
      destination: links.pokemon,
    },
  }
}
