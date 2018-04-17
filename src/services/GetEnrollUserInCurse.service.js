import ApiService from './Api.service.js'

class GetEnrollUserInCurseService extends ApiService {
  constructor (endpoint) {
    super(endpoint)
    this.name = endpoint
  }
}

export const getEnrollUserInCurseService = new GetEnrollUserInCurseService('getEnrollUserInCurse')
