import {Booking} from "./Booking.tsx";
import {Link} from "react-router-dom";
import {ChangeEvent, MouseEventHandler, useEffect, useState} from "react";

type Props = {
    booking: Booking,
    onItemChange: (booking: Booking) => void
    onDelete: (booking: Booking) => void
}

export default function EditCard(props: Props) {

    const [booking, setBooking] = useState<Booking>(props.booking);

    useEffect(() => {setBooking(props.booking)}, [props.booking])

    function onNameInput(event: ChangeEvent<HTMLInputElement>) {
        setBooking({ ...booking, name: event.target.value });
    }
    function onArrivalInput(event: ChangeEvent<HTMLInputElement>) {
        setBooking({ ...booking, arrival: event.target.value });
    }
    function onDepartureInput(event: ChangeEvent<HTMLInputElement>) {
        setBooking({ ...booking, departure: event.target.value });
    }
    function onAdultsInput(event: ChangeEvent<HTMLInputElement>) {
        setBooking({ ...booking, adults: parseInt(event.target.value, 10) });
    }
    function onChildrenInput(event: ChangeEvent<HTMLInputElement>) {
        setBooking({ ...booking, children: parseInt(event.target.value, 10) });
    }

    const onSave: MouseEventHandler<HTMLButtonElement> = (event) => {
        event.preventDefault();
        props.onItemChange(booking);
    }

    const onDelete = () => props.onDelete(booking)

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
            <input type="text" id="input-name" name="name" value={booking.name} onChange={onNameInput}/>
            <label htmlFor="input-arrival">Arrival</label>
            <input type="text" id="input-arrival" name="arrival" value={booking.arrival} onChange={onArrivalInput}/>
            <label htmlFor="input-departure">Departure</label>
            <input type="text" id="input-departure" name="departure" value={booking.departure} onChange={onDepartureInput}/>
            <label htmlFor="input-adults"># Adults</label>
            <input type="number" id="input-adults" name="adults" value={booking.adults} onChange={onAdultsInput}/>
            <label htmlFor="input-children"># Children</label>
            <input type="number" id="input-children" name="children" value={booking.children} onChange={onChildrenInput}/>
        </form>
        <br/>
        <br/>
        <br/>
        <br/>
        </main>
        <div className="footer">
            <div>
                <button onClick={onSave}>Save</button>
            </div>
            <div>
                <button onClick={onDelete}>Delete</button>
            </div>
        </div>
        </>
    )
}