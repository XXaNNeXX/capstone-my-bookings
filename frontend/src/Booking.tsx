export type Booking = {
    id: string,
    name: string,
    arrival: string,
    departure: string,
    adults: number,
    children: number
}

export function dateFormat(dateStr: string): string {
    const date: Date = new Date(dateStr)

    const day: number = date.getDate()
    const month: number = date.getMonth()
    const monthNames: string[] = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dez"]
    const getMonth: string = monthNames[month]

    return `${day.toString().padStart(2, '0')} ${getMonth}`
}

export function weekday(dateStr: string): string {
    const date: Date = new Date(dateStr)

    const day: number = date.getDay()
    const dayNames: string[] = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]
    const getDay: string = dayNames[day]

    return `${getDay}`
}

export function toiletpaper(props: Booking): number {
    const arrival= new Date(props.arrival)
    const departure = new Date(props.departure)

    const millisecondsPerDay = 24 * 60 * 60 * 1000
    const nights: number = (departure.getTime() - arrival.getTime())/millisecondsPerDay
    const guests: number = props.adults + props.children

    return Math.round(nights / 3 * guests + 1)
}