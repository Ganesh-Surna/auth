import { NavLink, useRouteLoaderData,  } from "react-router-dom";

export default function EventsNavigation(){
    const token=useRouteLoaderData("root");

    return <>
        <header className="header2">
            <nav>
                <ul>
                    <li>
                        <NavLink  to="" className={({isActive})=>isActive ? "active" : ""} end>All Events</NavLink>
                    </li>
                    {token && <>
                        <li>
                        <NavLink  to="new" className={({isActive})=>isActive ? "active" : ""} end>New Event</NavLink>
                    </li>
                    </>}
                </ul>
            </nav>
        </header>
    </>
}