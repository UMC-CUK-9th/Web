import { Outlet } from "react-router-dom";
import { AuthProvider } from "../context/AuthProvider";

const RootLayout = () => {
return (
 <AuthProvider>
<Outlet />
</AuthProvider>
);
};

export default RootLayout;