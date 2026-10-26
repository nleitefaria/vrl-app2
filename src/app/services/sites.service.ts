import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SitesService {

  private url = '/api/artic/sites';

  constructor(private httpClient: HttpClient) { }

  getSites(page: number){
      return this.httpClient.get(this.url, {
        params: { page, limit: 10 }
      });
  }

  getSiteById(id: number){
    return this.httpClient.get(`${this.url}/${id}`);
  }
}
