import React from 'react'
import './Verify.css'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useContext } from 'react';
import { StoreContext } from '../../Contextt/StoreContext';
import { useEffect } from 'react';
import axios from 'axios';
const Verify = () => {
    const [searchParams,setsearchparams]=useSearchParams();
    const success = searchParams.get("success");
    const orderId = searchParams.get("orderId");
    const {url} = useContext(StoreContext);
    const navigate =useNavigate();

    const verifyPayment = async() =>{
        const response = await axios.post(url+"/api/order/verify",{success,orderId});
        if(response.data.success){
            navigate("/myorders");
        }
        else{
            navigate("/")
        }
    }
    useEffect(()=>{
       verifyPayment();
    },[])

    console.log(success,orderId);
  return (
    <div className='verify'>
        <div className="spinner">

        </div>
      
    </div>
  )
}

export default Verify


