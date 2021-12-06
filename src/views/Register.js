import React, { Component } from 'react';
import * as Yup from 'yup';
import {Formik, Form, Field} from 'formik';
import Button from 'react-bootstrap/Button';
import { Navigate } from 'react-router-dom';
import axios from 'axios';


const FormSchema = Yup.object().shape({
    "firstName": Yup.string(),
    "lastName": Yup.string(),
    "username": Yup.string().required("Required"),

    "password": Yup.string().required("Required"),
    "confirmPassword": Yup.string().required("Required")
     .oneOf([Yup.ref('password'), null], 'Passwords must match'),
    "icon": Yup.number("Must be a number").integer("Must be a non decimal number").nullable(true)
});

const initialValues = {
    firstName:'',
    lastName:'',
    username:'',
    password:'',
    confirmPassword:'',
    icon:null
};

export default class Register extends Component {

    constructor() {
        super();
        this.state={
            error:'',
            redirect:false
        };
    }



    handleSubmit = ({firstName, lastName, username, password, icon}) => {
        axios.post(`http://127.0.0.1:5000/user?first_name=${firstName}&last_name=${lastName}&username=${username}&password=${password}&icon=${icon}`)
        .then(response=>{
            if (response.data){
                console.log(response.data);
                this.setState({redirect:true})
            }
        })
        .catch(error=>{
            console.error("There was an error trying to create the user: ", error);
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
            {this.state.redirect ? <Navigate to={{pathname:"/login"}}/> :''}

                <center><h1 style={styles.formHead}>Register</h1></center>
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
                                <label style={styles.formLabels} htmlFor="firstName" className="form-label">First Name</label>
                                <Field name="firstName" type="firstName" className="form-control" />
                                {errors.firstName && touched.firstName ? (<div style={styles.error}>{errors.firstName}</div>):null}
                                <small style={styles.error}>{this.state.error}</small>

                                <label style={styles.formLabels} htmlFor="lastName" className="form-label">Last Name</label>
                                <Field name="lastName" type="lastName" className="form-control" />
                                {errors.lastName && touched.lastName ? (<div style={styles.error}>{errors.lastName}</div>):null}
                                <small style={styles.error}>{this.state.error}</small>

                                <label style={styles.formLabels} htmlFor="username" className="form-label">Username</label>
                                <Field name="username" className="form-control" />
                                {errors.username && touched.username ? (<div style={styles.error}>{errors.username}</div>):null}

                                <label style={styles.formLabels} htmlFor="password" className="form-label">Password</label>
                                <Field name="password" type="password" className="form-control" />
                                {errors.password && touched.password ? (<div style={styles.error}>{errors.password}</div>):null}
                                <small style={styles.error}>{this.state.error}</small>

                                <label style={styles.formLabels} htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                                <Field name="confirmPassword" type="password" className="form-control" />
                                {errors.confirmPassword && touched.confirmPassword ? (<div style={styles.error}>{errors.confirmPassword}</div>):null}
                                <small style={styles.error}>{this.state.error}</small>

                                <label style={styles.formLabels} htmlFor="icon" className="form-label">Icon # (any integer)</label>
                                <Field name="icon" type="icon" className="form-control" />
                                {errors.icon && touched.icon ? (<div style={styles.error}>{errors.icon}</div>):null}
                                <small style={styles.error}>{this.state.error}</small>

                                <br/>
                                <Button type="submit" className="btn btn-success">Register</Button>

                            </Form>
                        )
                    }

                </Formik>
            </div>
        );
    }
}


