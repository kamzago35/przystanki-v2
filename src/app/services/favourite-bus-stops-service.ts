import { Service } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { Preferences } from '@capacitor/preferences';
import { Subject } from 'rxjs';

@Service()
export class FavouriteBusStopsService {
    private key = 'favourite_bus_stop_ids'
    idsChanged = new Subject<null>()

    private getIds(): number[] {
        let data

        if(Capacitor.isNativePlatform()) Preferences.get({key: this.key}).then(value => data = value)
        else data = localStorage.getItem(this.key)

        return data ? JSON.parse(data) : []
    }

    private setIds(ids: number[]) {
        if(Capacitor.isNativePlatform()) Preferences.set({key: this.key, value: JSON.stringify(ids)})
        else localStorage.setItem(this.key, JSON.stringify(ids))
        this.idsChanged.next(null)
    }

    isIdFavourite(id: number) {
        const favBusStopIds = this.getIds()
        return favBusStopIds.includes(id)
    }

    addId(id: number) {
        const favBusStopIds = this.getIds()
        favBusStopIds.push(id)
        this.setIds(favBusStopIds)
    }

    removeId(id: number) {
        const favBusStopIds = this.getIds()
        const i = favBusStopIds.indexOf(id)
        favBusStopIds.splice(i, 1)
        this.setIds(favBusStopIds)
    }
}
