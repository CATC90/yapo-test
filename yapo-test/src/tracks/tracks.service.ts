import {
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { ISearchTracksResponse, ISong } from './interfaces/getTracks.interface';
import { ITrackListApi, TracksApiResult } from './interfaces/api.interface';
import { CreateFavoriteSongDto } from './dto/createfavoriteSongs.dto';
import { PERSISTENCE_TOKEN } from '@commons/persistence/persistence.module';
import { IPersistenceService } from '@commons/interfaces/persistence.interface';
import { format } from 'date-fns';

export const TRACK_LIST_API_TOKEN = Symbol('TRACK_LIST_API_TOKEN');

@Injectable()
export class TracksService {
  private readonly logger = new Logger(TracksService.name);

  constructor(
    @Inject(TRACK_LIST_API_TOKEN) private api: ITrackListApi,
    @Inject(PERSISTENCE_TOKEN) private persistence: IPersistenceService,
  ) {}

  private async fetchSongs(artistName: string) {
    try {
      this.logger.debug('Fetching songs from api');
      return await this.api.fetchSongs(artistName);
    } catch (err) {
      throw new InternalServerErrorException(
        'Error fetching songs from from api',
      );
    }
  }

  private async createFavoriteSong(json: CreateFavoriteSongDto) {
    try {
      return this.persistence.create(json);
    } catch (err) {
      return null;
    }
  }

  private filterSongs(artistName: string): (data: TracksApiResult) => boolean {
    return (data: TracksApiResult) => {
      const isASong = data.wrapperType === 'track' && data.kind === 'song';
      const isSameArtist =
        data.artistName.toLowerCase() === artistName.toLowerCase();

      return isASong && isSameArtist;
    };
  }

  private getsAlbums(songs: Array<TracksApiResult>): Array<string> {
    return Array.from(new Set(songs.map((song) => song.collectionName)));
  }

  private buildSongInfo(song: TracksApiResult): ISong {
    return {
      cancion_id: song.trackId,
      nombre_album: song.collectionName,
      nombre_tema: song.trackName,
      fecha_lanzamiento: format(new Date(song.releaseDate), 'yyyy-MM-dd'),
      preview_url: song.previewUrl,
      precio: {
        moneda: song.currency,
        valor: song.collectionPrice.toString(),
      },
    };
  }

  public async searchTracks(
    artistName: string,
  ): Promise<ISearchTracksResponse> {
    const data = await this.fetchSongs(artistName);

    const filteredSongs = data.results
      .filter(this.filterSongs(artistName))
      .slice(0, 25);

    const albumes = this.getsAlbums(filteredSongs);

    return {
      total_albumes: albumes.length,
      total_canciones: filteredSongs.length,
      albumes,
      canciones: filteredSongs.map(this.buildSongInfo),
    };
  }

  public async storeFavoriteSong(favoriteSong: CreateFavoriteSongDto) {
    const data = await this.fetchSongs(favoriteSong.nombre_banda);

    const isValidSong = data.results
      .filter(this.filterSongs(favoriteSong.nombre_banda))
      .some(({ trackId }) => trackId === favoriteSong.cancion_id);

    if (!isValidSong) {
      throw new NotFoundException(
        `Song id doesn't exist for sended group band`,
      );
    }

    return this.createFavoriteSong(favoriteSong);
  }
}
