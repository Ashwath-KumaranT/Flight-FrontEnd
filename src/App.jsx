import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Login from './components/Login'
import Flights from './components/Flights'
import Forgetpassword from './pages/Forgetpassword'
import Signup from './pages/Signup'
import Deck from './components/Deck'
import Payments from './components/Payment'
import TicketPage from './components/Ticket/TicketPage'
import AdminLogin from './components/Admin/AdminLogin'
import Fights from './components/Admin/Fights'
import MainPage from './components/MainPage';
import Admin from './components/Admin/Admin';
import MyBookings from './components/MyBookings'
import ProtectedRoutes from './context/ProtectedRoutes'
import { useAuth } from '../src/context/Authcontext'
import { Navigate } from 'react-router-dom'
import './App.css'

export default function Home() {
  const { role } = useAuth();
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
        <Route path='/' element={<MainPage />} />
          <Route path="/home" element={<Hero />} />
          <Route path="/login" element={<Login />} />
          <Route path="/flights" element={<Flights />} />
          <Route path='/forgetpassword' element={<Forgetpassword />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/flights/:id' element={<Deck />} />
          <Route path='/payment/:id' element={<Payments />} />
          <Route path='/payment/getTicket/:flightId' element={<TicketPage />} />
          <Route path='/admin/login' element={<AdminLogin />} />
          <Route path='/MyBookings/:userId' element={<MyBookings />} />

          <Route element={<ProtectedRoutes />}>
            {role === 'admin' ? (
              <>
                <Route path='/admin/dashboard' element={<Admin />} />
                <Route path='/admin/flights' element={<Fights />} />
              </>
             ): <Route path='*' element={<Navigate to='/' />} />}
          </Route>

        </Routes>
      </Router>
    </div>




  )
}
