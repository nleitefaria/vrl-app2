import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private url = 'https://api.artic.edu/api/v1/products';

  constructor(private httpClient: HttpClient) { }

    getProducts(page: number){
      return this.httpClient.get(this.url + '?page=' + page + '&limit=10');
    }

    getProductById(id: number){
        return this.httpClient.get(this.url + '/' + id);
      }
}
