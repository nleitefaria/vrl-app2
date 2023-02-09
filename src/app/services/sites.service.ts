import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SitesService {

  private url = 'https://api.artic.edu/api/v1/sites';

  constructor(private httpClient: HttpClient) { }

  getSites(page: number){
      return this.httpClient.get(this.url + '?page=' + page + '&limit=10');
  }

  getSiteById(id: number){
    return this.httpClient.get(this.url + '/' + id);
  }
}
