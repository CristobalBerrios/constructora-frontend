import ApiService from './Api.service.js'

class ExcelService extends ApiService {
  constructor (endpoint) {
    super(endpoint)
    this.name = endpoint
  }
}

export const excelService = new ExcelService('Presupuesto/exportExcel{/id}')
