import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ToursService {

  private url = '/api/artic';

  constructor(private httpClient: HttpClient) { }

  getTours(page: number){
    return this.httpClient.get(this.url, {
      params: { resource: 'tours', page, limit: 10 }
    });
  }

  getTourById(id: number){
    return this.httpClient.get(this.url, {
      params: { resource: 'tours', id }
    });
  }
}
