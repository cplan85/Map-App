import { PropertiesComponent } from './pages/properties/properties.component';
import { MarkerComponent } from './pages/marker/marker.component';
import { FullScreenComponent } from './pages/full-screen/full-screen.component';
import { ZoomRangeComponent } from './pages/zoom-range/zoom-range.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {path: 'fullscreen', component: FullScreenComponent},
      {path: 'zoom-range', component: ZoomRangeComponent},
      {path: 'markers', component: MarkerComponent},
      {path: 'properties', component: PropertiesComponent},
      {path: '**', redirectTo: 'fullscreen'},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MapsRoutingModule { }
