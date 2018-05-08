import ApiService from './Api.service.js'

class GetArchivoLessonService extends ApiService {
  constructor (endpoint) {
    super(endpoint)
    this.name = endpoint
  }
}

export const getArchivoLessonService = new GetArchivoLessonService('getArchiveslessons{/carpeta}{/fileName}')
