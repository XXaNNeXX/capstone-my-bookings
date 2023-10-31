import {ChangeEvent, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";

type Props = {
    onItemChange: () => void
}
export default function Form(props: Props) {

    const [name, setName] = useState<string>("")
    const [arrival, setArrival] = useState<string>("")
    const [departure, setDeparture] = useState<string>("")
    const [adults, setAdults] = useState<number>(0)
    const [children, setChildren] = useState<number>(0)
    const [errorMessageName, setErrorMessageName] = useState<string>("")
    const [errorMessageArrival, setErrorMessageArrival] = useState<string>("")
    const [errorMessageDeparture, setErrorMessageDeparture] = useState<string>("")
    const [errorMessageAdults, setErrorMessageAdults] = useState<string>("")
    const [errorMessageChildren, setErrorMessageChildren] = useState<string>("")

    const today = new Date()
    const arrivalDate = new Date(arrival)
    const departureDate = new Date(departure)

    function onNameInput(event: ChangeEvent<HTMLInputElement>) {
        setName(event.target.value)
    }
    function onArrivalInput(event: ChangeEvent<HTMLInputElement>) {
        setArrival(event.target.value)
    }
    function onDepartureInput(event: ChangeEvent<HTMLInputElement>) {
        setDeparture(event.target.value)
    }
    function onAdultsInput(event: ChangeEvent<HTMLInputElement>) {
        setAdults(event.target.valueAsNumber)
    }
    function onChildrenInput(event: ChangeEvent<HTMLInputElement>) {
        setChildren(event.target.valueAsNumber)
    }
    function addBooking() {
        if(name.trim() === "") {
            setErrorMessageName("Please enter a name")
        } else if(arrival.trim() === "" || arrivalDate <= today) {
            setErrorMessageArrival("Please enter a valid date")
        } else if(departure.trim() === "" || arrivalDate >= departureDate || departureDate <= today) {
            setErrorMessageDeparture("Please enter a valid date")
        } else if(adults < 1 || adults > 4) {
            setErrorMessageAdults("Please enter a valid number")
        } else if(children < 0 || children > 3) {
            setErrorMessageChildren("Please enter a valid number")
        } else {
            setName("")
            setErrorMessageName("")
            setArrival("")
            setErrorMessageArrival("")
            setDeparture("")
            setErrorMessageDeparture("")
            setAdults(0)
            setErrorMessageAdults("")
            setChildren(0)
            setErrorMessageChildren("")
            axios.post("api/booking", {
                name: name,
                arrival: arrival,
                departure: departure,
                adults: adults,
                children: children
            })
                .then(props.onItemChange)
                .catch(reason => {
                    console.error(reason)
                })
        }
    }

    return (

        <div>
            <section className="headline">
                <h2 id="new-booking">New Booking</h2>
                <Link to={`/`}><svg id="fa-circle-xmark" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
                    <path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z"/></svg>
                </Link>
            </section>
            <main>
                <form className="form">
                    <label htmlFor="input-name">Name</label>
                    <input type="text" id="input-name" name="name" value={name} onChange={onNameInput}/>
                    {errorMessageName && <p className="error-message">{errorMessageName}</p>}
                    <label htmlFor="input-arrival">Arrival</label>
                    <input type="date" id="input-arrival" name="arrival" value={arrival} onChange={onArrivalInput}/>
                    {errorMessageArrival && <p className="error-message">{errorMessageArrival}</p>}
                    <label htmlFor="input-departure">Departure</label>
                    <input type="date" id="input-departure" name="departure" value={departure} onChange={onDepartureInput}/>
                    {errorMessageDeparture && <p className="error-message">{errorMessageDeparture}</p>}
                    <label htmlFor="input-adults"># Adults</label>
                    <input type="number" id="input-adults" name="adults" value={adults} onChange={onAdultsInput}/>
                    {errorMessageAdults && <p className="error-message">{errorMessageAdults}</p>}
                    <label htmlFor="input-children"># Children</label>
                    <input type="number" id="input-children" name="children" value={children} onChange={onChildrenInput}/>
                    {errorMessageChildren && <p className="error-message">{errorMessageChildren}</p>}
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
            </div>
        </div>
    )
}