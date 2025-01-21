import React, { createContext, useContext, useState } from 'react'

const Authcontext = createContext()
export const Authprovider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [role, setRole] = useState(null)
    const login = (userData, userRole) => {
        if (userData) {
            localStorage.setItem("userData", JSON.stringify(userData));
            localStorage.setItem("userRole", userRole);
            setRole(userRole);
            setUser(userData);
        }
    };
    const logout = () => {
        localStorage.removeItem("userData");
        localStorage.removeItem("userRole"); 
        localStorage.removeItem("token");
        localStorage.removeItem("Passengers");
        localStorage.removeItem("reservedSeats");
        localStorage.removeItem("flightPrice");
        localStorage.removeItem("flightId");
        localStorage.removeItem("flightName");
        localStorage.removeItem("flightDate");
        localStorage.removeItem("to");
        localStorage.removeItem("from");
        localStorage.removeItem("userId");
        setRole(null);
        setUser(null);
    };




    return (
        <Authcontext.Provider value={{ user, login, logout, role }}>
            {children}
        </Authcontext.Provider>
    )
};

export const useAuth = () => useContext(Authcontext)


