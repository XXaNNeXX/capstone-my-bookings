import {Booking} from "./Booking.tsx";
import {Link} from "react-router-dom";

type Props = {
    booking: Booking
}

export default function EditCard(props: Props) {

    return (

        <>
        <section className="headline">
            <h2 id="new-booking">Change Booking</h2>
            <Link to={`/`}><svg id="fa-circle-xmark" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
                <path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z"/></svg>
            </Link>
        </section>
        <main>
        <form className="form">
            <label htmlFor="input-name">Name</label>
            <input type="text" id="input-name" name="name" value={props.booking.name} onChange={onNameInput}/>
            <label htmlFor="input-arrival">Arrival</label>
            <input type="text" id="input-arrival" name="arrival" value={props.booking.arrival} onChange={onArrivalInput}/>
            <label htmlFor="input-departure">Departure</label>
            <input type="text" id="input-departure" name="departure" value={props.booking.departure} onChange={onDepartureInput}/>
            <label htmlFor="input-adults"># Adults</label>
            <input type="number" id="input-adults" name="adults" value={props.booking.adults} onChange={onAdultsInput}/>
            <label htmlFor="input-children"># Children</label>
            <input type="number" id="input-children" name="children" value={props.booking.children} onChange={onChildrenInput}/>
        </form>
        <br/>
        <br/>
        <br/>
        <br/>
        </main>
        <div className="footer">
            <div>
                <button onClick={addBooking}>Save</button>
            </div>
            <div>
                <button>Delete</button>
            </div>
        </div>
        </>
    )
}