import React, { Component } from 'react';
import {Routes, Route} from 'react-router-dom';
import Home from './views/Home';
import ProtectedRoute from './components/ProtectedRoute';
// import AdminRoute from './components/AdminRoute';
import NavBar from './components/NavBar';
import Login from './views/Login';
import Register from './views/Register';
import Logout from './views/Logout';
import Users from './views/Users';
import MyPosts from './views/MyPosts';
import 'bootstrap/dist/css/bootstrap.min.css';
// import {titleCase} from './helpers';



export default class App extends Component {

  constructor(){
    super();
    this.state={
      user:'',
      currentUserID:0,
      token:'',
      isAdmin: false
    };
  }

  setUser = (user) =>{
    this.setState({user});
  }

  setToken = (token) =>{
    localStorage.setItem('token',token);
    this.setState({token:token});
  }
  setCurrentUserID = (id) =>{
    localStorage.setItem('currentUserID',id);
    this.setState({currentUserID:id});
  }
  static getDerivedStateFromProps = (props,state)=>{
    return {"token":localStorage.getItem('token'), "currentUserID":localStorage.getItem('currentUserID')}
  }



  render() {
    return (
      <div>
        <NavBar token={this.state.token}/>
        {/* {"my token: "+this.state.token} */}

        <Routes>
          <Route path = '/' element={
            <ProtectedRoute token={this.state.token}>
              <Home
              isAdmin={this.state.isAdmin}
              currentUserID={this.state.currentUserID}
              />
            </ProtectedRoute>
          }/>

          <Route path = '/users' element={
            <ProtectedRoute token={this.state.token}>
              <Users
              currentUserID={this.state.currentUserID}
              isAdmin={this.state.isAdmin}
              />
            </ProtectedRoute>
          }/>

          <Route path = '/myposts' element={
            <ProtectedRoute token={this.state.token}>
              <MyPosts
              currentUserID={this.state.currentUserID}
              isAdmin={this.state.isAdmin}
              />
            </ProtectedRoute>
          }/>

          <Route path = '/logout' element={
            <ProtectedRoute token={this.state.token}>
              <Logout
              setToken={this.setToken}
              />
            </ProtectedRoute>
          }/>

          <Route path = '/login' element={
            <Login
            setToken={this.setToken}
            token={this.state.token}
            setCurrentUserID={this.setCurrentUserID}
            />
          }/>

          <Route path = '/register' element={
            <Register
            
            />
          }/>
        </Routes>
      </div>
    );
  }
}
