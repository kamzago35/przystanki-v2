import { Component, Input } from '@angular/core';
import { BusStop } from '../models/bus-stop-model';

@Component({
  selector: 'app-marker-pop-up',
  imports: [],
  templateUrl: './marker-pop-up.html',
  styleUrl: './marker-pop-up.scss',
})
export class MarkerPopUp {
  @Input() busStop!: BusStop
}
