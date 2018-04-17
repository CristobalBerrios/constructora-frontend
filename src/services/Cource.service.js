import ApiService from './Api.service.js'

class CourceService extends ApiService {
  constructor (endpoint) {
    super(endpoint)
    this.name = endpoint
  }
}

export const courceService = new CourceService('courses{/id}')
