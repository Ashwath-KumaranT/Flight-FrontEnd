import React, { useMemo, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../components/ui/sheet";
import { useAuth } from "../context/Authcontext";
import { Button } from "./ui/button";

const Navbar = ({userId, setUserId}) => {
  const navigate = useNavigate();
  

  const { logout, user } = useAuth();

  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center">
      {/* Logo */}
      <div className="flex items-center">
        <Link to="/">
          <img src="/assets/images/icon.png" alt="Logo" className="w-32" />
        </Link>
      </div>

      {/* Navigation Links for Desktop */}
      <div className="hidden md:flex items-center space-x-8 font-medium">
        <Link
          to="/home"
          className="text-gray-800 hover:text-blue-500 transition duration-200"
        >
          Home
        </Link>
        <Link
          to={`/MyBookings/${userId}`}
          className="text-gray-800 hover:text-blue-500 transition duration-200"
        >
          My Bookings
        </Link>
        <Link
          to="/flights"
          className="text-gray-800 hover:text-blue-500 transition duration-200"
        >
          Book a Flight
        </Link>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center space-x-6">
        {user ? (
          <Button
            className="px-4 py-2 text-white bg-red-500 hover:bg-red-600 rounded-lg"
            onClick={() => {
              logout();
              navigate("/");
              setUserId(null);
            }}
          >
            Logout
          </Button>
        ) : (
          <Button className="px-4 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-lg">
            <Link to="/login">Login</Link>
          </Button>
        )}
        <Link
          to="/admin/login"
          className="text-gray-800 hover:text-blue-500 transition duration-200"
        >
          Admin
        </Link>

        {/* Mobile Menu */}
        <nav className="md:hidden">
          <Sheet>
            <SheetTrigger>
              <img
                src="/assets/icons/menu.svg"
                alt="Menu"
                className="w-8 h-8 cursor-pointer"
              />
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>
                  <div className="flex justify-center mb-4">
                    <Link to="/">
                      <img
                        src="/assets/images/icon.png"
                        alt="Logo"
                        className="w-28"
                      />
                    </Link>
                  </div>
                </SheetTitle>
                <SheetDescription>
                  <div className="flex flex-col space-y-4 text-gray-800 font-semibold">
                    <Link
                      to="/"
                      className="hover:text-blue-500 transition duration-200"
                    >
                      Home
                    </Link>
                    <Link
                      to={`/MyBookings/${userId}`}
                      className="hover:text-blue-500 transition duration-200"
                    >
                      My Bookings
                    </Link>
                    <Link
                      to="/flights"
                      className="hover:text-blue-500 transition duration-200"
                    >
                      Book a Flight
                    </Link>
                  </div>
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </nav>
      </div>
    </nav>
  );
};

export default Navbar;
