import ApiService from './Api.service.js'

class PresupuestoPartidaService extends ApiService {
  constructor (endpoint) {
    super(endpoint)
    this.name = endpoint
  }
}

export const presupuestoPartidaService = new PresupuestoPartidaService('Presupuesto/Partida/Item{/id}')
