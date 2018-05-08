import ApiService from './Api.service.js'

class LinkService extends ApiService {
  constructor (endpoint) {
    super(endpoint)
    this.name = endpoint
  }
}

export const linkService = new LinkService('links{/id}')
