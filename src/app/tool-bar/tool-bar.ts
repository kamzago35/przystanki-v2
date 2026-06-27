import { Component, inject, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BusStop } from '../models/bus-stop-model';
import { ToastService } from '../services/toast-service';
import { FlyOnMapService } from '../services/fly-on-map-service';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-tool-bar',
  imports: [FormsModule, MatIcon],
  templateUrl: './tool-bar.html',
  styleUrl: './tool-bar.scss',
})
export class ToolBar {
  searchInput = ''
  @Input() busStops!: BusStop[] | null
  private toastService = inject(ToastService)
  private flyOnMapService = inject(FlyOnMapService)

  search() {
    if(this.searchInput === '') {
      this.toastService.showErrorToast('Podaj nazwę lub number przystanku!')
      return
    }

    let busStop
    if(!isNaN(Number(this.searchInput))) {
      busStop = this.busStops?.find(busStop => busStop.number.startsWith(this.searchInput))
    }
    else {
      const searchInput= this.searchInput.toLowerCase()
      busStop = this.busStops?.find(busStop => busStop.name.toLowerCase().startsWith(searchInput))
    }

    if(busStop) {
      this.flyOnMapService.currentPosition.next([busStop.latitude, busStop.longitude])
    }
    else {
      this.toastService.showErrorToast('Nie znaleziono przystanku!')
    }
  }
}
