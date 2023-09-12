import { NavLink, useRouteLoaderData,  } from "react-router-dom";

export default function EventsNavigation(){
    const token=useRouteLoaderData("root");

    const isLoggedIn= token && token!=="EXPIRED";

    return <>
        <header className="header2">
            <nav>
                <ul>
                    <li>
                        <NavLink  to="" className={({isActive})=>isActive ? "active" : ""} end>All Events</NavLink>
                    </li>
                    {isLoggedIn && <>
                        <li>
                        <NavLink  to="new" className={({isActive})=>isActive ? "active" : ""} end>New Event</NavLink>
                    </li>
                    </>}
                </ul>
            </nav>
        </header>
    </>
}