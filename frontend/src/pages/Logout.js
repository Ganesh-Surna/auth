import { redirect } from "react-router-dom";

export function action(){
    localStorage.removeItem("TOKEN");
    localStorage.removeItem("EXPIRATION");
    return redirect("/");
}