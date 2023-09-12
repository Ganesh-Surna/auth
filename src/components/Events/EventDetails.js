import { Await, Link, defer, json, redirect, useRouteLoaderData, useSubmit } from 'react-router-dom';
import classes from './EventDetails.module.css';
import EventsList from './EventsList';
import { Suspense } from 'react';
import { getAuthToken } from '../../util/auth';

export default function EventDetails(){
    const submit= useSubmit();
    const token=getAuthToken();

    const isLoggedIn= token && token!=="EXPIRED";

    const {eventKey, eventsKey}= useRouteLoaderData("event");

    function startDeleteHandler() {
        const proceed= window.confirm("Are you sure?");

        if(proceed){
            submit(null,{method:"delete"});
        }
      }

    return <>
        <h1>Event Details.</h1>
        <Suspense fallback={<p>Loading...</p>}>
            <Await resolve={eventKey}>
                {(event)=><article className={classes.event}>
                    <img src={event.image} alt={event.title} />
                    <h1>{event.title}</h1>
                    <time>{event.date}</time>
                    <p>{event.description}</p>
                    {isLoggedIn && <menu className={classes.actions}>
                        <Link to="edit">Edit</Link>
                        <button onClick={startDeleteHandler}>Delete</button>
                    </menu>}
                </article>}
            </Await>
        </Suspense>
        <div className='events'>
            <h1>All Events</h1>
            <Suspense fallback={<p>Loading...</p>}>
                <Await resolve={eventsKey}>
                    {(events)=><EventsList events={events}/>}
                </Await>
            </Suspense>
        </div>
    </>
}


async function loadEventDetails(id){
    let url="http://localhost:8080/events/"+id;

    const response = await fetch(url);

    if(!response.ok){
        throw json({message:"Failed to fetch event details."},{status:500});
    }

    else{
        const {event} = await response.json();
        return event;
    }
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

export async function loader({params}){
    const id= params.id;
    return defer({
        eventKey: await loadEventDetails(id),
        eventsKey: loadEvents(),
    })
}

export async function action({request, params}){
    const method= request.method;
    const id=params.id;
    let url="http://localhost:8080/events/"+id;

    const token= getAuthToken();

    const response= await fetch(url,{
        method:method,
        headers:{
            "Content-Type":"application/json",
            "Authorization": "Bearer " +token,
        }
    })

    if(response.status===401){
        throw json({message:"Unauthorized to delete event."},{status:500});
    }

    if(!response.ok){
        throw json({message:"Failed to delete event."},{status:500});
    }

    window.alert("Deleted successfully!");
    return redirect("/events");
}
