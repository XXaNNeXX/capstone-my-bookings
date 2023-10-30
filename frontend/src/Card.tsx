import {Booking, dateFormat, weekday, toiletpaper} from "./Booking.tsx";
import {Link} from "react-router-dom";

type Props = {
    booking: Booking
}

export default function Card(props: Props) {

    return (

        <Link to={"/" + props.booking.id + "/edit"}>
        <div className="box">
            <div className="homepage-name">
                <svg id="fa-user" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"/></svg>
                <p className="box-name">{props.booking.name}</p>
            </div>
            <div className="homepage-date">
                <svg id="fa-calendar-days" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M152 24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H64C28.7 64 0 92.7 0 128v16 48V448c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V192 144 128c0-35.3-28.7-64-64-64H344V24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H152V24zM48 192h80v56H48V192zm0 104h80v64H48V296zm128 0h96v64H176V296zm144 0h80v64H320V296zm80-48H320V192h80v56zm0 160v40c0 8.8-7.2 16-16 16H320V408h80zm-128 0v56H176V408h96zm-144 0v56H64c-8.8 0-16-7.2-16-16V408h80zM272 248H176V192h96v56z"/></svg>
                <p className="box-start-date">{dateFormat(props.booking.arrival)}</p>
                <p className="hyphen"> - </p>
                <p className="box-end-date">{dateFormat(props.booking.departure)}</p>
                <svg id="fa-caret-right" xmlns="http://www.w3.org/2000/svg" height="1.3em" viewBox="0 0 256 512"><path d="M246.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-9.2-9.2-22.9-11.9-34.9-6.9s-19.8 16.6-19.8 29.6l0 256c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l128-128z"/></svg>
                <p className="box-weekday">{weekday(props.booking.departure)}</p>
            </div>
            <div className="homepage-numbers">
                <svg id="fa-person-dress" xmlns="http://www.w3.org/2000/svg" height="1.3em" viewBox="0 0 320 512"><path d="M160 0a48 48 0 1 1 0 96 48 48 0 1 1 0-96zM88 384H70.2c-10.9 0-18.6-10.7-15.2-21.1L93.3 248.1 59.4 304.5c-9.1 15.1-28.8 20-43.9 10.9s-20-28.8-10.9-43.9l53.6-89.2c20.3-33.7 56.7-54.3 96-54.3h11.6c39.3 0 75.7 20.6 96 54.3l53.6 89.2c9.1 15.1 4.2 34.8-10.9 43.9s-34.8 4.2-43.9-10.9l-33.9-56.3L265 362.9c3.5 10.4-4.3 21.1-15.2 21.1H232v96c0 17.7-14.3 32-32 32s-32-14.3-32-32V384H152v96c0 17.7-14.3 32-32 32s-32-14.3-32-32V384z"/></svg>
                <p className="box-adults">{props.booking.adults}</p>
                <svg id="fa-baby" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M152 88a72 72 0 1 1 144 0A72 72 0 1 1 152 88zM39.7 144.5c13-17.9 38-21.8 55.9-8.8L131.8 162c26.8 19.5 59.1 30 92.2 30s65.4-10.5 92.2-30l36.2-26.4c17.9-13 42.9-9 55.9 8.8s9 42.9-8.8 55.9l-36.2 26.4c-13.6 9.9-28.1 18.2-43.3 25V288H128V251.7c-15.2-6.7-29.7-15.1-43.3-25L48.5 200.3c-17.9-13-21.8-38-8.8-55.9zm89.8 184.8l60.6 53-26 37.2 24.3 24.3c15.6 15.6 15.6 40.9 0 56.6s-40.9 15.6-56.6 0l-48-48C70 438.6 68.1 417 79.2 401.1l50.2-71.8zm128.5 53l60.6-53 50.2 71.8c11.1 15.9 9.2 37.5-4.5 51.2l-48 48c-15.6 15.6-40.9 15.6-56.6 0s-15.6-40.9 0-56.6L284 419.4l-26-37.2z"/></svg>
                <p className="box-children">{props.booking.children}</p>
                <svg id="fa-toilet-paper" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 640 512"><path d="M444.2 0C397.2 49.6 384 126.5 384 192c0 158.8-27.3 247-42.7 283.9c-10 24-33.2 36.1-55.4 36.1H48c-11.5 0-22.2-6.2-27.8-16.2s-5.6-22.3 .4-32.2c9.8-17.7 15.4-38.2 20.5-57.7C52.3 362.8 64 293.5 64 192C64 86 107 0 160 0H444.2zM512 384c-53 0-96-86-96-192S459 0 512 0s96 86 96 192s-43 192-96 192zm0-128c17.7 0 32-28.7 32-64s-14.3-64-32-64s-32 28.7-32 64s14.3 64 32 64zM144 208a16 16 0 1 0 -32 0 16 16 0 1 0 32 0zm64 0a16 16 0 1 0 -32 0 16 16 0 1 0 32 0zm48 16a16 16 0 1 0 0-32 16 16 0 1 0 0 32zm80-16a16 16 0 1 0 -32 0 16 16 0 1 0 32 0z"/></svg>
                <p className="box-toiletpaper">{toiletpaper(props.booking)}</p>
            </div>
        </div>
        </Link>

    )
}