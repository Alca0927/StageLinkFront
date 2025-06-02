import ShowMainComponent from "../../components/ShowManager/ShowMainComponent";
import BasicLayout from "../../layouts/BasicLayout";
import { Outlet, useLocation } from "react-router-dom";

const ShowMainPage = () => {
    const location = useLocation();
    return (
        <BasicLayout>
            { location.pathname === "/admin/showmanager" ?
            <ShowMainComponent/>
            :
            <Outlet/>
            }
        </BasicLayout>
    );
}

export default ShowMainPage;