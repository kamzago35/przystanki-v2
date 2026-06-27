import { Service } from '@angular/core';
import { Subject } from 'rxjs';

@Service()
export class FlyOnMapService {
    currentPosition = new Subject<[number, number]>()
}
