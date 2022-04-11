import { IPersistenceService } from '@commons/interfaces/persistence.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PersistenceService implements IPersistenceService {
  private inMemoryStorage = [];

  async create<T>(data: T): Promise<T> {
    this.inMemoryStorage.push(data);

    return data;
  }
}
