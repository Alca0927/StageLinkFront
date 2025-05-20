import { Suspense, lazy } from "react";

const Loading = <div>Loading...</div>
// show
const ShowList = lazy(() => import("../pages/showmanager/show/ListPage"))
const ShowAdd = lazy(() => import("../pages/showmanager/show/AddPage"))
const ShowModify = lazy(() => import("../pages/showmanager/show/ModifyPage"))
const ShowRead = lazy(() => import("../pages/showmanager/show/ReadPage"))
// showinfo
const ShowInfoList = lazy(() => import("../pages/showmanager/showinfo/ListPage"))
const ShowInfoAdd = lazy(() => import("../pages/showmanager/showinfo/AddPage"))
const ShowInfoModify = lazy(() => import("../pages/showmanager/showinfo/ModifyPage"))
const ShowInfoRead = lazy(() => import("../pages/showmanager/showinfo/ReadPage"))
// location
const LocationList = lazy(() => import("../pages/showmanager/location/ListPage"))
const LocationAdd = lazy(() => import("../pages/showmanager/location/AddPage"))
const LocationModify = lazy(() => import("../pages/showmanager/location/ModifyPage"))
const LocationRead = lazy(() => import("../pages/showmanager/location/ReadPage"))
// actor
const ActorList = lazy(() => import("../pages/showmanager/actor/ListPage"))
const ActorAdd = lazy(() => import("../pages/showmanager/actor/AddPage"))
const ActorModify = lazy(() => import("../pages/showmanager/actor/ModifyPage"))
const ActorRead = lazy(() => import("../pages/showmanager/actor/ReadPage"))


const showmanagerRoutor = () => {
    return[
        // show
        {
            path: "show/list",
            element : <Suspense fallback={Loading}><ShowList/></Suspense>
        },
        {
            path: "show/add",
            element : <Suspense fallback={Loading}><ShowAdd/></Suspense>
        },
        {
            path: "show/read/:showNo",
            element : <Suspense fallback={Loading}><ShowRead/></Suspense>
        },
        {
            path: "show/modify/:showNo",
            element : <Suspense fallback={Loading}><ShowModify/></Suspense>
        },
        // showinfo
        {
            path: "showinfo/list",
            element : <Suspense fallback={Loading}><ShowInfoList/></Suspense>
        },
        {
            path: "showinfo/add",
            element : <Suspense fallback={Loading}><ShowInfoAdd/></Suspense>
        },
        {
            path: "showinfo/read/:showInfo",
            element : <Suspense fallback={Loading}><ShowInfoRead/></Suspense>
        },
        {
            path: "showinfo/modify/:showInfo",
            element : <Suspense fallback={Loading}><ShowInfoModify/></Suspense>
        },
        // location
        {
            path: "location/list",
            element : <Suspense fallback={Loading}><LocationList/></Suspense>
        },
        {
            path: "location/add",
            element : <Suspense fallback={Loading}><LocationAdd/></Suspense>
        },
        {
            path: "location/read/:showlocation",
            element : <Suspense fallback={Loading}><LocationRead/></Suspense>
        },
        {
            path: "location/modify/:showlocation",
            element : <Suspense fallback={Loading}><LocationModify/></Suspense>
        },
        // actor
        {
            path: "actor/list",
            element : <Suspense fallback={Loading}><ActorList/></Suspense>
        },
        {
            path: "actor/add",
            element : <Suspense fallback={Loading}><ActorAdd/></Suspense>
        },
        {
            path: "actor/read/:actorno",
            element : <Suspense fallback={Loading}><ActorRead/></Suspense>
        },
        {
            path: "actor/modify/:actorno",
            element : <Suspense fallback={Loading}><ActorModify/></Suspense>
        }
    ]
}

export default showmanagerRoutor;