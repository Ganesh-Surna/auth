import { Outlet } from "react-router-dom";
import MainNavigation from "./MainNavigation";

export default function RootLayout(){
    return <>
        <MainNavigation/>
        <div className="below-header">
            <Outlet/>
        </div>
        
    </>
}