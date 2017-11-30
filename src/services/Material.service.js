import ApiService from './Api.service.js'

class MaterialService extends ApiService {
  constructor (endpoint) {
    super(endpoint)
    this.name = endpoint
  }
}

export const materialService = new MaterialService('materiales{/id}')
