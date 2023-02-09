import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ArtworksComponent } from './components/artworks/artworks.component';
import { ProductsComponent } from './components/products/products.component';
import { ToursComponent } from './components/tours/tours.component';
import { SitesComponent } from './components/sites/sites.component';

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'home-component', component: HomeComponent },
    { path: 'artworks-component', component: ArtworksComponent },
    { path: 'products-component', component: ProductsComponent },
    { path: 'tours-component', component: ToursComponent },
    { path: 'sites-component', component: SitesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
