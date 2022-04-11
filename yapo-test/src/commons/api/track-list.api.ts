import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import {
  ITrackListApi,
  ITracksApiResponse,
} from '@tracks/interfaces/api.interface';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class TrackListApi implements ITrackListApi {
  private readonly searchTrackUrl = 'https://itunes.apple.com/search';
  private readonly logger = new Logger(TrackListApi.name);

  constructor(private http: HttpService) {}

  public async fetchSongs(artistName: string): Promise<ITracksApiResponse> {
    const url = `${this.searchTrackUrl}?term=${artistName}`;

    try {
      const { data } = await firstValueFrom(
        this.http.get<ITracksApiResponse>(url),
      );
      return data;
    } catch (err) {
      this.logger.error(err.message);
      throw new Error(err);
    }
  }
}
