import { Controller, Module } from 'cerebral'
import App from './modules/App'
import Home from './modules/Home'

var devtoolsPort = 8585;
const Devtools = (
  process.env.NODE_ENV === 'production' ? null : require('cerebral/devtools').default
)
if (process.env.NODE_ENV !== 'production') {
  console.log('Cerebral DevTools running on port:', devtoolsPort)
}
export default Controller(
  Module({
    modules: {
      App,
      Home
    },
  }),
  {
    devtools: Devtools && Devtools({
      host: 'localhost:'+devtoolsPort
    }),
  }
)
