import { Service } from '@angular/core';
import { Subject } from 'rxjs';
import { Preferences } from '@capacitor/preferences';
import { Capacitor } from '@capacitor/core';

@Service()
export class FavouriteBusStopsService {
    private key = 'favourite_bus_stop_ids'
    idsChanged = new Subject<null>()

    private async getIds(): Promise<number[]> {
        let data

        if(Capacitor.isNativePlatform()) {
            const ret = await Preferences.get({key: this.key})
            data = ret.value
        }
        else data = localStorage.getItem(this.key)

        return data ? JSON.parse(data) : []
    }

    private async setIds(ids: number[]) {
        const value = JSON.stringify(ids)

        if(Capacitor.isNativePlatform()) await Preferences.set({key: this.key, value: value})
        else localStorage.setItem(this.key, value)

        this.idsChanged.next(null)
    }

    async isIdFavourite(id: number) {
        const favBusStopIds = await this.getIds()
        return favBusStopIds.includes(id)
    }

    async addId(id: number) {
        const favBusStopIds = await this.getIds()
        favBusStopIds.push(id)
        await this.setIds(favBusStopIds)
    }

    async removeId(id: number) {
        const favBusStopIds = await this.getIds()
        const i = favBusStopIds.indexOf(id)
        favBusStopIds.splice(i, 1)
        await this.setIds(favBusStopIds)
    }
}
