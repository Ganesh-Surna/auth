import { useEffect } from "react";
import { useFetcher } from "react-router-dom";

export default function NewsLetterSignup(){
    const fetcher= useFetcher();
    const {data, state}=fetcher;

    useEffect(()=>{
        if(state==="idle" && data){
            console.log(data);
            window.alert("Submitted successfully!");
        }
    },[state, data])
    
    return <fetcher.Form method="post" action="/newsletter">
        <input type="email" name="email" placeholder="Enter your email"/>
        <button>SignUp</button>
    </fetcher.Form>
}