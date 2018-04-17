import ApiService from './Api.service.js'

class LeccionService extends ApiService {
  constructor (endpoint) {
    super(endpoint)
    this.name = endpoint
  }
}

export const leccionService = new LeccionService('lessons{/id}')
