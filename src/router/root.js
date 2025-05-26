import { Suspense, lazy } from "react";
import showmanagerRoutor from "./showmanagerRouter";

import registermanagerRouter from "./registermanagerRouter"
import membermanagerRouter from "./membermanagerRouter";
import noticemanagerRoutor from "./noticemanagerRouter";
import loginRouter from "./loginRouter";


import { createBrowserRouter } from "react-router-dom";

const Loading = <div>Loading...</div>;


const Main = lazy(() => import("../pages/MainPage"))
const ShowManager = lazy(() => import("../pages/showmanager/ShowMainPage"))
const RegisterManager = lazy(() => import("../pages/RegisterManager/RegisterMainPage"))
const MemberManager = lazy(() => import("../pages/membermanager/MemberMainPage"));
const NoticeManager = lazy(() => import("../pages/noticeManager/noticeMainPage"));


const root = createBrowserRouter([
    {
        path: "/",
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
    }
]);

export default root;