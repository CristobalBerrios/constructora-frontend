import ApiService from './Api.service.js'

class UpdateService extends ApiService {
  constructor (endpoint) {
    super(endpoint)
    this.name = endpoint
  }
}

export const updateService = new UpdateService('editUser')
