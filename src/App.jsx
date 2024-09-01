import React, { useContext, useEffect } from 'react';
import "./App.css"
import { BrowserRouter,Routes,Route} from 'react-router-dom';
import Home from './Pages/Home';
import LoginPage from './Pages/Login';
import SignupPage from './Pages/Signup'
import Create from './Pages/Create'
import View from './Pages/ViewPost'
import { AuthContext,Firebasecontext } from './store/FirebaseContext';
import {onAuthStateChanged } from "firebase/auth";
import Post from './store/Postcontext';
function App() {
const {setuser}=useContext(AuthContext)
const {db,auth}=useContext(Firebasecontext)
useEffect(()=>{
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setuser(user)
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      const uid = user.uid;
      // ...
    } else{
      setuser(null)
    }
  },[]);
})
  return (
    <div>
      <Post>
      <BrowserRouter>
      <Routes>
      <Route exact path='/' element={<Home/>} />
      <Route path='/signup' element={<SignupPage/>} />
      <Route path='/login' element={<LoginPage/>} />
      <Route path='/create' element={<Create/>} />
      <Route path='/view' element={<View/>} />
      </Routes>
      </BrowserRouter>
      </Post>
    </div>
  );
}

export default App;
