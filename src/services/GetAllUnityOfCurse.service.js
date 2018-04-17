import ApiService from './Api.service.js'

class GetAllUnityOfCurseService extends ApiService {
  constructor (endpoint) {
    super(endpoint)
    this.name = endpoint
  }
}

export const getAllUnityOfCurseService = new GetAllUnityOfCurseService('getAllUnityOfCurse{/id}')
