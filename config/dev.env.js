var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  address: {
    base: '"http://localhost:8000/"',
    api: '"http://localhost:8000/api/"',
    spa: '"http://localhost:8080"',
    apiBot: '"https://api.dialogflow.com/v1/"',
    tokenBot: '"Bearer f6ba9d5679854013a5b5f2abf989a4e4"'
  },
})
