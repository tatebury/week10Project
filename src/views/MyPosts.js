import React, {useState, useEffect} from 'react';
import {Col, Row, Button} from 'react-bootstrap'
import PostCard from '../components/PostCard'
import { Navigate } from 'react-router-dom';
import axios from 'axios';


const MyPosts = (props) => {
    const [posts, setPosts] = useState([]);
    const [refreshPosts, setRefreshPosts] = useState('');
    const [redirect, setRedirect] = useState(false);
    
    useEffect(() => {
        axios.get(`http://127.0.0.1:5000/user/${props.currentUserID}/posts`)
        .then(response=>{
            console.log(response.data);
            setPosts(response.data.posts);
        })
        
    }, [refreshPosts]);

    const styles = {
        catButton:{
            backgroundColor: "white",
            color:"black",
            width: '100%',
            border: '1px solid grey',
            borderRadius: '15px',
            marginBottom:'5px'
        },
        pageStyles:{
            backgroundColor: "grey",
            padding:"20px",
            minHeight:"94vh",
            color:"azure"
        },
        headerStyles:{
            color:"azure"
        }
    }


    return (
        <div style={styles.pageStyles}>
            Here are all your posts (incomplete):
            {/* {redirect ? <Navigate to={{pathname:"/editpost", props:{post:postToEdit}}}/> : */}

                <Row>

                    <Col md={12}>
                        {/* post section */}
                        <Row>
                            
                        </Row>

                    </Col>

                </Row>
            {/* } */}
        </div>
    );
}

export default MyPosts;
