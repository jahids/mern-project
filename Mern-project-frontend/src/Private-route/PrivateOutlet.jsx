import React from 'react'
import { useCookies } from 'react-cookie';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';

const PrivateOutlet = () => {
    const navigate = useNavigate();
    const [cookies, setCookie, removeCookie] = useCookies([]);
    // console.log(cookies.info.role)
    
    const auth = cookies.info.role
    // if (!cookies.jwt) {

    //     navigate("/");
    //   }else{
    //       console.log('hello')
    //   }

    return  auth === 'ADMIN' ? <Outlet/> : <Navigate to="/" />;
}

export default PrivateOutlet