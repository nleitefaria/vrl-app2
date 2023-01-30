import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  products:any;
  product:any;
  imageId!:any;
  imageURL!:any;
  loading!:boolean;
  p: number = 1;
  total: number = 0;

  constructor(private service:ProductsService) {}

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.service.getProducts(this.p)
            .subscribe((response: any) => {
              this.products = response.data;
              this.total = response.pagination.total;
              this.loading = false;
        });
  }

  getProductById(id: number) {
      this.product = null;
      this.service.getProductById(id)
              .subscribe((response: any) => {
                this.product = response.data;
      });


    }


  pageChangeEvent(event: number){
      this.loading = true;
      this.p = event;
      this.getProducts();
  }


}
