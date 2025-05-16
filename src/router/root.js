import { Suspense, lazy } from "react";
import showmanagerRoutor from "./showmanagerRouter";
import registermanagerRoutor from "./registermanagerRouter";

const {createBrowserRouter} = require("react-router-dom");

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
        path: "/showmanager",
        element: <Suspense fallback={Loading}><ShowManager/></Suspense>,
        children: showmanagerRoutor()
    },
    {
        path: "/registermanager",
        element: <Suspense fallback={Loading}><RegisterManager/></Suspense>,
        children: registermanagerRoutor()
    },
]);

export default root;