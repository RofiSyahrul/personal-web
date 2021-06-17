import { singleLineWithoutSpace } from 'utils/string'

const pokemon = 'https://catch-pokemons.rofisyahrul.com'
const ageCalculator = 'https://age-calculator.rofisyahrul.com'
const moviexp = 'https://moviexp-rofi.netlify.app/'

const ageCalculatorExtension = singleLineWithoutSpace`
  https://chrome.google.com/webstore/detail/
  age-calculator-and-update/olndgnldoobcecnijailjdekbcpfgfeh
`

const links = {
  pokemon,
  'catch-pokemon': pokemon,
  'catch-pokemons': pokemon,
  'age-calculator': ageCalculator,
  'calculate-your-age': ageCalculator,
  'age-calculator-and-updater': ageCalculator,
  'age-calculator-extension': ageCalculatorExtension,
  'age-calculator-chrome-extension': ageCalculatorExtension,
  extension: ageCalculatorExtension,
  moviexp,
  'movie-explorer': moviexp,
  'explore-movies': moviexp,
}

export default links
