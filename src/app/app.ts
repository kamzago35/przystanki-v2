import { Component, inject, OnInit, signal } from '@angular/core';
import { Map } from "./map/map";
import { BusStop } from './models/bus-stop-model';
import { BusStopsService } from './services/bus-stops-service';
import { ToastService } from './services/toast-service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-root',
  imports: [Map],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  busStops = signal<BusStop[] | null>(null)
  private busStopsService = inject(BusStopsService)
  private toastService = inject(ToastService)

  ngOnInit(): void {
    this.getBusStops()
  }

  private getBusStops() {
    this.busStopsService.getBusStopsData()
    .then(busStopsData => this.busStops.set(busStopsData.data))
    .catch((error: HttpErrorResponse) => this.toastService.showErrorToast(error.message))
  }
}
