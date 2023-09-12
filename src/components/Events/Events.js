import { Suspense } from "react";
import { Await, defer, json, useLoaderData, useRouteLoaderData } from "react-router-dom";
import EventsList from "./EventsList";

export default function Events(){

    const {eventsKey}=useRouteLoaderData("events-root");

    return <div className="events">
        <h1>All Events</h1>
        <Suspense fallback={<p>Loading...</p>}>
            <Await resolve={eventsKey}>
                {(loadedEvents)=><EventsList events={loadedEvents}/>}
            </Await>
        </Suspense>
    </div>
}

async function loadEvents(){
    const response = await fetch("http://localhost:8080/events");

    if(!response.ok){
        throw json({message:"Failed to fetch events."},{status:500});
    }

    else{
        const {events} = await response.json();
        return events;
    }
}

export function loader(){
    return defer({
        eventsKey: loadEvents(),
    })
}