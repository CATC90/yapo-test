import { Component, Inject } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { TracksService } from '@services/tracks.service';
import { ISearchTracksResponse, SongList } from './interfaces/tracks.interface';

const TABLE_HEAD = [
  {
    fieldName: 'nombre_tema',
    title: 'Track name',
  },
  {
    fieldName: 'nombre_album',
    title: 'Album',
  },
  {
    fieldName: 'fecha_lanzamiento',
    title: 'Release',
  },
  {
    fieldName: 'precio',
    title: 'Price',
  },
];

@Component({
  selector: 'app-tracks',
  templateUrl: './tracks.component.html',
  styleUrls: ['./tracks.component.scss'],
})
export class TracksComponent {
  public artistName: string = '';
  public currentArtist: string = '';
  public foundedSongs!: SongList;
  public filteredSongs?: SongList;
  public filterAlbum = 'all';
  public readonly getTableHead = () => TABLE_HEAD;

  constructor(private service: TracksService) {}

  private transformCurrency(data: ISearchTracksResponse) {
    return {
      ...data,
      canciones: data.canciones.map((song) => ({
        ...song,
        precio: `${song.precio.valor} ${song.precio.moneda}`,
      })),
    };
  }

  private removeFilter = () => {
    this.filteredSongs = undefined;
    this.filterAlbum = 'all';
  };

  public onInputChange(artistName: string) {
    this.artistName = artistName;
  }

  public async onSearchTrack() {
    this.currentArtist = this.artistName;
    this.removeFilter();
    this.service.searchTracks(this.artistName).subscribe({
      next: (res) => {
        this.foundedSongs = this.transformCurrency(res);
      },
      error: (err) => console.error(err),
    });
  }

  public selectFilter(album: MatSelectChange) {
    this.filterAlbum = album.value;
    if (this.filterAlbum === 'all') {
      return this.removeFilter();
    }

    return (this.filteredSongs = {
      ...this.foundedSongs,
      canciones: this.foundedSongs.canciones.filter(
        (song) => song.nombre_album === this.filterAlbum
      ),
    });
  }
}
