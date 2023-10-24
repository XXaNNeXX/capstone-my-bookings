import axios from "axios";
import {Booking} from "./Booking.tsx";
import {useParams} from "react-router-dom";
import EditCard from "./EditCard.tsx";

type Props = {
    bookingList: Booking[]
    onItemChange: () => void
}

export default function ChangeCard(props: Props) {

    const {id} = useParams()
    const filteredById: Booking[] = props.bookingList.filter(item => item.id === id)

    function changeBooking(booking: Booking) {
        axios.put("/api/booking" + booking.id, booking)
            .then(() => {props.onItemChange()})
            .catch(reason => {
                console.error(reason);
            });
    }

    return (

        <>
            <EditCard booking={filteredById[0]} onItemChange={changeBooking}/>
        </>
    )
}