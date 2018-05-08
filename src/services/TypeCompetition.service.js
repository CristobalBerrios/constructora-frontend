import ApiService from './Api.service.js'

class TypeCompetitionService extends ApiService {
  constructor (endpoint) {
    super(endpoint)
    this.name = endpoint
  }
}

export const typeCompetitionService = new TypeCompetitionService('type__competences{/id}')
