export interface Departure {
    line: {
        id: number
        number: string
        type: 'DAY' | 'NIGHT'
        subtype: 'NORMAL' | 'SEMI_FAST' | 'FAST' | 'REPLACEMENT' | 'ADDITIONAL' | 'SPECIAL' | 'TOURIST'
        vehicle_type: 'SKM' | 'TRAM' | 'BUS'
        on_demand: boolean
        disruption: boolean
        disruption_url: null | {
            pl: string
            en: string
            de: string
            uk: string
        }
    }
    trip: {
        service: string
        gtfs_id: string | null
        start_date: string
        headsign: {
            short: string
            long: string
        }
        direction_id: number
        route_variant_number: number
        accessibility: 'HIGH_FLOOR' | 'LOW_FLOOR' | 'LOW_FLOOR_POSSIBLE'
        note: null | {
            pl: string
            en: string
            de: string
            uk: string
        }
    }
    departure_time: {
        scheduled: string
        estimated: string
        departing_now: boolean
        real_time: boolean
        canceled: boolean
    }
    request_stop: boolean
    vehicle: null | {
        id: number
        number: string
        model: string | null
        low_floor: boolean | null
        ticket_machine: null | {
            cards: boolean
            coins: boolean
        }
        stuck: boolean
    }
}

export interface DeparturesData {
    data: {
        stop: {
            name: string
            number: string
        }
        departures: Departure[]
        updated_at: string
    }
}