import { Component, inject, Input, OnDestroy, OnInit, signal } from '@angular/core';
import { BusStop } from '../models/bus-stop-model';
import { MatDialog } from '@angular/material/dialog';
import { DepartureDialog } from '../departure-dialog/departure-dialog';
import { MatIcon } from '@angular/material/icon';
import { FavouriteBusStopsService } from '../services/favourite-bus-stops-service';
import { Subscription } from 'rxjs';
import { BusStopInfoDialog } from '../bus-stop-info-dialog/bus-stop-info-dialog';

@Component({
  selector: 'app-marker-pop-up',
  imports: [MatIcon],
  templateUrl: './marker-pop-up.html',
  styleUrl: './marker-pop-up.scss',
})
export class MarkerPopUp implements OnInit, OnDestroy {
  @Input() busStop!: BusStop
  private dialog = inject(MatDialog)
  private favouriteBusStopsService = inject(FavouriteBusStopsService)
  private subscriptions: Subscription[] = []
  isFavourite = signal(false)

  ngOnInit(): void {
    this.checkFavourite()
    this.listenForChanges()
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe())
  }

  private listenForChanges() {
    this.subscriptions.push(this.favouriteBusStopsService.idsChanged.subscribe(() => this.checkFavourite()))
  }

  private checkFavourite() {
    this.isFavourite.set(this.favouriteBusStopsService.isIdFavourite(this.busStop.id))
  }

  openDeparturesDialog() {
    this.dialog.open(DepartureDialog, {data: {busStop: this.busStop}})
  }

  openBusStopInfoDialog() {
    this.dialog.open(BusStopInfoDialog, {data: {busStop: this.busStop}})
  }

  changeFavourite() {
    if(this.isFavourite()) this.favouriteBusStopsService.removeId(this.busStop.id)
    else this.favouriteBusStopsService.addId(this.busStop.id)
  }
}
