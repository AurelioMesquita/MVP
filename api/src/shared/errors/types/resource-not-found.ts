import { ServiceError } from '../interfaces/service-error';

export class ResourceNotFoundError extends Error implements ServiceError {
  constructor() {
    super('Recurso nao encontrado');
  }
}
