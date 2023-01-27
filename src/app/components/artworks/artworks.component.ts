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
  imageId!:any;
  imageURL!:any;
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

    this.getImageIdById(id);
  }

  getImageIdById(id: number) {
    this.service.getImageIdById(id)
             .subscribe((response: any) => {
             this.imageId = response.data.image_id;
             this.imageURL = "https://www.artic.edu/iiif/2/" + this.imageId + "/full/600,/0/default.jpg";
    });
  }

  pageChangeEvent(event: number){
    this.p = event;
    this.getArtworks();
  }

}
