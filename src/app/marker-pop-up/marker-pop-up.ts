import { Component, inject, Input } from '@angular/core';
import { BusStop } from '../models/bus-stop-model';
import { MatDialog } from '@angular/material/dialog';
import { DepartureDialog } from '../departure-dialog/departure-dialog';

@Component({
  selector: 'app-marker-pop-up',
  imports: [],
  templateUrl: './marker-pop-up.html',
  styleUrl: './marker-pop-up.scss',
})
export class MarkerPopUp {
  @Input() busStop!: BusStop
  private dialog = inject(MatDialog)

  openDeparturesDialog() {
    this.dialog.open(DepartureDialog, {
      data: {
        busStop: this.busStop
      }
    })
  }
}
