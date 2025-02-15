import React from 'react'
import "./ExploreMenu.css"
import { menu_list } from '../../assets/assets'

const ExploreMenu = ({category, setcategory}) => {
  return (
    <div className='explore-menu' id='explore-menu'>
        <h1>Explore our menu</h1>
        <p className='explore-menu-text'>Dive into our menu and find your next favorite meal! From comforting classics to bold flavors and sweet treats, we have something to satisfy every craving. Browse now and enjoy your perfect bite!</p>
        <div className='explore-menu-list'>
            {menu_list.map((item,index)=>{
                return(
                    <div onClick={()=>setcategory(prev=>prev===item.menu_name?"All":item.menu_name)} key={index} className='explore-menu-list-item'>
                         <img className={category===item.menu_name?"active":""} src={item.menu_image} alt=''/>
                         <p>{item.menu_name}</p>
                    </div>
                )
            })}

        </div>
        <hr/>
    </div>
  )
}

export default ExploreMenu
