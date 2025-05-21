import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Signup from './pages/auth/Signup'
import Signin from './pages/auth/Signin'
import PaymentUse from './pages/payment/PaymentUse'

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/signin' element={<Signin />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/payment' element={<PaymentUse />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
