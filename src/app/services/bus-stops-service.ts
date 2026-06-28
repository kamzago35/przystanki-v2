import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';
import { BusStopsData } from '../models/bus-stop-model';

@Service()
export class BusStopsService {
    private httpClient = inject(HttpClient)

    getBusStopsData() {
        return lastValueFrom(this.httpClient.get<BusStopsData>(`${environment.apiUrl}/stops`))
    }
}
