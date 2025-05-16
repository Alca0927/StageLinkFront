import { Link } from "react-router-dom";

const RegisterSideMenu = () => {
    return (
        <div className="flex flex-col space-y-2">
            <Link to="/registermanager/reservation/list">예매 내역 목록</Link>
            <Link to="/registermanager/refund/list">환불 내역 목록</Link>
        </div>
    );
};

export default RegisterSideMenu;
