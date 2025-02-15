import React, { useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets';
const LoginPopup = ({setshowlogin}) => {

   const [currstate, setcurrstate] = useState("Sign up");


  return (
    <div className='login-popup'>
      <form  className="login-popup-container">
        <div className="login-popup-signup">
            <h2>{currstate}</h2>
            <img onClick={()=>setshowlogin(false)} src={assets.cross_icon} alt="" />
        </div>
        <div className="login-popup-input">
            {currstate==="Login"?<></>:<input type="text" placeholder='your name'  required/>}
            
            <input type="text" placeholder='your email' required/>
            <input type="text" placeholder='password' required />
            
        </div>
        <button>{currstate==="Sign up"?"Create account":"Login"}</button>
        <div className="login-popup-condition">
            <input type="checkbox" required/>
            <p>By continuing, I agree to the terms of use and privacy policy</p>
        </div>
        {currstate==="Login"?
        <p>Create a new account? <span onClick={()=>setcurrstate("Sign up")}>Click here</span></p>:
        <p>Already have an account? <span onClick={()=>setcurrstate("Login")}>Login here</span></p>
        }
        
        
      </form>
    </div>
  )
}

export default LoginPopup
