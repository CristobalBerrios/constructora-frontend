import ApiService from './Api.service.js'

class EnrollUsersInProgressService extends ApiService {
  constructor (endpoint) {
    super(endpoint)
    this.name = endpoint
  }
}

export const enrollUsersInProgressService = new EnrollUsersInProgressService('enrollUsersInProgress{/id}')
