import ApiService from './Api.service.js'

class EspecialidadService extends ApiService {
  constructor (endpoint) {
    super(endpoint)
    this.name = endpoint
  }
}

export const especialidadService = new EspecialidadService('specialties{/id}')
