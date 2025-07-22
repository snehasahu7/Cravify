import React from 'react'
import './MyOrders.css'
import { useState } from 'react'
import { useContext } from 'react';
import { StoreContext } from '../../Contextt/StoreContext';
import { useEffect } from 'react';
import axios from 'axios';
import { assets } from '../../assets/assets';
const MyOrders = () => {
    const [data,setdata]=useState([]);

    const{url,token} = useContext(StoreContext);

    const fetchOrders=async()=>{
        const response = await axios.post(url+"/api/order/userorders",{},{headers:{token}});
        setdata(response.data.data);
        console.log(response.data.data);
    }

    useEffect(()=>{
         if(token){
            fetchOrders();
         }
    },[token])
  return (
    <div className='my-orders'>
        <div className="container">
            {data.map((order,index)=>{
               return(
                <div key={index} className="my-orders-order">
                    <img src={assets.parcel_icon} alt="" />
                    <p>{order.items.map((item,index)=>{
                         if(index===order.items.length-1){
                             return item.name+" x "+item.quantity 
                         }
                    })}</p>
                </div>
               )
            })}
        </div>
      
    </div>
  )
}

export default MyOrders
