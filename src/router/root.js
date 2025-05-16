import { Suspense, lazy } from "react";
import showmanagerRoutor from "./showmanagerRouter";
import adminRoutor from "./adminRouter";
import registermanagerRoutor from "./registermanagerRouter";

import { createBrowserRouter } from "react-router-dom";


const Loading = <div>Loading...</div>
const Main = lazy(() => import("../pages/MainPage"))
const ShowManager = lazy(() => import("../pages/ShowManager/ShowMainPage"))
const RegisterManager = lazy(() => import("../pages/RegisterManager/RegisterMainPage"))
const Administration = lazy(() => import("../pages/AdminMainPage"));


const root = createBrowserRouter([
    {
        path: "/",
        element: <Suspense fallback={Loading}><Main/></Suspense>
    },
    {
        path: "/showmanager",
        element: <Suspense fallback={Loading}><ShowManager /></Suspense>,
        children: showmanagerRoutor()
    },
    {
        path: "/admin",
        element: <Suspense fallback={Loading}><Administration /></Suspense>,
        children: adminRoutor()
    },
        path: "/registermanager",
        element: <Suspense fallback={Loading}><RegisterManager/></Suspense>,
        children: registermanagerRoutor()
    },
]);

export default root;