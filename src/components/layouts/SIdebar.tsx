import React from "react";
import { Link, useLocation } from "react-router-dom";
import { SidebarList } from "./SidebarList";
import { SidebarListObject } from "../interfaces";
import useStore from "../../useStore";
import Logo from "../../assets/images/logo.svg";

export default function Sidebar(props: any) {
    const location = useLocation();
    const { activeSidebar, update } = useStore();
    const { sidebarFlag } = props;

    React.useEffect(() => {
        if (location.pathname.split("/").at(1) === "tokens" || location.pathname.split("/").at(1) === "") {
            update({activeSidebar: 0});
        } else if (location.pathname.split("/").at(1) === "download-wallet") {
            update({activeSidebar: 1});
        }
    }, [location]);

    return (
        <div className={sidebarFlag ? "sidebar" : "sidebar open"}>
            <nav className="navbar">
                <Link to="/" className="logo">
                    <img src={Logo} alt="logo" />
                </Link>

                <div className={`flex column navbar-nav w100`}>
                    {SidebarList.map(
                        (item: SidebarListObject, index: number) => (
                            <Link to={item.to} key={index}>
                                <div
                                    className={
                                        activeSidebar === index
                                            ? "flex justify nav-link active"
                                            : "flex justify nav-link"
                                    }
                                >
                                    <item.icon />
                                    <span>{item.title}</span>
                                </div>
                            </Link>
                        )
                    )}
                </div>
            </nav>
        </div>
    );
}
