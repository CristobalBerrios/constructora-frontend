import ApiService from './Api.service.js'

class AreaService extends ApiService {
  constructor (endpoint) {
    super(endpoint)
    this.name = endpoint
  }
}

export const areaService = new AreaService('areas')
