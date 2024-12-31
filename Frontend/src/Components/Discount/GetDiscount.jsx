import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { AppContext } from "../../Utils/IsAdmin";

const GetDiscount = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [discounts, setDiscounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { isAuth } = useContext(AppContext);

  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  }, [isAuth, navigate]);

  useEffect(() => {
    const fetchDiscounts = async () => {
      try {
        setLoading(true);
        setError(null);

        const { data } = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/discount/get/all`,
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );

        setDiscounts(data.data.allDiscount || []);
        // toast.success(data.message || "Discounts fetched successfully!");
      } catch (err) {
        const errorMsg =
          err.response?.data?.message || "Failed to fetch discounts.";
        setError(errorMsg);
        toast.error(errorMsg);
      } finally {
        setLoading(false);
      }
    };

    if (isAuth) fetchDiscounts();
  }, [isAuth]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this Discount?')) {
      try {
        const response = await axios.delete(
          `${import.meta.env.VITE_BASE_URL}/discount/delete/${id}`,
          {
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json',
            },
          });
        toast.success('Discount deleted successfully');
        setDiscounts(discounts.filter(discount => discount._id !== id));
      } catch (error) {
        console.error(error);
        toast.error(error.response?.data?.message || 'Try Again, something went wrong');
        setError(error.response?.data?.message || 'Try Again, something went wrong');
      }
    }
  };

  const filteredDiscount = discounts.filter((discount) => {
    return (
      discount.discountName?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  if (loading) {
    return <p className="text-green-500 text-xl text-center">Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500 text-xl text-center">{error}</p>;
  }

  if (!discounts.length) {
    return (
      <p className="text-gray-600 text-center text-xl">No discounts available.</p>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 capitalize">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-purple-600 mb-8">
          Discount List
        </h1>
        {/* Search Bar */}
        <div className="mb-6 flex justify-center">
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Search by Categories Name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredDiscount.map((discount) => (
            <div
              key={discount._id}
              className="bg-white shadow-md rounded-lg p-4 transition-transform transform hover:scale-105"
            >
              <h2 className="text-xl font-bold text-gray-800 capitalize">
                {discount.discountName}
              </h2>
              <p className="text-gray-600 mt-2">
                {discount.description || "No description available"}
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Created: {new Date(discount.createdAt).toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-500">
                Updated: {new Date(discount.updatedAt).toLocaleDateString()}
              </p>

              {/* Action Button */}
              <div className="flex space-x-4 mt-4">
                <Link
                  to={`/discount/update/${discount._id}`}
                  className="flex items-center justify-center w-full px-4 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600 transition duration-300"
                >
                  <FaEdit className="mr-2" /> Edit
                </Link>
                <button
                  onClick={() => handleDelete(discount._id)}
                  className="flex items-center justify-center w-full px-4 py-2 bg-red-500 text-white rounded-md shadow hover:bg-red-600 transition duration-300"
                >
                  <FaTrash className="mr-2" /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
        <Toaster />
      </div>
    </div>
  );
};

export default GetDiscount;
