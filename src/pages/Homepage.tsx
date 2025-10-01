import { Outlet } from "react-router-dom";
import { Navbar } from "../component/Navbar";

const Homepage = (): JSX.Element => {
    return (
        <>
            <Navbar />
            <Outlet />
        </>
    );
};

export default Homepage;
