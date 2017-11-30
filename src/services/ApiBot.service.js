import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource)

class ApiBot {
  constructor (route) {
    this.resource = Vue.resource(process.env.address.apiBot + route + '?v=20150910')
  }
  getResource () {
    return this.resource
  }
  getVueInstance () {
    return Vue
  }
  save (model) {
    model.lang = 'es'
    model.sessionId = '12345'
    return this.resource.save(model)
  }
}

export default ApiBot
