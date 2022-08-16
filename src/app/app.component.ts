import { environment } from './../environments/environment';
import * as mapboxgl  from 'mapbox-gl';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'mapsApp';

  ngOnInit():void {
    console.log('appComponent');

    (mapboxgl as any).accessToken = environment.mapboxToken;
  }
}
