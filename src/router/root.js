import { Suspense, lazy } from "react";
import showmanagerRoutor from "./showmanagerRouter";
import adminRoutor from "./adminRouter";

import { createBrowserRouter } from "react-router-dom";

const Loading = <div>Loading...</div>;

const Main = lazy(() => import("../pages/MainPage"));
const ShowManager = lazy(() => import("../pages/showmanager/ShowMainPage"));
const Administration = lazy(() => import("../pages/AdminMainPage"));

const root = createBrowserRouter([
    {
        path: "/",
        element: <Suspense fallback={Loading}><Main /></Suspense>
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
    }
]);

export default root;