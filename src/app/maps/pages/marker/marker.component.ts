import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

interface MarkerColor {
  color: string;
  marker?: mapboxgl.Marker;
  center?: [number, number]
}

@Component({
  selector: 'app-marker',
  templateUrl: './marker.component.html',
  styleUrls: ['./marker.component.scss']
})
export class MarkerComponent implements AfterViewInit {

  @ViewChild('map') divMap!: ElementRef;

  map!: mapboxgl.Map;
  zoomValue: number = 15;
  center: [number, number] = [2.1747936849217937, 41.40378416042038];

  markers: MarkerColor[] = [];

  constructor() { }

  addMarker() {

    const color = "#xxxxxx".replace(/x/g, y=>(Math.random()*16|0).toString(16));

    const newMarker = new mapboxgl.Marker({draggable:true,
    color: color})
    .setLngLat(this.center)
    .addTo(this.map);

    this.markers.push({marker: newMarker, color: color});

    this.saveLocalStorageMarker();
  }

  goToMarker(marker:mapboxgl.Marker) {
    console.log(marker)
   // const lngLat = marker.getLngLat();
    this.map.flyTo({
      center: marker.getLngLat()
     // center: [lngLat.lng, lngLat.lat]
    })

  }

  saveLocalStorageMarker() {

    const lngLatArr: MarkerColor[] = [];

    this.markers.forEach(m => {
    const color = m.color;
    const {lng, lat} = m.marker!.getLngLat();

    lngLatArr.push({
      color: color,
      center: [lng, lat],

    })
    })

    localStorage.setItem('markers', JSON.stringify(lngLatArr )  )
        
  }

  readLocalStorage() {

    if(!localStorage.getItem('markers')) {
      return;
    }

    const lngLatArr: MarkerColor[] = JSON.parse( localStorage.getItem('markers')!) 

    console.log(lngLatArr);

    lngLatArr.forEach(item => {
      const newMarker = new mapboxgl.Marker({
        color: item.color,
        draggable: true
      })
      .setLngLat(item.center!)
      .addTo(this.map);

      this.markers.push({
        marker: newMarker,
        color: item.color
      })
    })

  }


  ngAfterViewInit(): void {

   // (mapboxgl as any).accessToken = environment.mapboxToken;
    this.map = new mapboxgl.Map({
    container: this.divMap.nativeElement, // container ID
    //mapbox://styles/cplan203/cl6vfqkid005814p4gyy80dlc
    style: 'mapbox://styles/mapbox/streets-v11', // style URL
    center: this.center, // starting position [lng, lat]
    zoom: this.zoomValue, // starting zoom
    projection: {name: 'globe' }// display the map as a 3D globe
    });
    this.map.on('style.load', () => {
    this.map.setFog({}); // Set the default atmosphere style
    });
  
    this.readLocalStorage();

    // const markerHtml: HTMLElement = document.createElement('div');
    // markerHtml.innerHTML = 'Hello World';

    // const marker1 = new mapboxgl.Marker({
    //   element: markerHtml 
    // })
    // .setLngLat(this.center)
    // .addTo(this.map);
  }

}
