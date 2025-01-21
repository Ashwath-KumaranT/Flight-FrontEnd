import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "../ui/button";

const Events = () => {
  const { id: _id } = useParams();
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://flight-backend-7st2.onrender.com/flights`
      );
      setData(response.data);
    } catch (error) {
    //   console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`https://flight-backend-7st2.onrender.com/flights/delete/${id}`)
      .then((res) => {
        // console.log(res);
        window.location.reload();
      })
      .catch((err) => {
        // console.log(err);
      });
  };

  useEffect(() => {
    handleDelete();
  }, []);

  const handleEdit = (id) => {
    axios
      .put(`https://flight-backend-7st2.onrender.com/flights/patch/${id}`)
      .then((req) => {
        // console.log(req);
        window.location.reload();
      })
      .catch((err) => {
        // console.log(err);
      });
  };

  useEffect(() => {
    handleEdit();
  }, []);

  return (
    <div className="bg-gray-100">
      <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase  dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="px-6 py-3">
              Airlines
            </th>
            <th scope="col" class="px-6 py-3">
              Model
            </th>
            <th scope="col" class="px-6 py-3">
              date
            </th>
            <th scope="col" class="px-6 py-3">
              from
            </th>
            <th scope="col" class="px-6 py-3">
              to
            </th>
            <th scope="col" class="px-6 py-3">
              Price
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((flight) => (
            <tr key={flight._id}>
              <th
                scope="row"
                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
              >
                {flight.airlines}
              </th>
              <td class="px-6 py-4">{flight.name}</td>
              <td class="px-6 py-4">{flight.date}</td>
              <td class="px-6 py-4">{flight.from}</td>
              <td class="px-6 py-4">{flight.to}</td>
              <td class="px-6 py-4">{flight.price}</td>
              <td class="px-6 py-4 space-x-1">
                <Button onClick={() => handleDelete(flight._id)}>Delete</Button>
                <Button onClick={() => handleEdit(flight._id)}>edit</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default Events;
