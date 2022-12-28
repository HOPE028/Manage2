import React, { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ManagerSignUp from './Components/Manager/SignUp'

import axios from 'axios'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/*' element={<ManagerSignUp />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
