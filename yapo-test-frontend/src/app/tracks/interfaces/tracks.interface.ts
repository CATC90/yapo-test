import { Observable } from 'rxjs';

export interface IPrice {
  valor: string;
  moneda: string;
}

export interface ISong {
  cancion_id: number;
  nombre_album: string;
  nombre_tema: string;
  preview_url: string;
  fecha_lanzamiento: string;
  precio: IPrice;
}

export interface ISongFlattedCurrency {
  cancion_id: number;
  nombre_album: string;
  nombre_tema: string;
  preview_url: string;
  fecha_lanzamiento: string;
  precio: string;
}

export interface ISearchTracksResponse {
  total_albumes: number;
  total_canciones: number;
  albumes: Array<string>;
  canciones: Array<ISong>;
}

export interface SongList {
  total_albumes: number;
  total_canciones: number;
  albumes: Array<string>;
  canciones: Array<ISongFlattedCurrency>;
}

export interface ITrackService {
  searchTracks(artistName: string): Observable<ISearchTracksResponse>;
}
