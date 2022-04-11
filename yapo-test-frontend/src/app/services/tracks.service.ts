import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env';
import { firstValueFrom, Observable } from 'rxjs';
import {
  ISearchTracksResponse,
  ITrackService,
} from '../tracks/interfaces/tracks.interface';

@Injectable({
  providedIn: 'root',
})
export class TracksService implements ITrackService {
  private readonly apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  public searchTracks(artistName: string): Observable<ISearchTracksResponse> {
    const url = `${this.apiUrl}/search_tracks?name=${artistName}`;

    return this.http.get<ISearchTracksResponse>(url);
  }
}
