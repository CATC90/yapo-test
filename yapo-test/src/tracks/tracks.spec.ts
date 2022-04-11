import { TracksService } from './tracks.service';
import { trackListResponseMock } from '../../resources/mocks/track-list-api.mocks';
import { ITrackListApi, ITracksApiResponse } from './interfaces/api.interface';
import { NotFoundException } from '@nestjs/common';
import { IPersistenceService } from '@commons/interfaces/persistence.interface';

const apiMock: ITrackListApi = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async fetchSongs(name: string): Promise<ITracksApiResponse> {
    return trackListResponseMock;
  },
};

const persistenceMock: IPersistenceService = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async create<T>(json: T): Promise<T> {
    return json;
  },
};

describe('TracksService.searchTracks', () => {
  it('should find all songs correnctly from the data', async () => {
    const tracksService = new TracksService(apiMock, persistenceMock);

    const EXPECTED_RESULT = {
      total_albumes: 3,
      total_canciones: 7,
      albumes: [
        'Angels Fall First (Remastered)',
        'The Sound of Nightwish Reborn - Early Demos for "Dark Passion Play"',
        'Decades (Remastered)',
      ],
      canciones: [
        {
          cancion_id: 1440771177,
          nombre_album: 'Angels Fall First (Remastered)',
          nombre_tema: 'Nightwish',
          fecha_lanzamiento: '1997-01-01',
          preview_url:
            'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/f9/5a/bc/f95abc00-be0e-cd9e-bfdc-281ee4f92ad3/mzaf_18262627304743355585.plus.aac.p.m4a',
          precio: { moneda: 'USD', valor: '9.99' },
        },
        {
          cancion_id: 288794596,
          nombre_album:
            'The Sound of Nightwish Reborn - Early Demos for "Dark Passion Play"',
          nombre_tema: 'Escapist',
          fecha_lanzamiento: '2009-03-11',
          preview_url:
            'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/bc/26/bd/bc26bd72-4901-28b5-a881-a5265bb26b5b/mzaf_7100920437197559864.plus.aac.p.m4a',
          precio: { moneda: 'USD', valor: '9.99' },
        },
        {
          cancion_id: 288794607,
          nombre_album:
            'The Sound of Nightwish Reborn - Early Demos for "Dark Passion Play"',
          nombre_tema: 'While Your Lips Are Still Red',
          fecha_lanzamiento: '2009-03-11',
          preview_url:
            'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/50/fb/40/50fb407d-583e-d7b4-30da-2ff6ed53185c/mzaf_5455757301758842603.plus.aac.p.m4a',
          precio: { moneda: 'USD', valor: '9.99' },
        },
        {
          cancion_id: 1458866002,
          nombre_album: 'Decades (Remastered)',
          nombre_tema: 'Nightwish (Demo, Remastered)',
          fecha_lanzamiento: '1996-01-01',
          preview_url:
            'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/e6/7a/0d/e67a0d5c-e9af-943d-1847-a691e7f6961f/mzaf_10573883316861785937.plus.aac.p.m4a',
          precio: { moneda: 'USD', valor: '10.99' },
        },
        {
          cancion_id: 288794620,
          nombre_album:
            'The Sound of Nightwish Reborn - Early Demos for "Dark Passion Play"',
          nombre_tema: 'Amaranth (Orchestral)',
          fecha_lanzamiento: '2007-08-15',
          preview_url:
            'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/dd/8d/2a/dd8d2ac8-a954-ebc1-5f93-881f824b4b9b/mzaf_13364669255733420920.plus.aac.p.m4a',
          precio: { moneda: 'USD', valor: '9.99' },
        },
        {
          cancion_id: 288794629,
          nombre_album:
            'The Sound of Nightwish Reborn - Early Demos for "Dark Passion Play"',
          nombre_tema: 'Meadows of Heaven (Orchestral)',
          fecha_lanzamiento: '2007-08-15',
          preview_url:
            'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/90/93/bf/9093bf0e-2932-cfbd-c94e-e4b6025fd185/mzaf_17425992691213203470.plus.aac.p.m4a',
          precio: { moneda: 'USD', valor: '9.99' },
        },
        {
          cancion_id: 288794604,
          nombre_album:
            'The Sound of Nightwish Reborn - Early Demos for "Dark Passion Play"',
          nombre_tema: 'Reach (Amaranth Demo Version)',
          fecha_lanzamiento: '2007-08-15',
          preview_url:
            'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/bc/f2/b8/bcf2b824-6faa-82c3-1d37-52d9c749362d/mzaf_551592588399450211.plus.aac.p.m4a',
          precio: { moneda: 'USD', valor: '9.99' },
        },
      ],
    };

    const result = await tracksService.searchTracks('nightwish');

    expect(result).toEqual(EXPECTED_RESULT);
  });

  it('should not found songs if response of api doesnt match with the artistName', async () => {
    const tracksService = new TracksService(apiMock, persistenceMock);
    const result = await tracksService.searchTracks('metallica');

    expect(result).toEqual({
      albumes: [],
      canciones: [],
      total_albumes: 0,
      total_canciones: 0,
    });
  });
});

describe('TracksService.storeFavoriteSong', () => {
  it('Should validate correctly user sended data', async () => {
    const tracksService = new TracksService(apiMock, persistenceMock);
    const favoriteSong = {
      cancion_id: 1440771177,
      nombre_banda: 'nightwish',
      ranking: '5/5',
      usuario: 'carlos',
    };
    const result = await tracksService.storeFavoriteSong(favoriteSong);

    expect(result).toEqual(favoriteSong);
  });

  it('Should throw not found error if validation fails', async () => {
    try {
      const tracksService = new TracksService(apiMock, persistenceMock);
      await tracksService.storeFavoriteSong({
        cancion_id: 1,
        nombre_banda: 'nightwish',
        ranking: '5/5',
        usuario: 'carlos',
      });
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
    }
  });
});
