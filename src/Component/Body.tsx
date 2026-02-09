import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Body = () => {
    return(
        <div className="min-h-screen flex flex-col bg-base-200">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
        <Outlet />
        </main>
        <Footer  />
        </div>
    )
}

export default Body;