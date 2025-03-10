export class StatusDoesNotExists extends Error {
  statusCode: number
  constructor() {
    super('task with this status does not exists');
    this.name = 'StatusDoesNotExists';
    this.statusCode = 409
  }
}
