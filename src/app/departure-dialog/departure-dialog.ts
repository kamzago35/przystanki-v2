import { Component, inject, OnInit, signal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogTitle, MatDialogContent } from '@angular/material/dialog';
import { BusStop } from '../models/bus-stop-model';
import { Departure } from '../models/departure-model';
import { DeparturesService } from '../services/departures-service';
import { ToastService } from '../services/toast-service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-departure-dialog',
  imports: [MatDialogTitle, MatDialogContent, MatProgressSpinner],
  templateUrl: './departure-dialog.html',
  styleUrl: './departure-dialog.scss',
})
export class DepartureDialog implements OnInit {
  data = inject<{busStop: BusStop}>(MAT_DIALOG_DATA)
  private departuresService = inject(DeparturesService)
  private toastService = inject(ToastService)
  departures = signal<Departure[]>([])
  isLoading = signal(true)

  ngOnInit(): void {
    this.getDepartures()
  }

  private getDepartures() {
    this.departuresService.getDeparturesData(this.data.busStop.number)
    .then(departuresData => this.departures.set(departuresData.data.departures))
    .catch((error: HttpErrorResponse) => this.toastService.showErrorToast(error.message))
    .finally(() => this.isLoading.set(false))
  }

  getTimeFromDateTime(stringDateTime: string) {
    const dateTime = new Date(stringDateTime)
    return dateTime.toLocaleString('pl-PL', {
      timeZone: 'Europe/Warsaw',
      hour: '2-digit',
      minute: '2-digit'
    })
  }
}
