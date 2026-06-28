import { Component, inject } from '@angular/core';
import { MatDialogTitle, MatDialogContent, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Departure } from '../models/departure-model';
import { NgClass } from "@angular/common";

@Component({
  selector: 'app-departure-info-dialog',
  imports: [MatDialogTitle, MatDialogContent, NgClass],
  templateUrl: './departure-info-dialog.html',
  styleUrl: './departure-info-dialog.scss',
})
export class DepartureInfoDialog {
  data = inject<{departure: Departure}>(MAT_DIALOG_DATA)

  getType() {
    switch(this.data.departure.line.type) {
      case 'DAY': return 'dzienna'
      case 'NIGHT': return 'nocna'
      default: return 'Brak informacji'        
    }
  }

  getSubtype() {
    switch(this.data.departure.line.subtype) {
      case 'NORMAL': return 'zwykła'
      case 'SEMI_FAST': return 'przyspieszona'
      case 'FAST': return 'pospieszna'
      case 'REPLACEMENT': return 'zastępcza'
      case 'ADDITIONAL': return 'dodatkowa'
      case 'SPECIAL': return 'specjalna'
      case 'TOURIST': return 'turystyczna'
      default: return 'Brak informacji'
    }
  }

  getVehicleType() {
    switch(this.data.departure.line.vehicle_type) {
      case 'BUS': return 'autobus'
      case 'TRAM': return 'tramwaj'
      case 'SKM': return 'szybka kolej miejska'
      default: return 'Brak informacji'
    }
  }

  getAccessibility() {
    switch(this.data.departure.trip.accessibility) {
      case 'HIGH_FLOOR': return 'Zaplanowany pojazd wysokopodłogowy'
      case 'LOW_FLOOR': return 'Zaplanowany pojazd niskopodłogowy'
      case 'LOW_FLOOR_POSSIBLE': return 'Możliwy pojazd niskopodłogowy'
      default: return 'Brak informacji'
    }
  }
}
