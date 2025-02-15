import React, { useContext } from 'react'
import './Placeorder.css'
import { StoreContext } from '../../Contextt/StoreContext'

const Placeorder = () => {

  const {gettotalcartamount} = useContext(StoreContext)

  return (
    <form  className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery information</p>
        <div className="multi-fields">
          <input type="text" placeholder='First name' />
          <input type="text" placeholder='Last name'/>
        </div>
        <input type="email" placeholder='email address' />
        <input type="text" placeholder='street'/>
        <div className="multi-fields">
          <input type="text" placeholder='country' />
          <input type="text" placeholder='zipcode'/>
        </div>
        <div className="multi-fields">
          <input type="text" placeholder='city' />
          <input type="text" placeholder='state'/>
        </div>
        <input type="text" placeholder='phone'/>
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
             <button >PROCEED TO PAYMENT</button>

          </div>
      </div>
    </form>
  )
}

export default Placeorder
