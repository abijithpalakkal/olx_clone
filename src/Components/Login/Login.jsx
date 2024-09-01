import React, { useState ,useContext} from 'react';
import { Firebasecontext } from '../../store/FirebaseContext';
import Logo from '../../olx-logo.png';
import './Login.css';
import {signInWithEmailAndPassword } from "firebase/auth";
import {  useNavigate } from 'react-router-dom';

function Login() {
  const navigate=useNavigate()
  const [email,setemail]=useState('')
  const [password,setpassword]=useState('')
  const{Firebase,db,auth}=useContext(Firebasecontext)
  const handlelogin=(e)=>{
     e.preventDefault()
     signInWithEmailAndPassword(auth, email, password)
     .then((userCredential) => {
       // Signed in 
       const user = userCredential.user;
       
       navigate("/")
       // ...
     })
     .catch((error) => {
       const errorCode = error.code;
       const errorMessage = error.message;
       alert(errorMessage)
     });
  }
  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handlelogin}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e)=>{
              setemail(e.target.value)
            }}
            id="fname"
            name="email"
            defaultValue="John"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e)=>{
              setpassword(e.target.value)
            }}
            id="lname"
            name="password"
            defaultValue="Doe"
          />
          <br />
          <br />
          <button>Login</button>
        </form>
        <a>Signup</a>
      </div>
    </div>
  );
}

export default Login;
