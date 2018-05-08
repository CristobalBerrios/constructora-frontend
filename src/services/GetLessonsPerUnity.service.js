import ApiService from './Api.service.js'

class GetLessonsPerUnity extends ApiService {
  constructor (endpoint) {
    super(endpoint)
    this.name = endpoint
  }
}

export const getLessonsPerUnity = new GetLessonsPerUnity('getLessonsPerUnity{/id}')
