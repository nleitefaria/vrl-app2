import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ToursService {

  private url = 'https://api.artic.edu/api/v1/tours';

  constructor(private httpClient: HttpClient) { }

  getTours(page: number){
    return this.httpClient.get(this.url + '?page=' + page + '&limit=10');
  }

  getTourById(id: number){
    return this.httpClient.get(this.url + '/' + id);
  }
}
