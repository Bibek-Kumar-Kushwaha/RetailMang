import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';
import { useParams } from 'react-router-dom';

const CustomerDetails = () => {
  const {id} = useParams();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserDetails = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/user/view/${id}`,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setUserData(response.data.data);
        // toast.success(response?.data?.message || "User details fetched successfully!");
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch user details");
        toast.error(err.response?.data?.message || "Failed to fetch user details");
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, []);

  if (loading) {
    return <p className="text-green-500 text-xl text-center mt-10">Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500 text-xl text-center mt-10">{error}</p>;
  }

  const { user, credit } = userData;

  return (
    <div className="min-h-screen bg-gray-100 p-4 capitalize">
      <h1 className="text-3xl font-bold text-center mb-6 text-purple-600">Customer Details</h1>
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6 space-y-6">
        {/* User Details Section */}
        <div className="flex items-center space-x-6">
          <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center">
            {user.avatar?.secure_url ? (
              <img
                src={user.avatar.secure_url}
                alt={user.name}
                className="w-full h-full rounded-full"
              />
            ) : (
              <span className="text-xl font-bold text-purple-800 capitalize">
                {user.name[0]}
              </span>
            )}
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-700">{user.name}</h2>
            <p className="text-gray-600 lowercase">{user.email || "No Email Provided"}</p>
            <p className="text-gray-600">{user.phone}</p>
          </div>
        </div>

        {/* User Additional Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p>
              <span className="font-bold">Address:</span> {user.address || "N/A"}
            </p>
            <p>
              <span className="font-bold">Role:</span> {user.role}
            </p>
          </div>
          <div>
            <p>
              <span className="font-bold">Created At:</span>{" "}
              {new Date(user.createdAt).toLocaleDateString()}
            </p>
            <p>
              <span className="font-bold">Updated At:</span>{" "}
              {new Date(user.updatedAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Credit Details Section */}
        <div className="bg-gray-50 p-4 rounded-md shadow-md">
          <h3 className="text-lg font-semibold text-purple-700 mb-3">Credit Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <p>
              <span className="font-bold">Credit Amount:</span> रु {credit.creditAmount || 'N/A'}
            </p>
            <p>
              <span className="font-bold">Paid Amount:</span> रु {credit.paidAmount || 'N/A'}
            </p>
            <p>
              <span className="font-bold">Sell Amount:</span> रु {credit.sellAmount || 'N/A'}
            </p>
            <p>
              <span className="font-bold">Phone Number:</span> {credit.phone || 'N/A'}
            </p>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default CustomerDetails;
