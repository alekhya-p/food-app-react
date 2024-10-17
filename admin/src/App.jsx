import React from 'react'
import {Route, Routes} from 'react-router-dom';
import NavBar from './components/NavBar/NavBar'
import SideBar from './components/SideBar/SideBar'
import Add from './pages/Add/Add';
import List from './pages/List/List';
import Orders from './pages/Orders/Orders';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {

  const url = 'http://localhost:4000';

  return (
    <div>
      <ToastContainer/>
      <NavBar />
      <hr></hr>
      <div className="app-content">
        <SideBar />
        <Routes>
          <Route path='/add' element={<Add url={url}/>}></Route>
          <Route path='/list' element={<List url={url}/>}></Route>
          <Route path='/orders' element={<Orders url={url}/>}></Route>
        </Routes>
      </div>
    </div>
  )
}

export default App
