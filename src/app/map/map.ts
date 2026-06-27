import { AfterViewInit, ApplicationRef, Component, createComponent, EnvironmentInjector, inject, Input, OnChanges, signal } from '@angular/core';
import * as L from 'leaflet';
import { BusStop } from '../models/bus-stop-model';
import { MarkerPopUp } from '../marker-pop-up/marker-pop-up';
import { Capacitor } from '@capacitor/core';
import { Geolocation } from '@capacitor/geolocation';

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
  private startingPosition = L.latLng(53.43, 14.55)
  private userMarker!: L.Marker
  geolocationRunning = signal<boolean>(false)
  @Input() busStops!: BusStop[] | null
  private injector = inject(EnvironmentInjector)
  private appRef = inject(ApplicationRef)

  ngAfterViewInit(): void {
    this.fixMapIcons()
    this.initMap()

    if(Capacitor.isNativePlatform()) {
      Geolocation.requestPermissions().then(permissions => {
        if(permissions.location === 'granted') {
          this.markUser()
          this.trackUser()
          this.geolocationRunning.set(true)
        }
      })
    }
  }

  ngOnChanges(): void {
    this.markBusStops()
  }

  private fixMapIcons() {
    delete (L.Icon.Default.prototype as any)._getIconUrl

    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'map-icons/marker-icon-2x.png',
      iconUrl: 'map-icons/marker-icon.png',
      shadowUrl: 'map-icons/marker-shadow.png'
    })
  }

  private initMap() {
    this.map = L.map('map').setView(this.startingPosition, 13);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
  }

  private markBusStops() {
    if(this.busStopsMarked || !this.map || !this.busStops) return
    this.busStopsMarked = true
    const markers = L.markerClusterGroup()
    this.busStops.forEach(busStop => {
      markers.addLayer(L.marker([busStop.latitude, busStop.longitude]).bindPopup(this.createPopUp(busStop)))
    })
    this.map.addLayer(markers)
  }

  private createPopUp(busStop: BusStop) {
    const componentRef = createComponent(MarkerPopUp, {environmentInjector: this.injector})
    componentRef.instance.busStop = busStop
    this.appRef.attachView(componentRef.hostView)
    const domElem = (componentRef.hostView as any).rootNodes[0] as HTMLElement
    return domElem
  }

  private markUser() {
    this.userMarker = L.marker(this.startingPosition, {icon: L.icon({iconUrl: 'map-icons/user-icon.png'})}).addTo(this.map)
  }

  private trackUser() {
    Geolocation.watchPosition({enableHighAccuracy: true, interval: 1000}, position => {
      if(position) this.userMarker.setLatLng([position.coords.latitude, position.coords.longitude])
    })
  }

  moveToUser() {
    this.map.flyTo(this.userMarker.getLatLng(), 16)
  }
}
