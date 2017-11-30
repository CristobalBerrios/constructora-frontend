import ApiBot from './ApiBot.service.js'

class ConsultaService extends ApiBot {
  constructor (endpoint) {
    super(endpoint)
    this.name = endpoint
  }
}

export const consultaService = new ConsultaService('query')
