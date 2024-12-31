import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { AppContext } from "../../Utils/IsAdmin";
import { useNavigate } from "react-router-dom";

const CreditList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [minCredit, setMinCredit] = useState("");
  const [maxCredit, setMaxCredit] = useState("");
  const [credits, setCredits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  axios.defaults.withCredentials = true;
  const navigate = useNavigate();
  const { isAuth, setIsAuth } = useContext(AppContext);

  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  }, [isAuth, navigate]);

  useEffect(() => {
    const fetchCredits = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/credit/get/all`,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setCredits(response.data.data.creditDetails);
        // toast.success(response?.data?.message || "All Credit Fetched");
        setLoading(false);
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to fetch admin profile");
        setError(error.response?.data?.message || "Failed to fetch admin profile");
      } finally {
        setLoading(false);
      }
    };
    if (isAuth) {
      fetchCredits();
    }
  }, [isAuth]);

  const filteredUser = credits.filter((user) => {
    const matchesName =
      user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.address?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesMinCredit = minCredit === "" || user.creditAmount >= parseFloat(minCredit);
    const matchesMaxCredit = maxCredit === "" || user.creditAmount <= parseFloat(maxCredit);
    return matchesName && matchesMinCredit && matchesMaxCredit;
  });
  

  if (loading) {
    return <p className="text-green-500 text-xl">Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500 text-xl">{error}</p>;
  }

  if (!credits) {
    return <p className="text-red-500 text-xl">No admin data available</p>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 font-semibold capitalize">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl text-center text-purple-600 mb-8 font-extrabold">Credit Data</h1>

        {/* Search and Filter Inputs */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4 justify-center">
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Search by Name And Address..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <input
            type="number"
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Show Credit with Greater than this value"
            value={minCredit}
            onChange={(e) => setMinCredit(e.target.value)}
          />
          <input
            type="number"
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Show Credit with less than this value"
            value={maxCredit}
            onChange={(e) => setMaxCredit(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredUser.map((credit) => (
            <div
              key={credit._id}
              className="shadow-lg rounded-lg p-6 hover:shadow-2xl transition-shadow transform hover:scale-105"
            >
              <h2 className="text-lg font-bold text-purple-800 mb-2 capitalize">{credit.name}</h2>
              <h3 className="text-md text-gray-600 mb-1">
                <span className="font-medium">Address:</span> {credit.address || "N/A"}
              </h3>
              <h3 className="text-md text-gray-600 mb-3">
                <span className="font-medium">Phone:</span> {credit.phone || "N/A"}
              </h3>
              <div className="border-t border-gray-300 mt-3 pt-3">
                <p className="text-gray-700 mb-1">
                  <span className="font-medium">Credit Amount:</span> Rs {credit.creditAmount}
                </p>
                <p className="text-gray-700 mb-1">
                  <span className="font-medium">Paid Amount:</span> Rs {credit.paidAmount}
                </p>
                <p className="text-gray-700">
                  <span className="font-medium">Sell Amount:</span> Rs {credit.sellAmount}
                </p>
              </div>
            </div>
          ))}
        </div>


      </div>
      <Toaster />
    </div>

  );
};

export default CreditList;
