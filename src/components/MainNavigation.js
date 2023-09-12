import { Form, NavLink, useRouteLoaderData } from "react-router-dom";
import "../styles.css";
import NewsLetterSignup from "./NewsLetterSignup";

export default function MainNavigation(){
    const token=useRouteLoaderData("root");
    console.log(token);

    const isLoggedIn= token && token!=="EXPIRED";

    return (
        <header className="header">
            <nav>
                <ul>
                    <li>
                        <NavLink to="/" className={({isActive})=>isActive ? "active" : ""} end >Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="events" className={({isActive})=>isActive ? "active" : ""}>Events</NavLink>
                    </li>
                    <li>
                        <NavLink to="newsletter" className={({isActive})=>isActive ? "active" : ""}>Newsletter</NavLink>
                    </li>
                    {!isLoggedIn && <li>
                        <NavLink to="auth?mode=login" className={({isActive})=>isActive ? "active" : ""}>Authentication</NavLink>
                    </li>}
                    {isLoggedIn  && <li>
                        <Form method="post" action="/logout">
                            <button>Logout</button>
                        </Form>
                    </li>}
                </ul>
            </nav>
            <nav>
                <NewsLetterSignup/>
            </nav>
        </header>
    )
}