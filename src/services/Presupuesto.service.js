import ApiService from './Api.service.js'

class PresupuestoService extends ApiService {
  constructor (endpoint) {
    super(endpoint)
    this.name = endpoint
  }
}

export const presupuestoService = new PresupuestoService('presupuestos{/id}')
