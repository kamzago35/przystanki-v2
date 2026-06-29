import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { MatDialogTitle, MatDialogContent, MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { BusStop } from '../models/bus-stop-model';
import { FavouriteBusStopsService } from '../services/favourite-bus-stops-service';
import { MatIcon } from "@angular/material/icon";
import { FlyOnMapService } from '../services/fly-on-map-service';
import { Subscription } from 'rxjs';
import { DepartureDialog } from '../departure-dialog/departure-dialog';

@Component({
  selector: 'app-favourite-bus-stops-dialog',
  imports: [MatDialogTitle, MatDialogContent, MatIcon],
  templateUrl: './favourite-bus-stops-dialog.html',
  styleUrl: './favourite-bus-stops-dialog.scss',
})
export class FavouriteBusStopsDialog implements OnInit, OnDestroy {
  private data = inject<{busStops: BusStop[]}>(MAT_DIALOG_DATA)
  private favouriteBusStopsService = inject(FavouriteBusStopsService)
  private flyOnMapService = inject(FlyOnMapService)
  private dialogRef = inject(MatDialogRef<FavouriteBusStopsDialog>)
  private dialog = inject(MatDialog)
  private subscriptions: Subscription[] = []
  favouriteBusStops = signal<BusStop[]>([])

  ngOnInit(): void {
    this.getFavouriteBusStops()
    this.listenForChanges()
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe())
  }

  private listenForChanges() {
    this.subscriptions.push(this.favouriteBusStopsService.idsChanged.subscribe(() => this.getFavouriteBusStops()))
  }

  private getFavouriteBusStops() {
    const busStops: BusStop[] = []
    this.data.busStops.forEach(busStop => {
      if(this.favouriteBusStopsService.isIdFavourite(busStop.id)) busStops.push(busStop)
    })
    this.favouriteBusStops.set(busStops)
  }

  removeBusStop(busStop: BusStop) {
    this.favouriteBusStopsService.removeId(busStop.id)
  }

  flyToBusStop(busStop: BusStop) {
    this.flyOnMapService.currentPosition.next([busStop.latitude, busStop.longitude])
    this.dialogRef.close()
  }

  openDepartureDialog(busStop: BusStop) {
    this.dialog.open(DepartureDialog, {data: {busStop: busStop}})
    this.dialogRef.close()
  }
}
