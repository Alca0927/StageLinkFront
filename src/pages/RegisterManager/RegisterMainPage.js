import BasicLayout from "../../layouts/BasicLayout";
import { Outlet } from "react-router-dom";

const RegisterMainPage = () => {
    return (
        <BasicLayout>
            <div>Register Main Page</div>
            <Outlet/>
        </BasicLayout>
    );
}

export default RegisterMainPage;