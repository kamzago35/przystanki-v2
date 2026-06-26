import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';
import { DeparturesData } from '../models/departure-model';

@Service()
export class DeparturesService {
    private httpClient = inject(HttpClient)

    getDeparturesData(busStopNumber: string) {
        return lastValueFrom(this.httpClient.get<DeparturesData>(`${environment.apiUrl}/departure-boards/${busStopNumber}`))
    }
}
