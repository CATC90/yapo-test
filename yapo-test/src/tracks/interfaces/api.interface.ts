export interface TracksApiResult {
  wrapperType: string;
  artistId: number;
  collectionId: number;
  artistName: string;
  collectionName: string;
  collectionCensoredName: string;
  artistViewUrl: string;
  collectionViewUrl: string;
  artworkUrl60: string;
  artworkUrl100: string;
  collectionPrice: number;
  collectionExplicitness: string;
  trackCount: number;
  copyright?: string;
  country: string;
  currency: string;
  releaseDate: string;
  primaryGenreName: string;
  previewUrl: string;
  description?: string;
  kind?: string;
  trackId: number;
  trackName?: string;
  trackCensoredName?: string;
  trackViewUrl?: string;
  artworkUrl30?: string;
  trackPrice?: number;
  trackExplicitness?: string;
  discCount?: number;
  discNumber?: number;
  trackNumber?: number;
  trackTimeMillis?: number;
  isStreamable?: boolean;
  amgArtistId?: number;
  contentAdvisoryRating?: string;
  collectionArtistId?: number;
  collectionArtistName?: string;
}

export interface ITracksApiResponse {
  resultCount: number;
  results: Array<TracksApiResult>;
}

export interface ITrackListApi {
  fetchSongs(artistName: string): Promise<ITracksApiResponse>;
}
