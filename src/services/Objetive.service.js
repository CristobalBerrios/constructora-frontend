import ApiService from './Api.service.js'

class ObjetiveService extends ApiService {
  constructor (endpoint) {
    super(endpoint)
    this.name = endpoint
  }
}

export const objetiveService = new ObjetiveService('objectives{/id}')
