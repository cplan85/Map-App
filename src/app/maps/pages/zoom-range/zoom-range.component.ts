import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl'; 
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-zoom-range',
  templateUrl: './zoom-range.component.html',
  styleUrls: ['./zoom-range.component.scss']
})
export class ZoomRangeComponent implements AfterViewInit {
 
  @ViewChild('map') divMap!: ElementRef;

  map!: mapboxgl.Map;
  zoomValue: number = 12;
  center: [number, number] = [2.1747936849217937, 41.40378416042038];

  constructor() { }

  ngAfterViewInit(): void {



    console.log('afterViewInit', this.divMap);

    (mapboxgl as any).accessToken = environment.mapboxToken;
    this.map = new mapboxgl.Map({
    container: this.divMap.nativeElement, // container ID
    //mapbox://styles/cplan203/cl6vfqkid005814p4gyy80dlc
    style: 'mapbox://styles/mapbox/streets-v11', // style URL
    center: [2.1747936849217937, 41.40378416042038], // starting position [lng, lat]
    zoom: this.zoomValue, // starting zoom
    projection: {name: 'globe' }// display the map as a 3D globe
    });
    this.map.on('style.load', () => {
    this.map.setFog({}); // Set the default atmosphere style
    });

    this.map.on('zoom', (ev) => {
      this.zoomValue = this.map.getZoom();
    })

  

    this.map.on('zoomend', (ev) => {
      if(this.map.getZoom() > 18) {
        this.map.zoomTo(18)
      }
    })

    this.map.on('move', (event) => {
      const target = event.target;
      const {lng, lat} = target.getCenter();
     this.center = [lng, lat];

      
    })

  }

  zoomIn() {
    this.map.zoomIn();
    this.zoomValue = this.map.getZoom();
  }

  zoomOut() {
    this.map.zoomOut();
    this.zoomValue = this.map.getZoom();
  }

  zoomChange(value: string) {
    this.map.zoomTo(Number(value))
    //this.zoomValue = parseInt(value);
  }
  

}
