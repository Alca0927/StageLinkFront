import BasicMenu from "../components/menus/BasicMenu";
import ShowSideMenu from "../components/menus/SideMenu/ShowSideMenu";
import MemberSideMenu from "../components/menus/SideMenu/MemberSideMenu";
import NoticeSideMenu from "../components/menus/SideMenu/NoticeSideMenu";
import RegisterSideMenu from "../components/menus/SideMenu/RegisterSideMenu";
import StatisticSideMenu from "../components/menus/SideMenu/StatisticSideMenu";

import { useLocation } from "react-router-dom";

const BasicLayout = ({ children, hideSidebar = false }) => {
  const location = useLocation();

  const renderSideMenu = () => {
    if (location.pathname.includes("/showmanager")) {
      return <ShowSideMenu />;
    } else if (location.pathname.includes("/membermanager")) {
      return <MemberSideMenu />;
    } else if (location.pathname.includes("/noticemanager")) {
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
      <div className="w-full flex flex-col md:flex-row mt-1 mb-5 bg-gray-50 space-y-1 md:space-y-0 md:space-x-2">
        <main className={`${hideSidebar ? 'w-full' : 'md:w-4/5 lg:w-3/4'} bg-sky-100 text-gray-800 px-5 py-5`}>
          {children}
        </main>
        {!hideSidebar && (
          <aside className="md:w-1/5 lg:w-1/4 bg-blue-800 text-white px-5 py-5">
            {renderSideMenu()}
          </aside>
        )}
      </div>
    </>
  );
};

export default BasicLayout;
