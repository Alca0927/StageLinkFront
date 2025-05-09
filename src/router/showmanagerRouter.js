import { Suspense, lazy } from "react";

const Loading = <div>Loading...</div>
// show
const ShowList = lazy(() => import("../pages/showmanager/show/ListPage"))
const ShowAdd = lazy(() => import("../pages/showmanager/show/AddPage"))
const ShowModify = lazy(() => import("../pages/showmanager/show/Modify"))
// showinfo
const ShowInfoList = lazy(() => import("../pages/showmanager/showinfo/ListPage"))
const ShowInfoAdd = lazy(() => import("../pages/showmanager/showinfo/AddPage"))
const ShowInfoModify = lazy(() => import("../pages/showmanager/showinfo/Modify"))
// location
const LocationList = lazy(() => import("../pages/showmanager/location/ListPage"))
const LocationAdd = lazy(() => import("../pages/showmanager/location/AddPage"))
const LocationModify = lazy(() => import("../pages/showmanager/location/Modify"))
// actor
const ActorList = lazy(() => import("../pages/showmanager/actor/ListPage"))
const ActorAdd = lazy(() => import("../pages/showmanager/actor/AddPage"))
const ActorModify = lazy(() => import("../pages/showmanager/actor/Modify"))

const showmanagerRoutor = () => {
    return[
        {
            path: "showlist",
            element : <Suspense fallback={Loading}><ShowList/></Suspense>
        },
        {
            path: "showlist/add",
            element : <Suspense fallback={Loading}><ShowAdd/></Suspense>
        },
        {
            path: "showlist/:show_no",
            element : <Suspense fallback={Loading}><ShowModify/></Suspense>
        },
        {
            path: "showinfo",
            element : <Suspense fallback={Loading}><ShowInfoList/></Suspense>
        },
        {
            path: "showinfo/add",
            element : <Suspense fallback={Loading}><ShowInfoAdd/></Suspense>
        },
        {
            path: "showinfo/:show_no",
            element : <Suspense fallback={Loading}><ShowInfoModify/></Suspense>
        },
        {
            path: "location",
            element : <Suspense fallback={Loading}><LocationList/></Suspense>
        },
        {
            path: "location/add",
            element : <Suspense fallback={Loading}><LocationAdd/></Suspense>
        },
        {
            path: "location/:show_no",
            element : <Suspense fallback={Loading}><LocationModify/></Suspense>
        },
        {
            path: "actor",
            element : <Suspense fallback={Loading}><ActorList/></Suspense>
        },
        {
            path: "actor/add",
            element : <Suspense fallback={Loading}><ActorAdd/></Suspense>
        },
        {
            path: "actor/:show_no",
            element : <Suspense fallback={Loading}><ActorModify/></Suspense>
        }
    ]
}

export default showmanagerRoutor;