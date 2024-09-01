import React, { Fragment, useEffect, useState,useContext } from 'react';
import './Create.css';
import Header from '../Header/Header';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Firebasecontext,AuthContext } from '../../store/FirebaseContext';
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';





const Create = () => {
  const navigate=useNavigate()
  const[productname,setproductname]=useState("")
  const[category,setcategory]=useState("")
  const[price,setprice]=useState("")
  const[image,setimage]=useState(null)


  const{Firebase,db,auth}=useContext(Firebasecontext)
  const {user}=useContext(AuthContext)
  
    console.log(productname)
    console.log(category)
    console.log(price)

    async function handleupload(e){
      e.preventDefault()
      const storage = getStorage();
    


    const storageRef = ref(storage, `images/${image.name}`);
    uploadBytes(storageRef, image).then(({ metadata }) => {
      getDownloadURL(storageRef).then((url)=>{
        const date = new Date();
        addDoc(collection(db, "products"), {
         name:productname,
         price:price,
         category:category,
         imageurl:url,
         userid:user.uid,
         createdate:date.toDateString()
        }).then(()=>{
          navigate("/")
        })
        .catch((error)=>{
          console.log(error)
        })

      })
    })

    }

  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
          <form>
            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              type="text"
              value={productname}
              onChange={(e)=>{setproductname(e.target.value)}}
              id="fname"
              name="Name"
              
            />
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
              value={category}
              onChange={(e)=>{setcategory(e.target.value)}}
              id="fname"
              name="category"
              
            />
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input className="input" 
            type="number" 
            value={price}
            onChange={(e)=>{setprice(e.target.value)}}
            id="fname"
             name="Price" 
            />

            <br />
          </form>
          <br />
          <img alt="Posts" width="200px" height="200px" src={image ? URL.createObjectURL(image): null}></img>
          <form>
            <br />
            <input 
            onChange={(e)=>{
              setimage(e.target.files[0])
            }}
            type="file" />
            <br />
            <button onClick={handleupload} className="uploadBtn">upload and Submit</button>
          </form>
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
