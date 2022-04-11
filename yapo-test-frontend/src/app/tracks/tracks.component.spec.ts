import { LayoutModule } from '@angular/cdk/layout';
import { HttpClientModule } from '@angular/common/http';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { BrowserModule, By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormInputComponent } from '@components/input-form/input-form.component';
import { TableComponent } from '@components/table/table.component';
import { TracksService } from '@services/tracks.service';
import { NgxSpinnerModule } from 'ngx-spinner';
import { Observable, of } from 'rxjs';
import { AppRoutingModule } from '../app-routing.module';
import {
  ISearchTracksResponse,
  ITrackService,
} from './interfaces/tracks.interface';

import { TracksComponent } from './tracks.component';

const responseMock: ISearchTracksResponse = {
  albumes: ['test'],
  total_albumes: 1,
  total_canciones: 1,
  canciones: [
    {
      cancion_id: 1,
      fecha_lanzamiento: '1997-01-01T12:00:00Z',
      nombre_album: 'test',
      nombre_tema: 'test',
      precio: {
        moneda: 'USD',
        valor: '1',
      },
      preview_url: '',
    },
  ],
};

const trackServiceMock: ITrackService = {
  searchTracks(artistName: string): Observable<ISearchTracksResponse> {
    return of(responseMock);
  },
};

describe('TracksComponent', () => {
  let component: TracksComponent;
  let fixture: ComponentFixture<TracksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TracksComponent, FormInputComponent, TableComponent],
      imports: [
        NgxSpinnerModule,
        HttpClientModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserModule,
        AppRoutingModule,
        MatInputModule,
        MatFormFieldModule,
        MatCardModule,
        MatButtonModule,
        MatTableModule,
        LayoutModule,
        MatDividerModule,
        MatSelectModule,
      ],
      providers: [{ provide: TracksService, useValue: trackServiceMock }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TracksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call service and show table if click search button', () => {
    const app: DebugElement = fixture.debugElement;
    const button = app.query(By.css('#search-button'))!;

    expect(component.foundedSongs).toBeFalsy();

    button.triggerEventHandler('click', null);

    expect(component.foundedSongs).toBeTruthy();

    fixture.autoDetectChanges(true);

    const tableRows = app.queryAll(By.css('#row'))!;
    expect(tableRows.length).toBe(responseMock.canciones.length);
  });
});
