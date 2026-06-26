import { Component, OnInit, signal } from '@angular/core';
import { Map } from "./map/map";
import { BusStop } from './models/bus-stop-model';
import { BusStopsService } from './services/bus-stops-service';

@Component({
  selector: 'app-root',
  imports: [Map],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  busStops = signal<BusStop[] | null>(null)

  constructor(
    private busStopsService: BusStopsService
  ) {}

  ngOnInit(): void {
    this.getBusStops()
  }

  private getBusStops() {
    this.busStopsService.getBusStopsData().then(busStopsData => {
      this.busStops.set(busStopsData.data)
    })
  }
}
