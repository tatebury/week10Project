import React from 'react';
import { Navigate } from 'react-router-dom';

const Protectedroute = (props) => {
    return props.token ?(
        props.children
    ):(
        <Navigate to={{pathname:"/login"}} />
    );
}

export default Protectedroute;
