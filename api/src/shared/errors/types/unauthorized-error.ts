import { ServiceError } from '../interfaces/service-error';

export class UnauthorizeError extends Error implements ServiceError {
  constructor() {
    super('Não autorizado');
  }
}
