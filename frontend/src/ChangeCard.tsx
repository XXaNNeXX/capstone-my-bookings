import axios from "axios";
import {Booking} from "./Booking.tsx";
import {useNavigate, useParams} from "react-router-dom";
import EditCard from "./EditCard.tsx";

type Props = {
    bookingList: Booking[]
    onItemChange: () => void
}

export default function ChangeCard(props: Props) {

    const {id} = useParams()
    const filteredById: Booking[] = props.bookingList.filter(item => item.id === id)
    const navigate = useNavigate();

    function changeBooking(booking: Booking) {
        axios.put("/api/booking/" + booking.id, booking)
            .then(() => {props.onItemChange()})
            .catch(reason => {
                console.error(reason);
            })
    }

    function updateBooking(booking: Booking) {
        changeBooking(booking);
        navigate("/")
    }

    function removeBooking(booking: Booking) {
        axios.delete("/api/booking/" + booking.id)
            .then(() => props.onItemChange())
            .catch(reason => {
                console.error(reason);
            })
    }

    function deleteBooking(booking: Booking) {
        removeBooking(booking);
        navigate("/")
    }

    return (

        <>
            <EditCard booking={filteredById[0]} onItemChange={updateBooking} onDelete={deleteBooking}/>
        </>
    )
}