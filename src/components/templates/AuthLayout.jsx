
import { Outlet, useLocation, Navigate } from 'react-router-dom';
import useLoggedInUser from '../../hooks/useLoggedInUser';

export default function AuthLayout() {
    const location = useLocation();
    const {pathname} = location || {};
    const {accessToken, csrfToken} = useLoggedInUser();


    //If alrady logged & the current path is login(/) then redirect to products page
    if(accessToken && csrfToken && pathname == '/') return <Navigate to="/products" />

    return (
        <div className="min-w-[960px]">
            <Outlet />
        </div>
    )
}