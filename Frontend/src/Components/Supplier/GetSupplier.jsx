import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { AppContext } from '../../Utils/IsAdmin';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';

const GetSupplier = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { isAuth } = useContext(AppContext);
  axios.defaults.withCredentials = true;

  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  }, [isAuth, navigate]);

  useEffect(() => {
    const fetchSuppliers = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/supplier/get/all`,
          {
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        setSuppliers(response.data.data.supplierDetails);
        // toast.success(response?.data?.message || 'All Suppliers Fetched');
      } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to fetch suppliers');
        setError(error.response?.data?.message || 'Failed to fetch suppliers');
      } finally {
        setLoading(false);
      }
    };

    if (isAuth) fetchSuppliers();
  }, [isAuth]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this Supplier?')) {
      try {
        const response = await axios.delete(
          `${import.meta.env.VITE_BASE_URL}/supplier/delete/${id}`,
          {
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json',
            },
          });
        toast.success('Supplier deleted successfully');
        setSuppliers(suppliers.filter(supplier => supplier._id !== id));
      } catch (error) {
        console.error(error);
        toast.error(error.response?.data?.message || 'Try Again, something went wrong');
        setError(error.response?.data?.message || 'Try Again, something went wrong');
      }
    }
  };

  const filteredSupplier = suppliers.filter((supplier) => {
    return (
      supplier.supplierName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.supplierAddress?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.supplierPhone.includes(searchTerm)
    );
  });

  if (loading) return <p className="text-green-500 text-xl text-center mt-10">Loading...</p>;
  if (error) return <p className="text-red-500 text-xl text-center mt-10">{error}</p>;
  if (!suppliers.length) return <p className="text-gray-600 text-xl text-center mt-10">No suppliers found</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-4 font-semibold capitalize">
      <h1 className="text-3xl text-center mb-6 text-purple-600 font-extrabold">Supplier List</h1>
      {/* Search Bar */}
      <div className="mb-6 flex justify-center">
        <input
          type="text"
          className="p-2 w-96 border border-gray-300 rounded-lg"
          placeholder="Search by Phone number and Supplier Name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSupplier.map((supplier) => (
          <div key={supplier._id} className="bg-white shadow-lg rounded-lg p-4">
            <div className="flex items-center mb-4 border-b pb-4">
              <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center text-gray-500">
                {supplier.avatar?.secure_url ? (
                  <img
                    src={supplier.avatar.secure_url}
                    alt={supplier.name}
                    className="w-full h-full rounded-full"
                  />
                ) : (
                  <span className="text-lg font-bold text-purple-800 capitalize">
                    {supplier.name?.[0] || 'S'}
                  </span>
                )}
              </div>
              <div className="ml-4">
                <h2 className="text-lg font-semibold capitalize text-purple-800">{supplier.supplierName || 'No Name'}</h2>
                <p className="text-sm text-gray-600 lowercase">{supplier.supplierEmail || 'No Email'}</p>
              </div>
            </div>
            <div className="text-sm space-y-2">
              <p><span className="font-bold">Address:</span> {supplier.supplierAddress || 'N/A'}</p>
              <p><span className="font-bold">Phone:</span> {supplier.supplierPhone || 'N/A'}</p>
              <p><span className="font-bold">Credit Amount:</span> Rs {supplier.creditAmount || 0}</p>
              <p><span className="font-bold">Deposit Amount:</span> Rs {supplier.depositeAmount || 0}</p>
              <p><span className="font-bold">Purchase Amount:</span> Rs {supplier.purchaseAmount || 0}</p>
            </div>
            <div className="flex justify-between items-center mt-4">
              {/*  <Link
                to={`/supplier/view/${supplier._id}`}
                className="flex items-center px-4 py-2 text-green-500 border border-green-500 rounded-md hover:bg-green-500 hover:text-white transition"
              >
                <FaEye className="mr-2" />
                View
              </Link> */}
              <div className="flex space-x-2">
                <Link
                  to={`/supplier/update/${supplier._id}`}
                  className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600 transition"
                >
                  <FaEdit className="mr-2" />
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(supplier._id)}
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

export default GetSupplier;
