import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "./ui/button";

const MyBookings = () => {
  const { userId } = useParams();
  const _id = userId;
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true); 

  const fetchFlight = async () => {
    try {
      const response = await axios.get(
        `https://flight-backend-7st2.onrender.com/flights/${_id}`
      );
      setFlights(response.data);
      setLoading(false); 
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFlight();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 border-solid border-gray-200 border-t-primary-600 rounded-full"></div>
        <span className="ml-2 text-lg">Loading...</span>
      </div>
    );
  }

  return (
    <div className="bg-gray-100">
      <section className="py-8 antialiased md:py-16">
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <div className="mx-auto max-w-5xl">
            <div className="gap-4 sm:flex sm:items-center sm:justify-between">
              <h2 className="text-xl font-semibold text-gray-900 sm:text-2xl">
                My Bookings
              </h2>
              <div className="mt-6 gap-4 space-y-4 sm:mt-0 sm:flex sm:items-center sm:justify-end sm:space-y-0">
                <div></div>
                <div></div>
              </div>
            </div>

            {flights.length > 0 ? (
              flights.map((flight, index) => (
                <div key={index} className="mt-6 flow-root sm:mt-8">
                  <div className="divide-y bg-gray-100">
                    <div className="flex flex-wrap items-center gap-y-4 py-6">
                      <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                        <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
                          Airline:
                        </dt>
                        <dd className="mt-1.5 text-base font-semibold text-gray-900">
                          {flight.airlines}
                        </dd>
                      </dl>

                      <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                        <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
                          Date:
                        </dt>
                        <dd className="mt-1.5 text-base font-semibold text-gray-900">
                          {new Date(flight.date).toLocaleDateString()}
                        </dd>
                      </dl>

                      <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                        <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
                          Price:
                        </dt>
                        <dd className="mt-1.5 text-base font-semibold text-gray-900 ">
                          ₹{flight.price}
                        </dd>
                      </dl>

                      <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                        <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
                          Status:
                        </dt>
                        <dd className="me-2 mt-1.5 inline-flex items-center rounded bg-primary-100 px-2.5 py-0.5 text-xs font-medium text-primary-800 dark:bg-primary-900 dark:text-primary-300">
                          <svg
                            className="me-1 h-3 w-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M18.5 4h-13m13 16h-13M8 20v-3.333a2 2 0 0 1 .4-1.2L10 12.6a1 1 0 0 0 0-1.2L8.4 8.533a2 2 0 0 1-.4-1.2V4h8v3.333a2 2 0 0 1-.4 1.2L13.957 11.4a1 1 0 0 0 0 1.2l1.643 2.867a2 2 0 0 1 .4 1.2V20H8Z"
                            />
                          </svg>
                          On Route
                        </dd>
                      </dl>
                      <Button>
                        <a href={`/payment/getTicket/${flight._id}`}>
                          View Ticket
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No bookings available.</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default MyBookings;
