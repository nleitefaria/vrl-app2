import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ArtworksService {

  private url = 'https://api.artic.edu/api/v1/artworks';
  private imgUrl = 'https://www.artic.edu/iiif/2/';

  constructor(private httpClient: HttpClient) { }

  getArtworks(page: number){
    return this.httpClient.get(this.url + '?page=' + page + '&limit=10');
  }

  getArtworkById(id: number){
    return this.httpClient.get(this.url + '/' + id);
  }

  getImageIdById(id: number){
    return this.httpClient.get(this.url + '/' + id + "?fields=image_id");
  }
}
