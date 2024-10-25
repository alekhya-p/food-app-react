import React, { useState } from 'react'
import NavBar from './components/NavBar/NavBar'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Footer from './components/Footer/Footer'
import LoginPopup from './components/LoginPopup/LoginPopup'
import OrderSuccess from './pages/OrderSuccess/OrderSuccess'

const App = () => {
  const [showLogin, setShowLogin] = useState(false)
  return (
    <>
    {showLogin?<LoginPopup setShowLogin={setShowLogin}/>:<></>}
    <div className='app'>
      <NavBar setShowLogin={setShowLogin}/>
      <Routes>
        < Route path='/' element={<Home/>} />
        < Route path='/cart' element={<Cart/>} />
        < Route path='/order' element={<PlaceOrder/>} />
        <Route path='/orderSucces' element={<OrderSuccess/>}/>
      </Routes>
    </div>
    <Footer/>
    </>
  )
}

export default App
