import React, { useContext, useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets';
import { StoreContext } from '../../Contextt/StoreContext';
import axios from 'axios';

const LoginPopup = ({setshowlogin}) => {

   const {url, settoken} = useContext(StoreContext);
   const [currstate, setcurrstate] = useState("Sign up");
   const [data, setdata] = useState({
    name:"",
    email:"",
    password:"",
   })

   const onchangehandler=(event)=>{
    const name= event.target.name;
     const value = event.target.value;
     setdata(data =>({...data,[name]:value}));
   }

   const onLogin = async (event) =>{
      event.preventDefault();
      let newurl = url;
      if(currstate==='Login'){
        newurl+='/api/user/login';
      }
      else{
        newurl+='/api/user/register';
      }
      const response = await axios.post(newurl, data)
      if(response.data.success){
        settoken(response.data.token)
        localStorage.setItem("token",response.data.token);
        setshowlogin(false);
      }
      else{
        alert(response.data.message);
      }
   }

  return (
    <div className='login-popup'>
      <form onSubmit={onLogin} className="login-popup-container">

        <div className="login-popup-signup">
            <h2>{currstate}</h2>
            <img onClick={()=>setshowlogin(false)} src={assets.cross_icon} alt="" />
        </div>
        <div className="login-popup-inputs">
            {currstate==="Login"?<></>:<input name="name" onChange={onchangehandler} value={data.name} type="text" placeholder='your name'  required/>}
            
            <input name="email" onChange={onchangehandler} value={data.email} type="text" placeholder='your email' required/>
            <input name="password" onChange={onchangehandler} value={data.password} type="text" placeholder='password' required />
            
        </div>
        <button type='submit'>{currstate==="Sign up"?"Create account":"Login"}</button>
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
