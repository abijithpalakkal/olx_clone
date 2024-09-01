import React,{Suspense, useContext,useEffect,useState} from 'react';
import { Firebasecontext,AuthContext } from '../../store/FirebaseContext';
const Heart=React.lazy(()=>import('../../assets/Heart'))
import './Post.css';
import { collection, getDocs } from "firebase/firestore";
import { Postcontext } from '../../store/Postcontext';
import { useNavigate } from 'react-router-dom';


function Posts() {
  const navigate=useNavigate()
const{firbase,db,auth}=useContext(Firebasecontext)
const [product,setsproduct]=useState([])
const {setpostdetails}=useContext(Postcontext)
useEffect(()=>{
  getDocs(collection(db, "products")).then((snapshot)=>{
    const allpost=snapshot.docs.map((obj)=>{
      return {
        ...obj.data(),id:obj.id
      }
    })
    console.log(allpost)
    setsproduct(allpost)
  })
},[])
  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">
          {
           (product.map((products)=>{
           return (<div
           onClick={()=>{
            setpostdetails(products)
            navigate("/view")
           }}
              className="card"
            >
              <div className="favorite">
                <Suspense fallback={<div>heart is loading...</div>}>
                <Heart></Heart>
                </Suspense>
              </div>
              <div className="image">
                <img src={products.imageurl} alt="" />
              </div>
              <div className="content">
                <p className="rate">&#x20B9; {products.price}</p>
                <span className="kilometer">{products.category}</span>
                <p className="name"> {products.name}</p>
              </div>
              <div className="date">
                <span>{products.createdate}</span>
              </div>
            </div>
           )})
           )
  
          }
        </div>
      </div>
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
          <div className="card">
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src={product[0] ? product[0].imageurl: ''} alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; {product[0] ? product[0].price:''}</p>
              <span className="kilometer">{product[0] ? product[0].category:''}</span>
              <p className="name"> {product[0] ? product[0].name:''}</p>
            </div>
            <div className="date">
              <span>{product[0] ? product[0].createdate: ' '}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Posts;
