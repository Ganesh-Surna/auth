import { useRouteLoaderData } from "react-router-dom";
import EventForm from "./EventForm";

export default function EditEvent(){

    const {eventKey}=useRouteLoaderData("event");

    return <>
        <h1>Edit Event</h1>
        <EventForm method="patch" event={eventKey} />
    </>
}