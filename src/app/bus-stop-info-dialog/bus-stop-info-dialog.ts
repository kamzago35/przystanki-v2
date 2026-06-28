import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogTitle, MatDialogContent } from "@angular/material/dialog";
import { BusStop } from '../models/bus-stop-model';

@Component({
  selector: 'app-bus-stop-info-dialog',
  imports: [MatDialogTitle, MatDialogContent],
  templateUrl: './bus-stop-info-dialog.html',
  styleUrl: './bus-stop-info-dialog.scss',
})
export class BusStopInfoDialog {
  data = inject<{busStop: BusStop}>(MAT_DIALOG_DATA)

  boolToMessage(value: boolean) {
    return value ? 'tak' : 'nie'
  }
}
