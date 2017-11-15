import ApiService from './Api.service.js'

class ObraService extends ApiService {
  constructor (endpoint) {
    super(endpoint)
    this.name = endpoint
  }
}

export const obraService = new ObraService('obras')
