import { useRouteError } from "react-router-dom";

export default function ErrorPage(){
    const error = useRouteError();

    let title="An Error Occurred.";
    let message="Something went wrong!";

    if(error.status===500){
        message=error.data.message;
    }
    if(error.status===404){
        title="Not Found!";
        message="Page not found!";
    }

    return <div className="err-page">
        <h1>{title}</h1>
        <p>{message}</p>
    </div>
}