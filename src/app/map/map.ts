import { AfterViewInit, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import * as L from 'leaflet';
import { BusStop } from '../models/bus-stop-model';

window.L = L

await import('leaflet.markercluster')

@Component({
  selector: 'app-map',
  imports: [],
  templateUrl: './map.html',
  styleUrl: './map.scss',
})
export class Map implements AfterViewInit, OnChanges {
  private map!: L.Map
  private busStopsMarked = false
  @Input() busStops!: BusStop[] | null

  ngAfterViewInit(): void {
    this.fixMapIcons()
    this.initMap()
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.markBusStops()
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

  private markBusStops() {
    if(this.busStopsMarked || !this.map || !this.busStops) return
    this.busStopsMarked = true
    const markers = L.markerClusterGroup()
    this.busStops.forEach(busStop => {
      markers.addLayer(L.marker([busStop.latitude, busStop.longitude]).bindPopup(`<div class="d-flex flex-column fw-bold">${busStop.name} (${busStop.number})<button class="btn btn-primary">Rozkład jazdy</button></div>`))
    })
    this.map.addLayer(markers)
  }
}
