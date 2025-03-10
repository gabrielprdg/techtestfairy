export class TaskDoesNotExists extends Error {
  statusCode: number
  constructor() {
    super('task does not exists');
    this.name = 'TaskDoesNotExists';
    this.statusCode = 409
  }
}
