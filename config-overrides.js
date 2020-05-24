const { useBabelRc, override, addWebpackPlugin } = require('customize-cra')
var webpack = require('webpack')

const dotenv = require('dotenv')
const env = dotenv.config({ path: '.env' }).parsed || { REACT_APP_ENV: 'production', REACT_APP_SUBDIRECTORY: '/sanjuan' }

// reduce it to a nice object, the same as before
const envKeys = Object.keys(env).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(env[next])
  return prev
}, {})

module.exports = override(
  useBabelRc(),
  addWebpackPlugin(new webpack.DefinePlugin(envKeys))
)
