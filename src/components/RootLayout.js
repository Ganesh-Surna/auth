import { Outlet, useLoaderData, useSubmit } from "react-router-dom";
import MainNavigation from "./MainNavigation";
import { useEffect } from "react";
import { getRemainingTime } from "../util/auth";

export default function RootLayout(){
    const submit=useSubmit();
    const token= useLoaderData();

    useEffect(()=>{

        if(!token){
            return;
        }

        if(token==="EXPIRED"){
            submit(null,{method:"post", action:"/logout"});
        }

        const remainingTime=getRemainingTime();

        setTimeout(()=>{
            submit(null,{method:"post", action:"/logout"});
        }, remainingTime)
    },[token, submit]);

    return <>
        <MainNavigation/>
        <div className="below-header">
            <Outlet/>
        </div>
        
    </>
}