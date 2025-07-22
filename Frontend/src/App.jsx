import React, { useState } from 'react'
import Navbar from './Components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home/Home'
import Placeorder from './Pages/PlaceOrder/Placeorder'
import Cart from './Pages/Cart/Cart'
import Footer from './Components/Footer/Footer'
import LoginPopup from './Components/LoginPopup/LoginPopup'
import Verify from './Pages/Verify/Verify'
import MyOrders from './Pages/MyOrders/MyOrders'


const App = () => {
  const[showlogin, setshowlogin] = useState(false)

  return (
    <>
     {showlogin?<LoginPopup setshowlogin={setshowlogin}/>:<> </>}
     <div className='app'>
      <Navbar setshowlogin={setshowlogin} />
      <Routes>
         < Route path='/' element={<Home/>}/>
         < Route path='/cart' element={<Cart/>}/>
         < Route path='/order' element={<Placeorder/>}/>
         <Route path='/verify' element={<Verify/>}/>
         <Route path='/myorders' element={<MyOrders/>}/>
      </Routes>
     
    </div>
     <Footer/>
    
    </>
   
  )
}

export default App
