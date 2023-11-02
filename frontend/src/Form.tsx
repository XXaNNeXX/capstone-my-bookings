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
    const [showSavePopup, setShowSavePopup] = useState(false)

    function onNameInput(event: ChangeEvent<HTMLInputElement>) {
        setName(event.target.value)
        nameNotEmpty(event.target.value)
    }
    function onArrivalInput(event: ChangeEvent<HTMLInputElement>) {
        setArrival(event.target.value)
        validArrivalDate(event.target.value)
    }
    function onDepartureInput(event: ChangeEvent<HTMLInputElement>) {
        setDeparture(event.target.value)
        validDepartureDate(event.target.value, arrival)
    }
    function onAdultsInput(event: ChangeEvent<HTMLInputElement>) {
        setAdults(event.target.valueAsNumber)
        validAdultsNumber(event.target.valueAsNumber)
    }
    function onChildrenInput(event: ChangeEvent<HTMLInputElement>) {
        setChildren(event.target.valueAsNumber)
        validChildrenNumber(event.target.valueAsNumber)
    }

    function nameNotEmpty(name: string) {
        if(name.trim() === "") {
            setErrorMessageName("Please enter a name")
        } else {
            setErrorMessageName("");
        }
    }
    function validArrivalDate(arrivalDate: string) {
        const today = new Date()
        const arrival = new Date(arrivalDate)

        if(arrival <= today) {
            setErrorMessageArrival("Please enter a valid date")
        } else {
            setErrorMessageArrival("")
        }
    }

    function validDepartureDate(departureDate: string, arrivalDate: string) {
        const today = new Date()
        const departure = new Date(departureDate)
        const arrival = new Date(arrivalDate)

        if(departure <= today || departure <= arrival) {
            setErrorMessageDeparture("Please enter a valid date")
        } else {
            setErrorMessageDeparture("")
        }
    }

    function validAdultsNumber(adults: number) {
        if(adults < 1 || adults > 4) {
            setErrorMessageAdults("Please enter a valid number")
        } else {
            setErrorMessageAdults("")
        }
    }

    function validChildrenNumber(children: number) {
        if(children < 0 || children > 3) {
            setErrorMessageChildren("Please enter a valid number")
        } else {
            setErrorMessageChildren("")
        }
    }
    function addBooking() {
        if(errorMessageName === "" || errorMessageArrival === "" || errorMessageDeparture === "" || errorMessageAdults === "" || errorMessageChildren === "") {
            setShowSavePopup(false)
            setName("")
            setArrival("")
            setDeparture("")
            setAdults(0)
            setChildren(0)
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
                    <button onClick={() => setShowSavePopup(true)}>Save</button>
                    {showSavePopup && (
                        <div className="popup-overlay">
                            <div className="popup-save-content">
                                <p>Your Booking has been saved</p><br/>
                                <button id="pressed" onClick={addBooking}>Ok</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}