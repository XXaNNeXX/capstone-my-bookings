import {Booking} from "./Booking.tsx";
import Card from "./Card.tsx";
import {Link} from "react-router-dom";

type Props = {
    bookingList: Booking[]
}

export default function CardList(props: Props) {

    const sorted= props.bookingList.slice().sort((a,b) => new Date(a.arrival).getTime() - new Date(b.arrival).getTime())

    return (

        <>
            <section className="headline">
                <h2 id="my-bookings-headline">My Bookings</h2>
                <Link to={`/add`}>
                    <svg id="add-booking-button" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM232 344V280H168c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V168c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H280v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"/></svg>
                </Link>
            </section>
            {
                sorted.map(item => <Card key={item.id} booking={item}/>)
            }
            <div className="footer">
                <div className="footer-text-left">
                    <p>Total bookings:</p>
                </div>
                <div className="footer-text-right">
                    <p id="sum-bookings">{props.bookingList.length}</p>
                </div>
            </div>
        </>
    )
}