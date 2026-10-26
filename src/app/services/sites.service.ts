import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SitesService {

  private url = '/api/artic';

  constructor(private httpClient: HttpClient) { }

  getSites(page: number){
      return this.httpClient.get(this.url, {
        params: { resource: 'sites', page, limit: 10 }
      });
  }

  getSiteById(id: number){
    return this.httpClient.get(this.url, {
      params: { resource: 'sites', id }
    });
  }
}
