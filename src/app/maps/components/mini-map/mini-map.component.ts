import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Input } from '@angular/core';
import * as mapboxgl from 'mapbox-gl'; 

@Component({
  selector: 'app-mini-map',
  templateUrl: './mini-map.component.html',
  styleUrls: ['./mini-map.component.scss']
})
export class MiniMapComponent implements AfterViewInit {

  @Input() lngLat: [number, number] = [0, 0];
  @ViewChild('map') divMap!: ElementRef

  constructor() { }

  ngAfterViewInit(): void {

    const map = new mapboxgl.Map({
      container: this.divMap.nativeElement, // container ID
      //mapbox://styles/cplan203/cl6vfqkid005814p4gyy80dlc
      style: 'mapbox://styles/mapbox/streets-v11', // style URL
      center: this.lngLat, // starting position [lng, lat]
      zoom: 15, // starting zoom
      projection: {name: 'globe' },// display the map as a 3D globe
      interactive: false
      });
      map.on('style.load', () => {
      map.setFog({}); // Set the default atmosphere style
      });

    new mapboxgl.Marker()
    .setLngLat( this.lngLat)
    .addTo(map)
   
    
  }

}
