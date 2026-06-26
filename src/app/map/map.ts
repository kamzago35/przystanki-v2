import { AfterViewInit, Component } from '@angular/core';
import * as L from 'leaflet';

window.L = L

await import('leaflet.markercluster')

@Component({
  selector: 'app-map',
  imports: [],
  templateUrl: './map.html',
  styleUrl: './map.scss',
})
export class Map implements AfterViewInit {
  private map!: L.Map

  ngAfterViewInit(): void {
    this.fixMapIcons()
    this.initMap()
  }

  private fixMapIcons() {
    delete (L.Icon.Default.prototype as any)._getIconUrl

    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'leaflet/marker-icon-2x.png',
      iconUrl: 'leaflet/marker-icon.png',
      shadowUrl: 'leaflet/marker-shadow.png'
    })
  }

  private initMap() {
    this.map = L.map('map').setView([53.43, 14.55], 13);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
  }
}
