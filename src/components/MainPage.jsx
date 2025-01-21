
import React from 'react'
import { Link } from 'react-router-dom'

const MainPage = () => {
       
    return (

        <div className="bg-gradient-to-b from-blue-500 via-blue-300 to-blue-100 flex items-center justify-center h-screen">
        <div className="text-center space-y-8">
          <h1 className="text-4xl font-bold text-white mb-6">Welcome to SkyVista Airways</h1>
          <p className="text-lg text-blue-900 font-medium">
            Select your role to proceed
          </p>
          <div className="space-y-12 ">
            <Link to="/login">
              <button className="w-48 px-6 py-3 text-lg font-semibold bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition duration-300">
                User Login
              </button>
            </Link>
            <Link to="/admin/login">
              <button className="w-48 px-6 py-3 text-lg font-semibold bg-green-600 text-white rounded-lg shadow-lg hover:bg-green-700 transition duration-300">
                Admin Login
              </button>
            </Link>
          </div>
          <p className="text-sm text-gray-700 mt-6">
            Need help? <span className="text-blue-600 cursor-pointer hover:underline">Contact Support</span>
          </p>
        </div>
      </div>

    )
}

export default MainPage