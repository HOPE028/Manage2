import React, { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ManagerSignUp from './Components/Manager/SignUp'
import SignIn from './Components/All/SignIn'
import Home from './Components/All/Home'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/Sign_In' element={<SignIn />} />
          <Route path='/home' element={<Home />} />
          <Route path='/*' element={<ManagerSignUp />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
