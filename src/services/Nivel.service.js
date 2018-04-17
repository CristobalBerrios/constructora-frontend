import ApiService from './Api.service.js'

class NivelService extends ApiService {
  constructor (endpoint) {
    super(endpoint)
    this.name = endpoint
  }
}

export const nivelService = new NivelService('levels')
