import React, { useState, useEffect } from 'react';
import {Formik, Form, Field} from 'formik';
import Button from 'react-bootstrap/Button';
import * as Yup from 'yup';
import axios from 'axios';



const FormSchema = Yup.object().shape({
    "body": Yup.string(300).required("Cannot post nothing")
})

const initialValues = {
    body:''
}

const Home = (props) => {
    const [error, setError] = useState('');
    const [posts, setPosts] = useState([]);
    const [refreshPosts, setRefreshPosts] = useState('');
    
    useEffect(() => {
        axios.get(`http://127.0.0.1:5000/following/posts/${props.currentUserID}`)
        .then(response=>{
            console.log(response.data);
            setPosts(response.data.posts);
        })
        
    }, [refreshPosts]);

    const handleSubmit=({body})=>{
        console.log(body);
        axios.post(`http://127.0.0.1:5000/posts?body=${body}&user_id=${props.currentUserID}`)
        .then(response=>{
            console.log(response.data);
            setRefreshPosts('refresh');
        })
    }

    const styles = {
        pageStyles:{
            backgroundColor: "rgb(56,56,56)",
            padding:"20px",
            minHeight:"94vh",
            color:"azure"
        },
        headerStyles:{
            color:"azure"
        },
        error:{
            color:"red"
        }
    }

    return (
        <div style={styles.pageStyles}>
        Share your latest stroke of genius with your friends:
        <br/>
        <br/>
            <Formik initialValues={initialValues}
                validationSchema={FormSchema}
                onSubmit={
                    (values)=>{
                        handleSubmit(values);
                    }
                }>
                {
                    ({errors, touched})=>(
                        <Form>
                            <Field name="body" component="textarea" rows="4" className="form-control" />
                            {errors.body && touched.body ? (<div style={styles.error}>{errors.body}</div>):null}

                            <br/>
                            <Button type="submit" className="btn btn-primary">Post</Button>

                        </Form>
                    )
                }
            </Formik>
            <br/>
            See what your friends having been saying:
            <br/>
            <br/>

            {posts.length>0 ?
            <ul style={{"listStyleType":"none"}}>
                {posts.map((post)=>(
                    <li key={post.id}>
                        <img src={`https://avatars.dicebear.com/api/micah/${post.author_icon}.svg`} style={{"maxHeight":"3rem"}}/>
                        <b>{post.author}</b>
                        <br/>
                        {post.body}
                        <br/>
                        <br/>
                    </li>
                    ))}
            </ul>
            :''}
        </div>
    );
}

export default Home;
