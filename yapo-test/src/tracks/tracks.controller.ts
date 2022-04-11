import {
  Body,
  CacheKey,
  Controller,
  Get,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { HttpCacheInterceptor } from '@commons/cache/http-cache.interceptor';
import { TracksService } from '@tracks/tracks.service';
import {
  ISearchTracksResponse,
  SearchedArtist,
} from './interfaces/getTracks.interface';
import { CreateFavoriteSongDto } from './dto/createfavoriteSongs.dto';

@Controller()
export class TracksController {
  constructor(private readonly appService: TracksService) {}

  @UseInterceptors(HttpCacheInterceptor)
  @CacheKey('search_tracks')
  @Get('/search_tracks')
  async getTracks(
    @Query() query: SearchedArtist,
  ): Promise<ISearchTracksResponse> {
    return this.appService.searchTracks(query.name);
  }

  @Post('/favoritos')
  async setFavoriteSong(@Body() favoriteSongDto: CreateFavoriteSongDto) {
    return this.appService.storeFavoriteSong(favoriteSongDto);
  }
}
