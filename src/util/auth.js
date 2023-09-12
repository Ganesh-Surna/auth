import { redirect } from "react-router-dom";

export function getRemainingTime(){
    const expTimeString=localStorage.getItem("EXP");
    const expTime= new Date(expTimeString);

    const now= new Date();

    const remainingTime= expTime - now;

    return remainingTime;
}

export function getAuthToken(){
    const token =localStorage.getItem("TOKEN");

    const remainingTime=getRemainingTime();

    if(remainingTime<0){
        return "EXPIRED";
    }

    if(token){
        return token;
    }
    else{
        return null;
    }
}

export function tokenLoader(){ // for RootLayout - for UI change( i.e, to provide token for EventsNavigation, MainNavigation)
    const token = getAuthToken();
    return token;
}

export function checkAuthLoader(){ // for EditEvent and NewEvent - to logout automatically if time expires
    const token=getAuthToken();

    if(!token){
        return redirect("/auth?mode=login");
    }

    return null;
    
}