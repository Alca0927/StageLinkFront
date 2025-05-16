import BasicLayout from "../../layouts/BasicLayout";
import { Outlet } from "react-router-dom";

const MemberMainPage = () => {
    return (
        <BasicLayout>
            <div>Member / Report Administration Main Page</div>
            <Outlet/>
        </BasicLayout>
    );
}

export default MemberMainPage;