import React,{useContext,useEffect,useState} from 'react';
import { Postcontext } from '../../store/Postcontext';
import {Firebasecontext} from '../../store/FirebaseContext'
import { collection, query, where, getDocs } from "firebase/firestore";


import './View.css';
function View() {
  
  const {postdetails}=useContext(Postcontext)
  const[userdetails,setuserdetails]=useState(null)
  const {db}=useContext(Firebasecontext)
  useEffect(() => {
    const searchDocuments = async () => {
      const q = query(collection(db, 'users'), where('id', '==', postdetails.userid));
    console.log(q,'q')
      try {
        const querySnapshot = await getDocs(q);
        console.log(querySnapshot,'hiii');
        const results = querySnapshot.docs.map((doc) => ({
          
          data: doc.data(),
        }));
        console.log("******************")
        console.log(results)
        setuserdetails(results)
      } catch (error) {
        console.error('Error searching documents:', error);
      }
    };

    searchDocuments();

  }, []);


  console.log("***********")
  console.log(postdetails)
  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src={postdetails.imageurl}
          alt=""
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postdetails.price} </p>
          <span> {postdetails.name}</span>
          <p> {postdetails.category}</p>
          <span> {postdetails.createdate}</span>
        </div>
        <div className="contactDetails">
          <p>Seller details</p>
          <p>name:{userdetails ? userdetails[0].data.username:" "}</p>
          <p>contact no:{userdetails ? userdetails[0].data.username:" "}</p>
        </div>
      </div>
    </div>
  );
}
export default View;
