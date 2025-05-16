import BasicMenu from "../components/menus/BasicMenu";
import ShowSideMenu from "../components/menus/SideMenu/ShowSideMenu";
import MemberSideMenu from "../components/menus/SideMenu/MemberSideMenu";
import NoticeSideMenu from "../components/menus/SideMenu/NoticeSideMenu";
import RegisterSideMenu from "../components/menus/SideMenu/RegisterSideMenu";
import StatisticSideMenu from "../components/menus/SideMenu/StatisticSideMenu";

import { useLocation } from "react-router-dom";

const BasicLayout = ({ children }) => {
    const location = useLocation();

    // 현재 경로에 따라 사이드 메뉴 선택
    const renderSideMenu = () => {
        if (location.pathname.includes("/showmanager")) {
            return <ShowSideMenu />;
        } else if (location.pathname.includes("/showmanager")) {
            return <MemberSideMenu />;
        } else if (location.pathname.includes("/notice")) {
            return <NoticeSideMenu />;
        } else if (location.pathname.includes("/register")) {
            return <RegisterSideMenu />;
        } else if (location.pathname.includes("/statistic")) {
            return <StatisticSideMenu />;
        } else {
            return null;
        }
    };

    return (
        <>
            <BasicMenu />
            <div className="bg-white my-5 w-full flex flex-col space-y-1 md:flex-row md:space-x-1 md:space-y-0">
                <main className="bg-sky-300 md:w-4/5 lg:w-3/4 px-5 py-5">{children}</main>
                <aside className="bg-green-300 md:w-1/5 lg:w-1/4 px-5 flex py-5">
                    {renderSideMenu()}
                </aside>
            </div>
        </>
    );
};

export default BasicLayout;
