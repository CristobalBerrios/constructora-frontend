import ApiService from './Api.service.js'

class FileTypesService extends ApiService {
  constructor (endpoint) {
    super(endpoint)
    this.name = endpoint
  }
}

export const fileTypesService = new FileTypesService('fileTypes{/id}')
