import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PaymentTab.css";

const Payment = () => {
  const [flight, setFlight] = useState([]);
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    expiryDate: "",
    cvc: "",
  });

  const [passengers, setPassengers] = useState([]);
  const [seatNumbers, setSeatNumbers] = useState([]);
  const [total, setTotal] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const storedPassengers = localStorage.getItem("Passengers");
    const storedSeats = localStorage.getItem("reservedSeats");
    setTotal(
      +localStorage.getItem("flightPrice") +
        +localStorage.getItem("flightPrice") * 0.1
    );

    if (storedPassengers) {
      setPassengers(JSON.parse(storedPassengers));
    }

    if (storedSeats) {
      setSeatNumbers(JSON.parse(storedSeats));
    }
  }, []);

  const userId = useMemo(() => localStorage.getItem("userId"));
  const flightId = useMemo(() => localStorage.getItem("flightId"));

  const handleBooking = async () => {
    if (
      !cardDetails.cardNumber ||
      !cardDetails.expiryDate ||
      !cardDetails.cvc
    ) {
      alert("Please fill all the payment details");
      return;
    }

    try {
      await axios
        .post("https://flight-backend-7st2.onrender.com/bookings/addBooking", {
          userId,
          flightId,
          total,
        })
        .then((response) => {
          if (response.status === 201) {
            alert("Booking confirmed!!");
            navigate(`/payment/getTicket/${flightId}`);
            return;
          } else {
            alert("Booking failed!");
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="paym bg-gray-100 p-10">
      <div className="flex items-center">
        <div key="Payment">
          <div className="App-payment cl-1">
            <p className="pPayment">Enter Credit card details</p> <br />
            <form className="credit-form">
              <div className="mb-4">
                <label
                  htmlFor="cardNumber"
                  className="block text-sm font-medium"
                >
                  Card Number
                </label>
                <input
                  type="text"
                  id="cardNumber"
                  className="block w-full rounded-lg border-gray-300 p-2.5 text-sm"
                  placeholder="xxxx - xxxx - xxxx"
                  value={cardDetails.cardNumber}
                  onChange={(e) => {
                    let input = e.target.value;
                    input = input.replace(/[^0-9]/g, "");
                    input = input.substring(0, 12);
                    input = input.replace(
                      /(\d{4})(\d{0,4})(\d{0,4})/,
                      (match, p1, p2, p3) =>
                        [p1, p2, p3].filter(Boolean).join(" - ")
                    );

                    setCardDetails({
                      ...cardDetails,
                      cardNumber: input,
                    });
                  }}
                  maxLength={19}
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="expiryDate"
                  className="block text-sm font-medium"
                >
                  Expiry Date (MM/YY)
                </label>
                <input
                  type="text"
                  id="expiryDate"
                  className="block w-full rounded-lg border-gray-300 p-2.5 text-sm"
                  placeholder="MM/YY"
                  value={cardDetails.expiryDate}
                  onChange={(e) => {
                    let input = e.target.value;

                    input = input.replace(/[^0-9]/g, "");

                    if (input.length > 2) {
                      input = input.substring(0, 2) + "/" + input.substring(2);
                    }

                    input = input.substring(0, 5);

                    setCardDetails({ ...cardDetails, expiryDate: input });
                  }}
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="cvc" className="block text-sm font-medium">
                  CVC
                </label>
                <input
                  type="text"
                  id="cvc"
                  className="block w-full rounded-lg border-gray-300 p-2.5 text-sm"
                  placeholder="CVC"
                  value={cardDetails.cvc}
                  onChange={(e) => {
                    let input = e.target.value;
                    input = input.replace(/[^0-9]/g, "");
                    input = input.substring(0, 4);
                    setCardDetails({ ...cardDetails, cvc: input });
                  }}
                  maxLength={4}
                  required
                />
              </div>

              <button
                type="button"
                onClick={handleBooking}
                className="w-full mt-4 bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-300"
              >
                PAY
              </button>
            </form>
          </div>
        </div>

        <div className="p-8 bg-white shadow-lg rounded-lg w-[600px] mx-auto">
          <h3 className="text-center text-3xl font-bold text-blue-600 mb-6">
            KABOOM Airlines
          </h3>
          <div>
            <p className="text-center text-xl font-semibold text-gray-700 mb-8">
              BOOKING DETAILS
            </p>
            <div className="flex justify-center items-center">
              <div className="space-y-4 flex flex-col items-start">
                {/* Each row for details */}
                <div className="flex">
                  <p className="w-40 font-medium text-gray-900">Flight Name:</p>
                  <p className="text-gray-700">
                    {localStorage.getItem("flightName")}
                  </p>
                </div>
                <div className="flex">
                  <p className="w-40 font-medium text-gray-900">Date:</p>
                  <p className="text-gray-700">
                    {new Date(
                      localStorage.getItem("flightDate")
                    ).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex">
                  <p className="w-40 font-medium text-gray-900">From:</p>
                  <p className="text-gray-700">
                    {localStorage.getItem("from")}
                  </p>
                </div>
                <div className="flex">
                  <p className="w-40 font-medium text-gray-900">To:</p>
                  <p className="text-gray-700">{localStorage.getItem("to")}</p>
                </div>
                <div className="flex">
                  <p className="w-40 font-medium text-gray-900">Passengers:</p>
                  <div className="text-gray-700">
                    {passengers.map((passenger, idx) => (
                      <p key={idx}>{passenger.name}</p>
                    ))}
                  </div>
                </div>
                <div className="flex">
                  <p className="w-40 font-medium text-gray-900">Seat No:</p>
                  <div className="text-gray-700">
                    {seatNumbers.map((seat, idx) => (
                      <p key={idx}>{seat}</p>
                    ))}
                  </div>
                </div>
                <div className="flex">
                  <p className="w-40 font-medium text-gray-900">
                    Ticket Price:
                  </p>
                  <p className="text-gray-700">
                    ₹{localStorage.getItem("flightPrice")}
                  </p>
                </div>
                <div className="flex">
                  <p className="w-40 font-medium text-gray-900">Tax:</p>
                  <p className="text-gray-700">
                    ₹{(localStorage.getItem("flightPrice") * 0.1).toFixed(2)}
                  </p>
                </div>
                <div className="flex">
                  <p className="w-40 font-bold text-blue-600">Total Sum:</p>
                  <p className="font-bold text-blue-600">₹{total}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
