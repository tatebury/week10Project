import React, { useState, useEffect } from 'react'
import { Card, Col, Button } from 'react-bootstrap';

const PostCard=(props)=>{

    const [clicked, setClicked] = useState(false);
    const [redirect, setRedircet] = useState(false);

    // const handleRenderpost=()=>{
    //     setClicked(true);
    // }

    const goToEditPost=(post)=>{

    }

    const deletePost=(postID)=>{
        
    }



    return (
        <>

        <Col>
        {/* come back for single post */}
            <Card style={{ width: '150px', marginBottom:"25px" }}>
            <Card.Body>
                <Card.Title>{props.post.author ?? "No author"}</Card.Title>

                <br/>
                <Card.Text>
                {props.post.body.substring(0,50) ?? "No Content"}
                </Card.Text>

                <br/>
                <div>
                <Button  style={{margin:"5px 0px"}} variant="warning" onClick={()=>props.goToEditPost(props.post)} >Edit post</Button>
                <Button  style={{margin:"5px 0px"}} variant="danger" onClick={()=>props.deletePost(props.post.id)} >Delete post</Button>
                
                </div>
            </Card.Body>
            </Card>
        </Col>
        
        </>
    )
    
}
export default PostCard;