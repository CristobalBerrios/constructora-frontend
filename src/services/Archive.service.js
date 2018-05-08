import ApiService from './Api.service.js'

class ArchiveService extends ApiService {
  constructor (endpoint) {
    super(endpoint)
    this.name = endpoint
  }
}

export const archiveService = new ArchiveService('archives{/id}')
