import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ArtworksService {

  private url = '/api/artic/artworks';

  constructor(private httpClient: HttpClient) { }

  getArtworks(page: number){
    return this.httpClient.get(this.url, {
      params: { page, limit: 10 }
    });
  }

  getArtworkById(id: number){
    return this.httpClient.get(`${this.url}/${id}`);
  }

  getImageIdById(id: number){
    return this.httpClient.get(`${this.url}/${id}`, {
      params: { fields: 'image_id,thumbnail' }
    });
  }
}
