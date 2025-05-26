import { Suspense,lazy } from "react";

const Loading = <div>Loading...</div>
const Login = lazy(() => import("../pages/login/LoginPage"))
const Logout = lazy(() => import("../pages/login/LogoutPage"))

const loginRouter = () => {
    return [
        {
            path:"login",
            element:<Suspense fallback={Loading}><Login/></Suspense>
        },
        {
            path:"logout",
            element:<Suspense fallback={Loading}><Logout/></Suspense>    
        }
    ]
}

export default loginRouter;