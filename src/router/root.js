import { Suspense, lazy } from "react";
import showmanagerRoutor from "./showmanagerRouter";

import registermanagerRouter from "./registermanagerRouter"
import membermanagerRouter from "./membermanagerRouter";
import noticemanagerRoutor from "./noticemanagerRouter";
import loginRouter from "./loginRouter";
import LoginPage from "../pages/login/LoginPage"; // ?
import statisticsRouter from "./statisticsRouter";
import { createBrowserRouter } from "react-router-dom";
import AddEventPage from "../pages/AddEventPage";

const Loading = <div>Loading...</div>;

const Main = lazy(() => import("../pages/MainPage"))
const ShowManager = lazy(() => import("../pages/showmanager/ShowMainPage"))
const RegisterManager = lazy(() => import("../pages/RegisterManager/RegisterMainPage"))
const MemberManager = lazy(() => import("../pages/membermanager/MemberMainPage"));
const NoticeManager = lazy(() => import("../pages/noticeManager/noticeMainPage"));
const StatisticsManager = lazy(() => import("../pages/statisticsManager/StatisticsMainPage"))


const root = createBrowserRouter([
    {
        path: "/",
        element: <Suspense fallback={Loading}><LoginPage /></Suspense>
    },
    {
        path: "/main",
        element: <Suspense fallback={Loading}><Main /></Suspense>
    },
    {
        path: "/admin/showmanager",
        element: <Suspense fallback={Loading}><ShowManager /></Suspense>,
        children: showmanagerRoutor()
    },
    {
        path: "/admin/registermanager",
        element: <Suspense fallback={Loading}><RegisterManager/></Suspense>,
        children: registermanagerRouter()
    },
    {
        path: "/admin/membermanager",
        element: <Suspense fallback={Loading}><MemberManager /></Suspense>,
        children: membermanagerRouter()
    },
    {
        path: "/admin/noticemanager",
        element: <Suspense fallback={Loading}><NoticeManager /></Suspense>,
        children: noticemanagerRoutor()
    },
    {
        path: "/s",
        children: loginRouter()
    },
    {
        path: "/admin/statisticsmanager",
        element: <Suspense fallback={Loading}><StatisticsManager/></Suspense>,
        children: statisticsRouter()
    },
      {
    path: "/add-event",
    element: <Suspense fallback={Loading}><AddEventPage /></Suspense>
  }
]);

export default root;