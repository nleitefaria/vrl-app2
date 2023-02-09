import { Component, OnInit } from '@angular/core';
import { ToursService } from '../../services/tours.service';

@Component({
  selector: 'app-tours',
  templateUrl: './tours.component.html',
  styleUrls: ['./tours.component.css']
})
export class ToursComponent {
  tours:any;
  tour:any;
  imageId!:any;
  imageURL!:any;
  loading!:boolean;
  p: number = 1;
  total: number = 0;

  constructor(private service:ToursService) {}

  ngOnInit() {
    this.getTours();
  }

  getTours() {
    this.service.getTours(this.p)
              .subscribe((response: any) => {
                this.tours = response.data;
                this.total = response.pagination.total;
                this.loading = false;
          });
  }

  getTourById(id: number) {
        this.tour = null;
        this.service.getTourById(id)
                .subscribe((response: any) => {
                  this.tour = response.data;
        });
  }


  pageChangeEvent(event: number){
        this.loading = true;
        this.p = event;
        this.getTours();
  }

}
