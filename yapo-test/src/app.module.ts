import { CacheModule, Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TracksController } from '@tracks/tracks.controller';
import { TracksService, TRACK_LIST_API_TOKEN } from '@tracks/tracks.service';
import { TrackListApi } from '@commons/api/track-list.api';
import { PersistenceServiceModule } from '@commons/persistence/persistence.module';

@Module({
  imports: [
    HttpModule,
    CacheModule.register({
      ttl: 3600,
      max: 10,
      isGlobal: true,
    }),
    PersistenceServiceModule,
  ],
  controllers: [TracksController],
  providers: [
    {
      provide: TRACK_LIST_API_TOKEN,
      useClass: TrackListApi,
    },
    TracksService,
  ],
})
export class AppModule {}
