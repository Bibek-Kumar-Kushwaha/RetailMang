import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { AppContext } from '../../Utils/IsAdmin';
import { useNavigate } from 'react-router-dom';


const GetAdmin = () => {
  const [admins, setAdmins] = useState([]);
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
    const fetchAdmins = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/admin/get/all`,
          {
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        setAdmins(response.data.data.allAdmin);
        // toast.success(response?.data?.message || 'All Admin Profile Fetched');
      } catch (err) {
        toast.error(err.response?.data?.message || 'Failed to fetch Admin');
        setError(err.response?.data?.message || 'Failed to fetch Admin');
      } finally {
        setLoading(false);
      }
    };
    if (isAuth) {
      fetchAdmins();
    }
  }, [isAuth]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this admin?')) {
      try {
        const response = await axios.delete(`${import.meta.env.VITE_BASE_URL}/admin/delete/${id}`, {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        });
        toast.success('Admin deleted successfully');
        setAdmins(admins.filter(admin => admin._id !== id));
      } catch (error) {
        console.error(error);
        toast.error(error.response?.data?.message || 'Try Again, something went wrong');
        setError(error.response?.data?.message || 'Try Again, something went wrong');
      }
    }
  };

  if (loading) {
    return <p className="text-green-500 text-xl">Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500 text-xl">{error}</p>;
  }

  if (!admins.length) {
    return <p className="text-red-500 text-xl">No Admin data available</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 font-semibold capitalize">
      <h1 className="text-3xl font-bold text-center mb-6 text-purple-600">Admin List</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {admins.map((admin) => (
          <div key={admin._id} className="bg-white shadow-lg rounded-lg p-4">

            {/* Header Section */}
            <div className="flex items-center mb-4 border-b pb-4">
              <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center text-gray-500">
                {admin.avatar?.secure_url ? (
                  <img
                    src={admin.avatar.secure_url}
                    alt={admin.name}
                    className="w-full h-full rounded-full"
                  />
                ) : (
                  <span className="text-lg font-bold text-purple-800 capitalize">{admin.name[0]}</span>
                )}
              </div>
              <div className="ml-4">
                <h2 className="text-lg font-semibold capitalize text-purple-800">{admin.name}</h2>
                <p className="text-sm text-gray-600 lowercase">{admin.email || 'No Email'}</p>
              </div>
            </div>


            {/* Details Section */}
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
                to={`/admin/view/${admin._id}`}
                className="flex items-center px-4 py-2 text-green-500 border border-green-500 rounded-md hover:bg-green-500 hover:text-white transition"
              >
                <FaEye className="mr-2" />
                View
              </Link> */}
              <div className="flex space-x-2">
                <Link
                  to={`/admin/update/${admin._id}`}
                  className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600 transition"
                >
                  <FaEdit className="mr-2" />
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(admin._id)}
                  className="flex items-center px-4 py-2 bg-red-500 text-white rounded-md shadow hover:bg-red-600 transition"
                >
                  <FaTrash className="mr-2" />
                  Delete
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>
      <Toaster />
    </div>
  );
};

export default GetAdmin;
