import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./components/RootLayout";
import Home from "./components/Home";
import EventsLayout from "./components/Events/EventsLayout";
import Events,{loader as eventsLoader} from "./components/Events/Events";
import NewEvent from "./components/Events/NewEvent";
import EventDetails,{ loader as eventDetailsLoader, action as deleteAction } from "./components/Events/EventDetails";
import Authentication, { action as authAction } from "./components/Authentication";
import Newsletter,{ action as newsletterAction } from "./components/Newsletter";
import EditEvent from "./components/Events/EditEvent";
import {action as manipulateEventAction} from "./components/Events/EventForm";
import ErrorPage from "./components/ErrorPage";
import {action as logoutAction} from "./util/logout";
import { tokenLoader } from "./util/auth";

const router=createBrowserRouter([
  {
    path:"/", element: <RootLayout/>,
    id:"root", loader:tokenLoader,
    errorElement:<ErrorPage/>,
    children:[
      {
        index:true, element:<Home/>,
      },
      {
        path:"events", element: <EventsLayout/>,
        loader: eventsLoader,
        id:"events-root",
        children:[
          {
            index:true, element:<Events/>,
          },
          {
            path:":id",
            id:"event",
            loader:eventDetailsLoader,
            children:[
              {
                index:true, element:<EventDetails/>,
                action: deleteAction,
              },
              {
                path:"edit", element:<EditEvent/>,
                action:manipulateEventAction,
              },
            ]
          },
          {
            path:"new", element:<NewEvent/>,
            action:manipulateEventAction,
          },
        ]
      },
      {
        path:"/auth", element:<Authentication/>,
        action: authAction,
      },
      {
        path:"/newsletter", element: <Newsletter/>,
        action: newsletterAction,
      },
      {
        path:"/logout", action: logoutAction,
      }
    ]
  }
])

export default function App() {
  return (
    <>
      <RouterProvider router={router}/>
    </>
  );
}
