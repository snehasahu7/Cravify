import React, { useContext, useState } from 'react'
import "./FoodItem.css"
import { assets } from '../../assets/assets'
import { StoreContext } from '../../Contextt/StoreContext';

const FoodItem = ({id,name,price,description,image}) => {
   
   const {cartitem, addtocart, removefromcart} =useContext(StoreContext);
   

  return (
    <div className='food-item'>
        <div className='food-item-img-container'>
            <img className="food-item-img" src={image} alt=""/>
            {!cartitem[id]?
               <div>
                <img className="add" onClick={()=>addtocart(id)} src={assets.add_icon_white}/>
               </div>:
               <div className='food-item-counter'>
                 <img onClick={()=>addtocart(id)} src={assets.add_icon_green}/>
                 <p>{cartitem[id]}</p>
                 <img onClick={()=>removefromcart(id)} src={assets.remove_icon_red}/>
               </div>

            }
        </div>
        <div className='food-item-info'>
            <div className='food-item-name-rating'>
                 <p>
                    {name}
                 </p>
                 <img src={assets.rating_starts}/>
            </div>
            <p className='food-item-desc'>{description}</p>
            <p className='food-item-price'>Rs.{price}</p>
        </div>

      
    </div>
  )
}

export default FoodItem
