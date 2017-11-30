import ApiService from './Api.service.js'

class FormasPagoService extends ApiService {
  constructor (endpoint) {
    super(endpoint)
    this.name = endpoint
  }
}

export const formasPagoService = new FormasPagoService('formasPago')
