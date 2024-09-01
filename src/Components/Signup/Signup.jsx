import React,{useState,useContext} from 'react';
import {createUserWithEmailAndPassword ,updateProfile } from "firebase/auth";

import Logo from '../../olx-logo.png';
import './Signup.css';
import { Firebasecontext } from '../../store/FirebaseContext';
import { collection, addDoc } from "firebase/firestore"; 
import {useNavigate} from 'react-router-dom'

export default function Signup() {
  const navigate=useNavigate()
  const[username,setusername]=useState('')
  const[email,setemail]=useState('')
  const[phone,setphone]=useState('')
  const[password,setpassword]=useState('')
const{Firebase,db,auth}=useContext(Firebasecontext)

  const handlesubmit=(e)=>{
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up 
        updateProfile(userCredential.user,{displayName:username}).then(async ()=>{
          try {
            const docRef = await addDoc(collection(db, "users"), {
              id:userCredential.user.uid,
              username:username,
             phone:phone
            });
            console.log("Document written with ID: ", docRef.id);
            console.log("*************************************")
            navigate('/login')
          } catch (e) {
            console.log("*****************************************************************************")
            console.error("Error adding document: ", e);
          }
        }).catch((error)=>{
          console.log(error)
        })

        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });



  }

  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handlesubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            value={username}
            onChange={(e)=>{setusername(e.target.value)}}
            id="fname"
            name="name"
            defaultValue="John"
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e)=>{setemail(e.target.value)}}
            id="fname"
            name="email"
            defaultValue="John"
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            value={phone}
            onChange={(e)=>{setphone(e.target.value)}}
            id="lname"
            name="phone"
            defaultValue="Doe"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e)=>{setpassword(e.target.value)}}
            id="lname"
            name="password"
            defaultValue="Doe"
          />
          <br />
          <br />
          <button>Signup</button>
        </form>
        <a>Login</a>
      </div>
    </div>
  );
}
