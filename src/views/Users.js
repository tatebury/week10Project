import React, {useState} from 'react';
// import {UserCall} from '../api/UserCall';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
// import {parseBool} from '../helpers';



const Users = (props) => {
    
    const getAllUsers = () => {
        axios.get(`http://127.0.0.1:5000/users/${props.currentUserID}`)
        .then(response=>{
            setUsers(response.data.users);
        });
    }
    const [users, setUsers] = useState(()=>getAllUsers());

    // const getIsFollowing = async (otherUserID) => {
    //     return await axios.get(`http://127.0.0.1:5000/isfollowing/${props.currentUserID}/${otherUserID}`)
    //     .then(response=>{
    //         // console.log(parseBool(response.data));
    //         return parseBool(response.data);
    //     })
    // }

    const handleFollow=async(id, userIndex, unfollow=false)=>{
        if (unfollow===false){
            await axios.put(`http://127.0.0.1:5000/follow/${props.currentUserID}/${id}`)
            .then((response)=>{
                if (response.data){
                    console.log(response.data);
                }
            })
        }
        else{
            await axios.put(`http://127.0.0.1:5000/unfollow/${props.currentUserID}/${id}`)
            .then((response)=>{
                if (response.data){
                console.log(response.data);
                }
            })
        }
        getAllUsers();
    }
    return (
        <div>
            {users ?
            <Table striped bordered hover>
                <tbody>
                    {users.map(
                        user => {
                            if (user.id!==parseInt(props.currentUserID)){
                                
                                return(
                                    <tr key={user.id}>
                                    <td style={{"width":"1vw"}}><p style={{"display":"flex", "justifyContent":"center"}}>{user.id}</p></td>
                                    <td style={{"width":"6vw"}}>
                                    <img src={`https://avatars.dicebear.com/api/micah/${user.icon}.svg`} style={{"maxHeight":"4vw"}}/>
                                    </td>
                                    <td style={{"width":"25vw"}}><p style={{"display":"flex", "justifyContent":"center"}}><b>{user.username}</b></p></td>
                                    <td style={{"width":"25vw"}}><p style={{"display":"flex", "justifyContent":"center"}}>{user.first_name} {user.last_name}</p></td>
                                    {user.is_following?
                                    <td style={{"width":"43vw"}}>
                                    <Button variant="danger" onClick={()=>handleFollow(user.id, users.indexOf(user), true)}>Unfollow</Button>
                                    </td>
                                    :
                                    <td style={{"width":"43vw"}}>
                                    <Button onClick={()=>handleFollow(user.id, users.indexOf(user))}>Follow</Button>
                                    </td>
                                    }
                                    </tr>
                                );
                            }
                        }
                    )}
                </tbody>
            </Table>

            :'No Users'}
        </div>
    );
}

export default Users;
