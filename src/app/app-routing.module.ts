import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ArtworksComponent } from './components/artworks/artworks.component';


const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'home-component', component: HomeComponent },
    { path: 'artworks-component', component: ArtworksComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
