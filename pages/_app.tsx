import { AppProps } from 'next/app'
import { GoodsProvider } from 'goods-core'
import GlobalStyle from 'styles/global'
import { appTheme } from 'styles/theme'

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <GoodsProvider noGlobalStyle theme={appTheme}>
      <GlobalStyle />
      <Component {...pageProps} />
    </GoodsProvider>
  )
}

export default App
