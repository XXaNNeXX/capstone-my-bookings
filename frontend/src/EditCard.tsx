import {Booking} from "./Booking.tsx";
import {Link} from "react-router-dom";
import {ChangeEvent, MouseEventHandler, useEffect, useState} from "react";

type Props = {
    booking: Booking,
    onItemChange: (booking: Booking) => void
    onDelete: (booking: Booking) => void
}

export default function EditCard(props: Props) {

    const [booking, setBooking] = useState<Booking>(props.booking)
    const [errorMessageName, setErrorMessageName] = useState<string>("")
    const [errorMessageArrival, setErrorMessageArrival] = useState<string>("")
    const [errorMessageDeparture, setErrorMessageDeparture] = useState<string>("")
    const [errorMessageAdults, setErrorMessageAdults] = useState<string>("")
    const [errorMessageChildren, setErrorMessageChildren] = useState<string>("")
    const [errorMessageMoney, setErrorMessageMoney] = useState<string>("")
    const [showDeletePopup, setShowDeletePopup] = useState(false)
    const [showSavePopup, setShowSavePopup] = useState(false)

    useEffect(() => {setBooking(props.booking)}, [props.booking])

    function onNameInput(event: ChangeEvent<HTMLInputElement>) {
        setBooking({ ...booking, name: event.target.value })
        validateName(event.target.value)
    }
    function onPhoneInput(event: ChangeEvent<HTMLInputElement>) {
        setBooking({ ...booking, phone: event.target.value })
    }
    function onArrivalInput(event: ChangeEvent<HTMLInputElement>) {
        setBooking({ ...booking, arrival: event.target.value })
        validateArrival(event.target.value)
    }
    function onDepartureInput(event: ChangeEvent<HTMLInputElement>) {
        setBooking({ ...booking, departure: event.target.value })
        validateDeparture(event.target.value, booking.arrival)
    }
    function onAdultsInput(event: ChangeEvent<HTMLInputElement>) {
        setBooking({ ...booking, adults: parseInt(event.target.value, 10) })
        validateAdults(event.target.valueAsNumber)
    }
    function onChildrenInput(event: ChangeEvent<HTMLInputElement>) {
        setBooking({ ...booking, children: parseInt(event.target.value, 10) })
        validateChildren(event.target.valueAsNumber)
    }
    function onMoneyInput(event: ChangeEvent<HTMLInputElement>) {
        setBooking({ ...booking, money: parseFloat(event.target.value) })
        validateMoney(event.target.valueAsNumber)
    }
    function onExtrasInput(event: ChangeEvent<HTMLTextAreaElement>) {
        setBooking({ ...booking, extras: event.target.value })
    }

    const onSave: MouseEventHandler<HTMLButtonElement> = (event) => {
        event.preventDefault();
        if(errorMessageName === "" || errorMessageArrival === "" || errorMessageDeparture === "" || errorMessageAdults === "" || errorMessageChildren === "" || errorMessageMoney === "") {
            props.onItemChange(booking);
            setShowSavePopup(false)
        }
    }

    function validateName(name: string) {
        if(name.trim() === "") {
            setErrorMessageName("Please enter a name")
        } else {
            setErrorMessageName("");
        }
    }
    function validateArrival(arrivalDate: string) {
        const today = new Date()
        const arrival = new Date(arrivalDate)

        if(arrival <= today) {
            setErrorMessageArrival("Please enter a valid date")
        } else {
            setErrorMessageArrival("")
        }
    }
    function validateDeparture(departureDate: string, arrivalDate: string) {
        const today = new Date()
        const departure = new Date(departureDate)
        const arrival = new Date(arrivalDate)

        if(departure <= today || departure <= arrival) {
            setErrorMessageDeparture("Please enter a valid date")
        } else {
            setErrorMessageDeparture("")
        }
    }
    function validateAdults(adults: number) {
        if(adults < 1 || adults > 4) {
            setErrorMessageAdults("Please enter a valid number")
        } else {
            setErrorMessageAdults("")
        }
    }
    function validateChildren(children: number) {
        if(children < 0 || children > 3) {
            setErrorMessageChildren("Please enter a valid number")
        } else {
            setErrorMessageChildren("")
        }
    }
    function validateMoney(money: number) {
        if(money <= 0) {
            setErrorMessageMoney("Please enter a valid amount")
        } else {
            setErrorMessageMoney("")
        }
    }

    const onDelete = () => {props.onDelete(booking); setShowDeletePopup(false)}

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
                {errorMessageName && <p className="error-message">{errorMessageName}</p>}
                <label htmlFor="input-phone">Phone</label>
                <input type="tel" id="input-phone" value={booking.phone} onChange={onPhoneInput}/>
                <label htmlFor="input-arrival">Arrival</label>
                <input type="date" id="input-arrival" name="arrival" value={booking.arrival} onChange={onArrivalInput}/>
                {errorMessageArrival && <p className="error-message">{errorMessageArrival}</p>}
                <label htmlFor="input-departure">Departure</label>
                <input type="date" id="input-departure" name="departure" value={booking.departure} onChange={onDepartureInput}/>
                {errorMessageDeparture && <p className="error-message">{errorMessageDeparture}</p>}
                <label htmlFor="input-adults"># Adults</label>
                <input type="number" id="input-adults" name="adults" value={booking.adults} onChange={onAdultsInput}/>
                {errorMessageAdults && <p className="error-message">{errorMessageAdults}</p>}
                <label htmlFor="input-children"># Children</label>
                <input type="number" id="input-children" name="children" value={booking.children} onChange={onChildrenInput}/>
                {errorMessageChildren && <p className="error-message">{errorMessageChildren}</p>}
                <label htmlFor="input-money">€</label>
                <input type="number" id="input-money" value={booking.money} onChange={onMoneyInput}/>
                {errorMessageMoney && <p className="error-message">{errorMessageMoney}</p>}
                <label htmlFor="input-textarea">Extras</label>
                <textarea id="input-textarea" value={booking.extras} onChange={onExtrasInput}></textarea>
            </form>
        </main>
        <div className="footer">
            <div>
                <button onClick={() => setShowSavePopup(true)}>Save</button>
                {showSavePopup && (
                    <div className="popup-overlay">
                        <div className="popup-save-content">
                            <p>Your Booking has been saved</p><br/>
                            <button onClick={onSave}>Ok</button>
                        </div>
                    </div>
                )}
            </div>
            <div>
                <button onClick={() => setShowDeletePopup(true)}>Delete</button>
                {showDeletePopup && (
                    <div className="popup-overlay">
                        <div className="popup-delete-content">
                            <p>Do you really want to delete this booking?</p><br/>
                            <button onClick={onDelete}>Yes</button><br/><br/>
                            <button onClick={() => setShowDeletePopup(false)}>No</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
        </>
    )
}