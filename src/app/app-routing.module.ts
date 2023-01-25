import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArtworksComponent } from './artworks/artworks.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
    { path: 'home-component', component: HomeComponent },
    { path: 'artworks-component', component: ArtworksComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
