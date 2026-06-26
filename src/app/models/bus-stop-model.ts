export interface BusStop {
    id: number
    number: string
    name: string
    latitude: number
    longitude: number
    request_stop: boolean
    park_and_ride: boolean
    technical: boolean
    railway_station_name: string | null
    updated_at: string
}

export interface BusStopsData {
    data: BusStop[]
}