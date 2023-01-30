import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ArtworksComponent } from './components/artworks/artworks.component';
import { ProductsComponent } from './components/products/products.component';

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'home-component', component: HomeComponent },
    { path: 'artworks-component', component: ArtworksComponent },
    { path: 'products-component', component: ProductsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
