import { Suspense, lazy } from "react";

const Loading = <div>Loading...</div>
// show
const ShowList = lazy(() => import("../pages/ShowManager/show/ListPage"))
const ShowAdd = lazy(() => import("../pages/ShowManager/show/AddPage"))
const ShowModify = lazy(() => import("../pages/ShowManager/show/ModifyPage"))
const ShowRead = lazy(() => import("../pages/ShowManager/show/ReadPage"))
// showinfo
const ShowInfoList = lazy(() => import("../pages/ShowManager/showinfo/ListPage"))
const ShowInfoAdd = lazy(() => import("../pages/ShowManager/showinfo/AddPage"))
const ShowInfoModify = lazy(() => import("../pages/ShowManager/showinfo/ModifyPage"))
const ShowInfoRead = lazy(() => import("../pages/ShowManager/showinfo/ReadPage"))
// location
const LocationList = lazy(() => import("../pages/ShowManager/location/ListPage"))
const LocationAdd = lazy(() => import("../pages/ShowManager/location/AddPage"))
const LocationModify = lazy(() => import("../pages/ShowManager/location/ModifyPage"))
const LocationRead = lazy(() => import("../pages/ShowManager/location/ReadPage"))
// actor
const ActorList = lazy(() => import("../pages/ShowManager/actor/ListPage"))
const ActorAdd = lazy(() => import("../pages/ShowManager/actor/AddPage"))
const ActorModify = lazy(() => import("../pages/ShowManager/actor/ModifyPage"))
const ActorRead = lazy(() => import("../pages/ShowManager/actor/ReadPage"))
// actorshow
const ActorShowList = lazy(() => import("../pages/ShowManager/actorshow/ListPage"))
const ActorShowAdd = lazy(() => import("../pages/ShowManager/actorshow/AddPage"))
const ActorShowModify = lazy(() => import("../pages/ShowManager/actorshow/ModifyPage"))
const ActorShowRead = lazy(() => import("../pages/ShowManager/actorshow/ReadPage"))

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
            path: "actor/read/:actorNo",
            element : <Suspense fallback={Loading}><ActorRead/></Suspense>
        },
        {
            path: "actor/modify/:actorNo",
            element : <Suspense fallback={Loading}><ActorModify/></Suspense>
        },
        // actorshow
        {
            path: "actorshow/list",
            element : <Suspense fallback={Loading}><ActorShowList/></Suspense>
        },
        {
            path: "actorshow/add",
            element : <Suspense fallback={Loading}><ActorShowAdd/></Suspense>
        },
        {
            path: "actorshow/read/:actorNo/:showinfo",
            element : <Suspense fallback={Loading}><ActorShowRead/></Suspense>
        },
        {
            path: "actorshow/modify/:actorNo/:showinfo",
            element : <Suspense fallback={Loading}><ActorShowModify/></Suspense>
        },
    ]
}

export default showmanagerRoutor;