import ApiService from './Api.service.js'

class CompetitionService extends ApiService {
  constructor (endpoint) {
    super(endpoint)
    this.name = endpoint
  }
}

export const competitionService = new CompetitionService('competences{/id}')
