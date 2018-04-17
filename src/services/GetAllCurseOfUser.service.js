import ApiService from './Api.service.js'

class GetAllCurseOfUserService extends ApiService {
  constructor (endpoint) {
    super(endpoint)
    this.name = endpoint
  }
}

export const getAllCurseOfUserService = new GetAllCurseOfUserService('getAllCurseOfUser')
