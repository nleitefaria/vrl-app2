import { Component, OnInit } from '@angular/core';
import { ArtworksService } from '../../services/artworks.service';

@Component({
  selector: 'app-artworks',
  templateUrl: './artworks.component.html',
  styleUrls: ['./artworks.component.css']
})
export class ArtworksComponent implements OnInit {
  artworks:any;
  artwork:any;
  p: number = 1;
  total: number = 0;

  constructor(private service:ArtworksService) {}

  ngOnInit() {
    this.getArtworks();
  }

  getArtworks() {
    this.service.getArtworks(this.p)
        .subscribe((response: any) => {
          this.artworks = response.data;
          this.total = response.pagination.total;
    });
  }

  getArtworkById(id: number) {
    this.service.getArtworkById(id)
            .subscribe((response: any) => {
              this.artwork = response.data;
    });
  }

  pageChangeEvent(event: number){
    this.p = event;
    this.getArtworks();
  }

}
