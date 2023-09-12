import EventForm from "./EventForm";

export default function NewEvent(){
    return <>
        <h1>New Event</h1>
        <EventForm method="post"/>
    </>
}