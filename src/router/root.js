import { Suspense, lazy } from "react";
import showmanagerRoutor from "./showmanagerRouter";
import registermanagerRoutor from "./registermanagerRouter";
import loginRouter from "./loginRouter";

import { createBrowserRouter } from "react-router-dom";


const Loading = <div>Loading...</div>
const Main = lazy(() => import("../pages/MainPage"))
const ShowManager = lazy(() => import("../pages/ShowManager/ShowMainPage"))
const RegisterManager = lazy(() => import("../pages/RegisterManager/RegisterMainPage"))

const root = createBrowserRouter([
    {
        path: "/",
        element: <Suspense fallback={Loading}><Main/></Suspense>
    },
    {
        path: "/admin/showmanager",
        element: <Suspense fallback={Loading}><ShowManager /></Suspense>,
        children: showmanagerRoutor()
    },
    {
        path: "/admin/registermanager",
        element: <Suspense fallback={Loading}><RegisterManager/></Suspense>,
        children: registermanagerRoutor()
    },
    {
        path: "/s",
        children: loginRouter()
    }
]);

export default root;