import React, { useContext} from 'react'
import './Placeorder.css'
import { StoreContext } from '../../Contextt/StoreContext'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'

const Placeorder = () => {

  const {gettotalcartamount,token,food_list,cartitem,url} = useContext(StoreContext)
  const [data,setdata]=useState({
    firstName:"",
    lastName:"",
    email:"",
    street:"",
    city:"",
    state:"",
    zipcode:"",
    country:"",
    phone:""
  })

  const onChangehandler= (event) =>{
    const name= event.target.name;
    const value=event.target.value;
    setdata(data=>({...data,[name]:value}))
  }

  const loadRazorpayScript=()=>{
    return new Promise((resolve)=>{
      const script = document.createElement("script");
      script.src="https://checkout.razorpay.com/v1/checkout.js";
      script.onload=()=>{
        resolve(true);
      };
      script.onerror=()=>{
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };
 
  const placeOrder = async (event)=>{
     event.preventDefault();
     let orderItems=[];
     console.log("cartItem:",cartitem);

     food_list.map((item)=>{
      if(cartitem[item._id]>0){
        let itemInfo=item
        itemInfo["quantity"]=cartitem[item._id]
        orderItems.push(itemInfo);
      }
     })
     const res= await loadRazorpayScript();
     if(!res){
      alert("Razorpay SDK failed to load. ARE YOU ONLINE?");
      return;
     }
     let orderData={
        address:data,
        items:orderItems,
        amount:gettotalcartamount()+2,
     }

     let response = await axios.post(url+"/api/order/place", orderData,{headers:{token}});
     if(response.data.success){
        const options={
          key:"rzp_test_UxpcD5j0qhLo8U",
          amount:response.data.amount,
          currency:response.data.currency,
          name:"Cravify",
          order_id:response.data.orderId,
          handler: function (res){
            alert("Payment Successful!");
            window.location.href = `/verify?success=true&orderId=${response.data.newOrderId}`;
          },
          prefill:{
            name:data.firstName,
            email:data.email,
            contact:data.phone
          },
          theme:{color:"#F37254"},
        };
        const razor = new window.Razorpay(options);
        razor.open();
     }
     else{
      alert("Error Something went wrong");
     }
  }

  return (
    <form onSubmit={placeOrder} className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery information</p>
        <div className="multi-fields">
          <input required name='firstName' onChange={onChangehandler} value={data.firstName} type="text" placeholder='First name' />
          <input required name='lastName' onChange={onChangehandler} value={data.lastName} type="text" placeholder='Last name'/>
        </div>
        <input required name='email' onChange={onChangehandler} value={data.email} type="email" placeholder='email address' />
        <input required name='street' onChange={onChangehandler} value={data.street} type="text" placeholder='street'/>
        <div className="multi-fields">
          <input required  name='country' onChange={onChangehandler} value={data.country} type="text" placeholder='country' />
          <input required name='zipcode' onChange={onChangehandler} value={data.zipcode} type="text" placeholder='zipcode'/>
        </div>
        <div className="multi-fields">
          <input required  name='city' onChange={onChangehandler} value={data.city} type="text" placeholder='city' />
          <input required name='state' onChange={onChangehandler} value={data.state} type="text" placeholder='state'/>
        </div>
        <input required name='phone' onChange={onChangehandler} value={data.phone} type="text" placeholder='phone'/>
      </div>
      <div className="place-order-right">
      <div className="cart-total">
             <h2>Cart Totals</h2>
             <div>
               <div className="cart-total-details">
                  <p>Subtotal</p>
                  <p>{gettotalcartamount()}</p>
               </div>
               <hr />
               <div className="cart-total-details">
                  <p>Delivery fee</p>
                  <p>{gettotalcartamount()===0?0:2}</p>
               </div>
               <hr />
               <div className="cart-total-details">
                  <b>Total</b>
                  <b>{gettotalcartamount()===0?0:gettotalcartamount()+2}</b>
               </div>
             </div>
             <button type='submit'>PROCEED TO PAYMENT</button>

          </div>
      </div>
    </form>
  )
}

export default Placeorder
