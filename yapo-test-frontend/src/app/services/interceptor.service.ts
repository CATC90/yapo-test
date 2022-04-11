import {
  HttpClient,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env';
import { finalize, firstValueFrom, Observable } from 'rxjs';
import { ITrackService } from '../tracks/interfaces/tracks.interface';
import { SpinnerService } from './spinner.service';

@Injectable({
  providedIn: 'root',
})
export class InterceptorService implements HttpInterceptor {
  constructor(private spinnerService: SpinnerService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.spinnerService.showSpinner();
    return next
      .handle(req)
      .pipe(finalize(() => this.spinnerService.hideSpinner()));
  }
}
