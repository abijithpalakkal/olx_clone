import React,{useContext,useState,createContext} from "react";
export const Postcontext=createContext(null)

function Post({children}){
    const[postdetails,setpostdetails]=useState()
    return(
        <Postcontext.Provider value={{postdetails,setpostdetails}}> 
            {children}
        </Postcontext.Provider>
    )
}

export default Post