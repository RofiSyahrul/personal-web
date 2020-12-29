import { DefaultTheme } from 'styled-components'
import { overrideGoodsTheme } from 'goods-core'

const fontBase = [
  '-apple-system',
  'BlinkMacSystemFont',
  'Segoe UI',
  'Roboto',
  'Oxygen',
  'Ubuntu',
  'Cantarell',
  'Fira Sans',
  'Droid Sans',
  'Helvetica Neue',
  'sans-serif',
].join(', ')

const theme = overrideGoodsTheme({
  breakpoints: { sm: '481px', md: '561px', xl: '1081px' },
}) as DefaultTheme

export const appTheme: DefaultTheme = { ...theme, fontBase }
