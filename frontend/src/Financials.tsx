import {Booking} from "./Booking.tsx";

type Props = {
    bookingList: Booking[]
}
export default function Financials(props: Readonly<Props>) {

    const currentYear: number = new Date().getFullYear()
    const currentYearBookings: Booking[] = props.bookingList.filter(item => {
        const arrivalYear: number = new Date(item.arrival).getFullYear()
        return arrivalYear === currentYear
    })
    const bookingValue: number[] = currentYearBookings.map(item => item.money)
    const revenue: number = +(bookingValue.reduce((previous, current) => previous + current, 0)).toFixed(2)


    const vat: number = +(revenue * 0.07).toFixed(2)


    const net: number = +(revenue - vat).toFixed(2)


    const cleaning: number = currentYearBookings.length * 130
    const laundry: number = currentYearBookings.length * 30
    const tourismTax: number = currentYearBookings.length * (bookingValue[0] / 1.07 * 0.05)
    const costs: number = +(cleaning + laundry + tourismTax).toFixed(2)

    const profit: number = +(revenue - costs).toFixed(2)


    const lastYear: number = currentYear - 1
    const lastYearBookings: Booking[] = props.bookingList.filter(booking => {
        const arrivalYear: number = new Date(booking.arrival).getFullYear();
        return arrivalYear === lastYear;
    });
    const lastYearBookingValue: number[] = lastYearBookings.map(item => item.money)
    const lastYearRevenue: number = lastYearBookingValue.reduce((previous, current) => previous + current, 0)
    const lastYearCleaning: number = lastYearBookings.length * 130
    const lastYearLaundry: number = lastYearBookings.length * 30
    const lastYearTourismTax: number = lastYearBookings.length * (bookingValue[0] / 1.07 * 0.05)
    const lastYearCosts: number = +(lastYearCleaning + lastYearLaundry + lastYearTourismTax).toFixed(2)
    const lastYearProfit: number = +(lastYearRevenue - lastYearCosts).toFixed(2)
    const profitYoY: number = +(profit - lastYearProfit).toFixed(2)


    function getQuarter(date: Date) {
        const month = date.getMonth()
        return Math.floor(month / 3) + 1
    }

    const q1Bookings = currentYearBookings.filter(item => {
        const arrivalQuarter = getQuarter(new Date(item.arrival))
        const departureQuarter = getQuarter(new Date(item.departure))
        return arrivalQuarter === 1 || departureQuarter === 1
    })
    const q1Value: number[] = q1Bookings.map(item => item.money)
    const q1Revenue = q1Value.reduce((previous, current) => previous + current, 0)
    const q1Vat: number = q1Revenue * 0.07
    const q1Net: number = +(q1Revenue - q1Vat).toFixed(2)

    const q2Bookings = currentYearBookings.filter(item => {
        const arrivalQuarter = getQuarter(new Date(item.arrival))
        const departureQuarter = getQuarter(new Date(item.departure))
        return arrivalQuarter === 2 || departureQuarter === 2
    })
    const q2Value: number[] = q2Bookings.map(item => item.money)
    const q2Revenue = q2Value.reduce((previous, current) => previous + current, 0)
    const q2Vat: number = q2Revenue * 0.07
    const q2Net: number = +(q2Revenue - q2Vat).toFixed(2)

    const q3Bookings = currentYearBookings.filter(item => {
        const arrivalQuarter = getQuarter(new Date(item.arrival))
        const departureQuarter = getQuarter(new Date(item.departure))
        return arrivalQuarter === 3 || departureQuarter === 3
    })
    const q3Value: number[] = q3Bookings.map(item => item.money)
    const q3Revenue = q3Value.reduce((previous, current) => previous + current, 0)
    const q3Vat: number = q3Revenue * 0.07
    const q3Net: number = +(q3Revenue - q3Vat).toFixed(2)

    const q4Bookings = currentYearBookings.filter(item => {
        const arrivalQuarter = getQuarter(new Date(item.arrival))
        const departureQuarter = getQuarter(new Date(item.departure))
        return arrivalQuarter === 4 || departureQuarter === 4
    })
    const q4Value: number[] = q4Bookings.map(item => item.money)
    const q4Revenue = q4Value.reduce((previous, current) => previous + current, 0)
    const q4Vat: number = q4Revenue * 0.07
    const q4Net: number = +(q4Revenue - q4Vat).toFixed(2)


    return (
        <>
        <section className="headline">
            <h2 id="new-booking">My Financials</h2>
            <svg id="hidden" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
                <path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z"/></svg>
        </section>
        <main>
            <div className="financials">
                <div className="financials-group">
                    <div className="financials-sub-group">
                        <h3>Revenue</h3>
                        <p>{revenue} €</p>
                    </div>
                    <div className="financials-sub-group">
                        <h3>VAT</h3>
                        <p>{vat} €</p>
                    </div>
                </div>
                <div className="financials-group">
                    <div className="financials-sub-group">
                        <h3>Net</h3>
                        <p>{net} €</p>
                    </div>
                    <div className="financials-sub-group">
                        <h3>Costs</h3>
                        <p>{costs} €</p>
                    </div>
                </div>
                <div className="financials-group">
                    <div className="financials-sub-group">
                        <h3>Profit</h3>
                        <p>{profit} €</p>
                    </div>
                    <div className="financials-sub-group">
                        <h3>Profit YoY</h3>
                        <p>{profitYoY} €</p>
                    </div>
                </div>
                <div>
                    <div>
                        <h3 id="tourism-tax">Tourism Tax Net</h3>
                    </div>
                    <div className="financials-group">
                        <div className="financials-sub-group">
                            <h3>Q1</h3>
                            <p>{q1Net} €</p>
                        </div>
                        <div className="financials-sub-group">
                            <h3>Q2</h3>
                            <p>{q2Net} €</p>
                        </div>
                    </div>
                    <div className="financials-group">
                        <div className="financials-sub-group">
                            <h3>Q3</h3>
                            <p>{q3Net} €</p>
                        </div>
                        <div className="financials-sub-group">
                            <h3>Q4</h3>
                            <p>{q4Net} €</p>
                        </div>
                    </div>
                    <div id="empty"></div>
                </div>
            </div>
        </main>
        <div className="footer"></div>
        </>
    )
}