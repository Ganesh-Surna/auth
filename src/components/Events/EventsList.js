import { Link } from "react-router-dom"

export default function EventsList({events}){
    return <ul className="events-list">
            {events.map((event)=>{
                return <li key={event.id}>
                    <Link to={`/events/${event.id}`}>
                        <div className="event-item">
                            <img src={event.image}/>
                            <div className="event-item-content">
                                <h2>{event.title}</h2>
                                <time>{event.date}</time>
                            </div>
                        </div>
                    </Link>
                </li>
            })}
        </ul>
}