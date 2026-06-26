import { Component } from '@angular/core';
import { Map } from "./map/map";

@Component({
  selector: 'app-root',
  imports: [Map],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  
}
