import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Context,{ Firebasecontext } from './store/FirebaseContext.jsx'
import { Firebase,db,auth } from './firebase1/config.js'
ReactDOM.createRoot(document.getElementById('root')).render(
   <Firebasecontext.Provider value={{Firebase,db,auth }}>
    <Context>
    <App />
    </Context>
    </Firebasecontext.Provider>
)
