import { Module } from '@nestjs/common';
import { PersistenceService } from './persistence.service';

export const PERSISTENCE_TOKEN = Symbol('PERSISTENCE_TOKEN');

@Module({
  providers: [
    {
      provide: PERSISTENCE_TOKEN,
      useClass: PersistenceService,
    },
  ],
  exports: [PERSISTENCE_TOKEN],
})
export class PersistenceServiceModule {}
