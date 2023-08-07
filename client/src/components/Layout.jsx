import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import TopHeader from "./TopHeader";
import { useEffect } from "react";


const Layout = () => {

    useEffect(() => {
        document.querySelector("html").setAttribute("data-layout", "horizontal");
    }, []);

    return (
        <>
            <div id="layout-wrapper">
                <TopHeader />
                <Sidebar />
                    <Outlet />
                <Footer />
            </div>
        </>
    )

}
export default Layout;