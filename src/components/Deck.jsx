import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { Button } from "./ui/button";

const Deck = () => {
  const { id: _id } = useParams();
  const [flight, setFlight] = useState({});
  const [Passengers, setPassengers] = useState([]);
  const [reservedSeats, setReservedSeats] = useState([
    "1A",
    "2A",
    "2B",
    "3B",
    "4A",
    "5C",
    "6A",
    "7B",
    "7C",
    "8B",
    "9B",
    "9C",
  ]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchFlight();
  }, []);

  const fetchFlight = async () => {
    try {
      const response = await axios.get(
        `https://flight-backend-7st2.onrender.com/flights/findFlight/${_id}`
      );
      setFlight(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSeatSelection = (seat) => {
    if (reservedSeats.includes(seat)) {
      alert("Seat is already reserved!");
      return;
    }
    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter((seatItem) => seatItem !== seat));
    } else {
      setSelectedSeats([...selectedSeats, seat]);
      handleAddPassenger(seat);
    }
  };

  const handleAddPassenger = (seat) => {
    const passengerExists = Passengers.find((p) => p.seat === seat);
    if (!passengerExists) {
      setPassengers([...Passengers, { name: "", gender: "", seat }]);
    }
  };

  const handlePassengerDetails = (index, field, value) => {
    const updatedPassengers = [...Passengers];
    updatedPassengers[index][field] = value;
    setPassengers(updatedPassengers);
  };

  const handleSubmitDetails = () => {
    if (
      Passengers.length === 0 ||
      Passengers.some((p) => !p.name || !p.gender)
    ) {
      alert(
        "Please fill out all passenger details (name and gender) for all selected seats."
      );
      return;
    }
    localStorage.setItem("Passengers", JSON.stringify(Passengers));
    localStorage.setItem("reservedSeats", JSON.stringify(selectedSeats));
    alert("Passenger Details Submitted Successfully");
  };

  const handleProceedToPayment = () => {
    if (
      Passengers.length === 0 ||
      Passengers.some((p) => !p.name || !p.gender)
    ) {
      alert("Please complete passenger details before proceeding.");
      return;
    }
    navigate(`/payment/${flight._id}`);
  };

  // Define seat layout
  const seatLayout = [
    { row: 1, seats: ["A", "B", "C"] },
    { row: 2, seats: ["A", "B", "C"] },
    { row: 3, seats: ["A", "B", "C"] },
    { row: 4, seats: ["A", "B", "C"] },
    { row: 5, seats: ["A", "B", "C"] },
    { row: 6, seats: ["A", "B", "C"] },
  ];

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Seat Selection */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-lg font-semibold text-center mb-4">
            Select Your Seats
          </h2>
          <div className="grid grid-cols-1 gap-4 text-center">
            {seatLayout.map((row) => (
              <div key={row.row} className="flex justify-center space-x-4 mb-4">
                {row.seats.map((seat) => {
                  const seatId = `${row.row}${seat}`;
                  const isReserved = reservedSeats.includes(seatId);
                  const isSelected = selectedSeats.includes(seatId);
                  return (
                    <button
                      key={seatId}
                      className={`w-12 h-12 rounded-full text-white ${
                        isReserved
                          ? "bg-gray-400 cursor-not-allowed"
                          : isSelected
                          ? "bg-blue-500"
                          : "bg-green-500"
                      }`}
                      onClick={() => !isReserved && handleSeatSelection(seatId)}
                      disabled={isReserved}
                    >
                      {seatId}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Flight Details */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-lg font-semibold text-center mb-4">
            Airline Details
          </h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Airlines</TableHead>
                <TableHead>From</TableHead>
                <TableHead>To</TableHead>
                <TableHead className="text-right">Price</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">{flight.airlines}</TableCell>
                <TableCell>{flight.from}</TableCell>
                <TableCell>{flight.to}</TableCell>
                <TableCell className="text-right">₹ {flight.price}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        {/* Passenger Details */}
        <div className="bg-white rounded-lg shadow-lg p-6 col-span-2">
          <h2 className="text-lg font-semibold text-center mb-4">
            Add Passengers
          </h2>
          {selectedSeats.map((seat, idx) => (
            <div key={seat} className="mb-6">
              <h3 className="font-medium">Seat: {seat}</h3>
              <input
                type="text"
                placeholder="Enter Name"
                className="w-full p-2 mt-2 mb-2 border rounded-lg"
                value={Passengers[idx]?.name || ""}
                onChange={(e) =>
                  handlePassengerDetails(idx, "name", e.target.value)
                }
              />
              <div className="flex space-x-4">
                <label>
                  <input
                    type="radio"
                    name={`gender-${idx}`}
                    value="Male"
                    checked={Passengers[idx]?.gender === "Male"}
                    onChange={(e) =>
                      handlePassengerDetails(idx, "gender", e.target.value)
                    }
                  />
                  Male
                </label>
                <label>
                  <input
                    type="radio"
                    name={`gender-${idx}`}
                    value="Female"
                    checked={Passengers[idx]?.gender === "Female"}
                    onChange={(e) =>
                      handlePassengerDetails(idx, "gender", e.target.value)
                    }
                  />
                  Female
                </label>
              </div>
            </div>
          ))}

          <div className="flex justify-between">
            <Button
              onClick={handleSubmitDetails}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            >
              Confirm Details
            </Button>
            <Button
              onClick={handleProceedToPayment}
              className="bg-green-500 text-white px-4 py-2 rounded-lg"
            >
              Proceed To Payment
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Deck;
