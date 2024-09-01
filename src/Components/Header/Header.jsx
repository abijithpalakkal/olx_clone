import React,{useContext} from 'react';

import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import {AuthContext,Firebasecontext} from "../../store/FirebaseContext"
import {signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';



function Header() {
  const navigate=useNavigate()
  const{auth}=useContext(Firebasecontext)
  const {user}=useContext(AuthContext)
  function handlelogout(){
    signOut(auth).then(() => {
    navigate("/login")
    }).catch((error) => {
      console.log(error)
    });
    
  }

  const getcreatepage=()=>{
    if(user){
      navigate("/create") 
    }else{
      navigate("/login")
    }
    
  }
  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <OlxLogo></OlxLogo>
        </div>
        <div className="placeSearch">
          <Search></Search>
          <input type="text" />
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        <div className="loginPage">
          <span onClick={()=>{ navigate("/login")}}>{user ? `welcome ${user.displayName}` : "login"}</span>
         
          <hr />
          
        </div>
        {user && <span onClick={handlelogout} style={{cursor:'pointer'}}>logout</span>}
        <div className="sellMenu">
          <SellButton></SellButton>
         <div onClick={getcreatepage} className="sellMenuContent">
            <SellButtonPlus></SellButtonPlus>
            <span >SELL</span>
          </div>
  
        </div>

      </div>
    </div>
  );
}

export default Header;
