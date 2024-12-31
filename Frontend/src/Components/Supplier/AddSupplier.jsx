import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../Utils/IsAdmin";

const AddSupplier = () => {
  const navigate = useNavigate();
  const { isAuth } = useContext(AppContext);
  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  }, [isAuth, navigate]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  axios.defaults.withCredentials = true;

  const [formData, setFormData] = useState({
    supplierName: '',
    supplierAddress: '',
    supplierPhone: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/supplier/add`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setFormData({
        supplierName: '',
        supplierPhone: '',
        supplierAddress: ''
      });
      toast.success(response?.data?.message || 'Supplier added successfully!');
      navigate('/supplier/get')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong. Please try again.');
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-100 to-blue-100 flex items-center justify-center py-10 font-semibold capitalize">
      <div className="bg-white shadow-xl rounded-lg px-8 py-10 max-w-lg w-full">
        <h1 className="text-3xl font-extrabold text-purple-600 mb-6 text-center">
          Register Supplier
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Supplier Name */}
          <div>
            <label htmlFor="productName" className="block text-sm font-medium text-gray-700 mb-1">
              Supplier Name
            </label>
            <input
              type="text"
              id="supplierName"
              name="supplierName"
              value={formData.supplierName}
              onChange={handleChange}
              required
              placeholder="Enter Supplier Name"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
            />
          </div>

          {/* Supplier Phone */}
          <div>
            <label htmlFor="supplierPhone" className="block text-sm font-medium text-gray-700 mb-1">
              Supplier Phone Number
            </label>
            <input
              type="text"
              id="supplierPhone"
              name="supplierPhone"
              value={formData.supplierPhone}
              onChange={handleChange}
              required
              placeholder="Enter Supplier Phone number"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
            />
          </div>

          {/* Supplier Address */}
          <div>
            <label htmlFor="supplierAddress" className="block text-sm font-medium text-gray-700 mb-1">
              Supplier Address
            </label>
            <input
              type="text"
              id="supplierAddress"
              name="supplierAddress"
              value={formData.supplierAddress}
              onChange={handleChange}
              required
              placeholder="Enter Supplier Address"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
            />
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className={`w-full px-6 py-3 text-white font-semibold rounded-lg shadow-lg transition-transform duration-300 transform  ${loading ? "bg-gray-500 cursor-not-allowed" : "bg-purple-600 hover:bg-purple-700"}`}
              disabled={loading}
            >
              {loading ? "Registering...." : "Register Supplier"}
            </button>
          </div>
        </form>
      </div>
      <Toaster />
    </div>
  );
};

export default AddSupplier;
