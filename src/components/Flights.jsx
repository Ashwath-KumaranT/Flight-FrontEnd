import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/Authcontext";

const Flights = () => {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useState({
    from: "",
    to: "",
    date: "",
  });

  const { user } = useAuth();
  const navigate = useNavigate();
  const flightDetails = (flight) => {
    if (!user) {
      alert("Please login to book the flight");
      return;
    }
    localStorage.setItem("flightName", flight.name);
    localStorage.setItem("flightDate", flight.date);
    localStorage.setItem("from", flight.from);
    localStorage.setItem("to", flight.to);
    localStorage.setItem("flightPrice", flight.price);
    localStorage.setItem("flightId", flight._id);
    navigate(`/flights/${flight._id}`);
  };

  const fetchFlights = async () => {
    try {
      const response = await axios.get(
        `https://flight-backend-7st2.onrender.com/flights`
      );
      setFlights(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching flights:", error);
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setSearchParams({ ...searchParams, [e.target.name]: e.target.value });
  };

  const filteredFlights = flights.filter((flight) => {
    const matchesFrom = flight.from
      .toLowerCase()
      .includes(searchParams.from.toLowerCase());
    const matchesTo = flight.to
      .toLowerCase()
      .includes(searchParams.to.toLowerCase());
    const matchesDate = searchParams.date
      ? flight.date.startsWith(searchParams.date)
      : true;
    return matchesFrom && matchesTo && matchesDate;
  });

  useEffect(() => {
    fetchFlights();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-4 border-b text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">
            Search Flights
          </h1>
          <div className="flex flex-wrap gap-4 mt-4 justify-center mb-2">
            <span className="flex items-center text-l font-semibold">From</span>
            <input
              type="text"
              name="from"
              placeholder="Country"
              value={searchParams.from}
              onChange={handleInputChange}
              className="px-4 py-2 border rounded-lg w-full sm:w-auto"
            />{" "}
            <span className="flex items-center text-l font-semibold">To</span>
            <input
              type="text"
              name="to"
              placeholder="Country"
              value={searchParams.to}
              onChange={handleInputChange}
              className="px-4 py-2 border rounded-lg w-full sm:w-auto"
            />{" "}
            <span className="flex items-center text-l font-semibold">Date</span>
            <input
              type="date"
              name="date"
              value={searchParams.date}
              onChange={handleInputChange}
              className="px-4 py-2 border rounded-lg w-full sm:w-auto"
            />
          </div>
        </div>
        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "50vh",
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-600">
              <thead className="bg-gray-200 text-gray-800 uppercase">
                <tr>
                  <th className="px-6 py-3">Airlines</th>
                  <th className="px-6 py-3">Model</th>
                  <th className="px-6 py-3">Date</th>
                  <th className="px-6 py-3">From</th>
                  <th className="px-6 py-3">To</th>
                  <th className="px-6 py-3">Price</th>
                  <th className="px-6 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredFlights.map((flight) => (
                  <tr key={flight._id} className="border-b hover:bg-gray-100">
                    <td className="px-6 py-4 font-medium">{flight.airlines}</td>
                    <td className="px-6 py-4">{flight.name}</td>
                    <td className="px-6 py-4">
                      {new Date(flight.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">{flight.from}</td>
                    <td className="px-6 py-4">{flight.to}</td>
                    <td className="px-6 py-4">₹{flight.price}</td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => flightDetails(flight)}
                        className="inline-block px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                      >
                        Book Now
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Flights;
