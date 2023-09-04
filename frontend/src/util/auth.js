import { redirect } from "react-router-dom";

export function getTokenDuration(){
    const storedExpirationDate= localStorage.getItem("EXPIRATION");
    const expirationDate= new Date(storedExpirationDate);
    const now= new Date();
    const remainingDuration= expirationDate.getTime() - now.getTime();
    return remainingDuration;
}

export function getAuthToken(){
    const token= localStorage.getItem("TOKEN");
    if(!token){
        return null;
    }
    
    const remainingDuration = getTokenDuration();
    if(remainingDuration<0){
        return "EXPIRED";
    }

    return token;
}

export function loader(){
    const token= getAuthToken();
    return token;
}

export function checkAuthLoader(){
    const token= getAuthToken();

    if(!token){
        return redirect("/auth");
    }

    return null;
}