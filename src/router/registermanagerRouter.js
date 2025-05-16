import { Suspense, lazy } from "react";

const Loading = <div>Loading...</div>
// show
const ReservationList = lazy(() => import("../pages/RegisterManager/Reservation/ListPage"))
const RefundList = lazy(() => import("../pages/RegisterManager/Refund/ListPage"))
const ReservationRead = lazy(() => import("../pages/RegisterManager/Reservation/ReadPage"))
const RefundRead = lazy(() => import("../pages/RegisterManager/Refund/ReadPage"))

const registermanagerRoutor = () => {
    return[
        // show
        {
            path: "reservation/list",
            element : <Suspense fallback={Loading}><ReservationList/></Suspense>
        },
        {
            path: "refund/list",
            element : <Suspense fallback={Loading}><RefundList/></Suspense>
        },
        {
            path: "reservation/read/:reservationNo",
            element : <Suspense fallback={Loading}><ReservationRead/></Suspense>
        },
        {
            path: "refund/read/:refundNo",
            element : <Suspense fallback={Loading}><RefundRead/></Suspense>
        },
    ]
}

export default registermanagerRoutor;