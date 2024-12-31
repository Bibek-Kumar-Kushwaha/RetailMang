import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import toast, { Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { AppContext } from '../../Utils/IsAdmin';
import { useNavigate } from 'react-router-dom';


const AdminProfile = () => {

  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  axios.defaults.withCredentials = true;
  const navigate = useNavigate();
  const { isAuth, setIsAuth } = useContext(AppContext);

  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  }, [isAuth, navigate]);

  useEffect(() => {
    const fetchAdmin = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/admin/profile`,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setAdmin(response.data.data);
        // toast.success(response?.data?.message || 'Admin Profile Fetched');
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to fetch admin profile");
        setError(error.response?.data?.message || "Failed to fetch admin profile");
      } finally {
        setLoading(false);
      }
    };
    if (isAuth) {
      fetchAdmin();
    }
  }, [isAuth]);

  if (loading) {
    return <p className="text-green-500 text-xl">Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500 text-xl">{error}</p>;
  }

  if (!admin) {
    return <p className="text-red-500 text-xl">No admin data available</p>;
  }
  return (
    <div className="min-h-screen bg-gray-100 p-4 font-semibold capitalize">
      <h2 className="text-3xl font-extrabold text-purple-600 mb-6 text-center">Own Profile</h2>
      <div className="bg-white shadow-lg rounded-lg p-4 max-w-md mx-auto">
        <div className="flex items-center mb-4">
          <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center text-gray-500">
            {admin.avatar?.secure_url ? (
              <img
                src={admin.avatar.secure_url}
                alt={admin.name}
                className="w-full h-full rounded-full"
              />
            ) : (
              <span className="text-lg font-bold capitalize text-purple-600">{admin.name[0]}</span>
            )}
          </div>
          <div className="ml-4">
            <h2 className="text-lg font-semibold capitalize text-purple-600">{admin.name}</h2>
            <p className="text-sm text-gray-600 lowercase">{admin.email}</p>
          </div>
        </div>
        <div className="text-sm space-y-2">
          <p>
            <span className="font-bold">Phone:</span> {admin.phone || 'N/A'}
          </p>
          <p>
            <span className="font-bold">Address:</span> {admin.address || 'N/A'}
          </p>
          <p>
            <span className="font-bold">Role:</span> {admin.role}
          </p>
          <p>
            <span className="font-bold">Created At:</span>{' '}
            {new Date(admin.createdAt).toLocaleDateString()}
          </p>
          <p>
            <span className="font-bold">Updated At:</span>{' '}
            {new Date(admin.updatedAt).toLocaleDateString()}
          </p>
        </div>


        {/* Action Buttons */}
        <div className="flex justify-between items-center mt-4">
          {/* <Link
            to={`/admin/view/${admin.id}`}
            className="flex items-center px-4 py-2 text-green-500 border border-green-500 rounded-md hover:bg-green-500 hover:text-white transition"
          >
            <FaEye className="mr-2" />
            View
          </Link> */}
          <div className="flex space-x-2">
            <Link
              to={`/admin/update/${admin.id}`}
              className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600 transition"
            >
              <FaEdit className="mr-2" />
              Edit
            </Link>
          </div>
        </div>
        <Toaster />
      </div>
      </div>
      );
};

      export default AdminProfile;
