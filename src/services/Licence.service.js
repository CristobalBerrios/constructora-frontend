import ApiService from './Api.service.js'

class LicenceService extends ApiService {
  constructor (endpoint) {
    super(endpoint)
    this.name = endpoint
  }
}

export const licenceService = new LicenceService('licences{/id}')
