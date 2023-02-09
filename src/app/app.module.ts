import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ArtworksComponent } from './components/artworks/artworks.component';
import { ProductsComponent } from './components/products/products.component';
import { ToursComponent } from './components/tours/tours.component';
import { SitesComponent } from './components/sites/sites.component';

@NgModule({
  declarations: [
    AppComponent,
    ArtworksComponent,
    HomeComponent,
    ProductsComponent,
    ToursComponent,
    SitesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
