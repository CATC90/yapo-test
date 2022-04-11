import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TracksComponent } from './tracks/tracks.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/tracks',
    pathMatch: 'full',
  },
  {
    path: 'tracks',
    component: TracksComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
