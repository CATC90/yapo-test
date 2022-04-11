export interface SearchedArtist {
  name: string;
}

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

export interface ISearchTracksResponse {
  total_albumes: number;
  total_canciones: number;
  albumes: Array<string>;
  canciones: Array<ISong>;
}
