import React, { Component } from 'react';
import * as Yup from 'yup';
import {Formik, Form, Field} from 'formik';
import Button from 'react-bootstrap/Button';
import { Navigate } from 'react-router-dom';
import axios from 'axios';


const FormSchema = Yup.object().shape({
    "username": Yup.string().required("Required"),

    "password": Yup.string().required("Required")
})

const initialValues = {
    username:'',
    password:''
}

export default class Login extends Component {

    constructor() {
        super();
        this.state={
            error:'',
            redirect:false
        };
    }



    handleSubmit = ({username, password}) => {
        
        axios.post(`http://127.0.0.1:5000/token?username=${username}&password=${password}`)
        .then(response=>{
            this.props.setToken(response.data.token);
            this.props.setCurrentUserID(response.data.currentUserID);
            return response;
        })
        .then(response=>{
            if (response.data.token){
                console.log(response.data);
                this.setState({redirect:true})
            }
            return response;
        })
    }

    render() {
        const styles={
            error: {color:'red'},
            formLabels:{
                color: "azure"
            },
            pageStyles:{
                backgroundColor: "grey",
                padding:"80px",
                minHeight:"94vh"
            },
            formHead:{
                color: "azure",
                fontWeight:"bold"
            }

        }
        return (
            <div style={styles.pageStyles}>
            {/* <p>Redirect: {`${this.state.redirect}`}</p> */}
            {this.state.redirect ? <Navigate to={{pathname:"/", props:{token:this.props.token}}}/> :''}

                <center><h1 style={styles.formHead}>Login</h1></center>
                <Formik initialValues={initialValues}
                    validationSchema={FormSchema}
                    onSubmit={
                        (values)=>{
                            this.handleSubmit(values);
                        }
                    }>
                    {
                        ({errors, touched})=>(
                            <Form>
                                <label style={styles.formLabels} htmlFor="username" className="form-label">Username</label>
                                <Field name="username" className="form-control" />
                                {errors.username && touched.username ? (<div style={styles.error}>{errors.username}</div>):null}

                                <label style={styles.formLabels} htmlFor="password" className="form-label">Password</label>
                                <Field name="password" type="password" className="form-control" />
                                {errors.password && touched.password ? (<div style={styles.error}>{errors.password}</div>):null}
                                <small style={styles.error}>{this.state.error}</small>

                                <br/>
                                <Button type="submit" className="btn btn-primary">Login</Button>

                            </Form>
                        )
                    }

                </Formik>
            </div>
        );
    }
}


