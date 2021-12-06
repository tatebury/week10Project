import React from 'react';
import axios from 'axios';


const getAllUsers = () => {
    let result = null;
    axios.get("http://127.0.0.1:5000/user")
    .then(response=>{
        result = response.data.users;
    });
    return result;
}

export const UserCall = (action="getall", id=0, args={}, props) => {
    if (action==="getall"){
        axios.get("http://127.0.0.1:5000/user")
        .then(response=>{
            props.setUsers(response.data.users);
        })

    }
}





