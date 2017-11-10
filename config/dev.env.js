var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  address: {
    base: '"http://localhost:8000/"',
    api: '"http://localhost:8000/api/"',
    spa: '"http://localhost:8080"'
  },
})
