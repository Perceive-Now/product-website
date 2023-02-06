import { Outlet } from "react-router-dom";
import AccountNavbar from "../../components/@account/account-navbar";

export default function AccountLayout() {
    return (
        <div>
            <AccountNavbar />

            <div>
                <Outlet />
            </div>
        </div>
    )
}