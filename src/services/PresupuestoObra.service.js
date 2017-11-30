import ApiService from './Api.service.js'

class PresupuestoObraService extends ApiService {
  constructor (endpoint) {
    super(endpoint)
    this.name = endpoint
  }
}

export const presupuestoObraService = new PresupuestoObraService('obras{/id}/presupuestos')
