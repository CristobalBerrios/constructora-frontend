import ApiService from './Api.service.js'

class GetUser extends ApiService {
  constructor (endpoint) {
    super(endpoint)
    this.name = endpoint
  }
}

export const getUser = new GetUser('getUserLoger')
