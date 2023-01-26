import { Component, OnInit } from '@angular/core';
import { ArtworksService } from '../services/artworks.service';

@Component({
  selector: 'app-artworks',
  templateUrl: './artworks.component.html',
  styleUrls: ['./artworks.component.css']
})
export class ArtworksComponent implements OnInit {
  artworks:any;
  p: number = 1;
  total: number = 0;

  constructor(private service:ArtworksService) {}


  ngOnInit() {
    this.getArtworks();

    alert(this.artworks);
    alert(this.total);
  }

  getArtworks() {
    this.service.getArtworks(this.p)
        .subscribe((response: any) => {
          this.artworks = response.data;
          this.total = response.pagination.total;
        });
  }

  pageChangeEvent(event: number){
    this.p = event;
    this.getArtworks();
  }

}
