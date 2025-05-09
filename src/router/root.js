import { Suspense, lazy } from "react";
import showmanagerRoutor from "./showmanagerRouter";

const {createBrowserRouter} = require("react-router-dom");

const Loading = <div>Loading...</div>
const Main = lazy(() => import("../pages/MainPage"))
const ShowManager = lazy(() => import("../pages/showmanager/ShowMainPage"))

const root = createBrowserRouter([
    {
        path: "",
        element: <Suspense fallback={Loading}><Main/></Suspense>
    },
    {
        path: "/showmanager",
        element: <Suspense fallback={Loading}><ShowManager/></Suspense>,
        children: showmanagerRoutor()
    }
])

export default root;