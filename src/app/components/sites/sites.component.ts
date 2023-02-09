import { Component ,OnInit } from '@angular/core';
import { SitesService } from '../../services/sites.service';

@Component({
  selector: 'app-sites',
  templateUrl: './sites.component.html',
  styleUrls: ['./sites.component.css']
})
export class SitesComponent {
  sites:any;
  site:any;
  imageId!:any;
  imageURL!:any;
  loading!:boolean;
  p: number = 1;
  total: number = 0;

  constructor(private service:SitesService) {}

  ngOnInit() {
    this.getSites();
  }

  getSites() {
    this.service.getSites(this.p)
              .subscribe((response: any) => {
                this.sites = response.data;
                this.total = response.pagination.total;
                this.loading = false;
          });
  }

  getSiteById(id: number) {
          this.site = null;
          this.service.getSiteById(id)
                  .subscribe((response: any) => {
                    this.site = response.data;
          });
  }

  pageChangeEvent(event: number){
          this.loading = true;
          this.p = event;
          this.getSites();
  }

}
