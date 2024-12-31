import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../Utils/IsAdmin";

const AddDiscount = () => {
  const navigate = useNavigate();
  const { isAuth } = useContext(AppContext);

  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  }, [isAuth, navigate]);


  const [formData, setFormData] = useState({
    discountName: '',
    percentage: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/discount/add`,
        formData
      );

      setFormData({
        discountName: '',
        percentage: ''
      }); // Reset form
      toast.success('Discount added successfully!');
      navigate('/discount/get')
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to add product';
      toast.error(errorMessage);
      console.error(errorMessage);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-100 to-blue-100 flex items-center justify-center py-10 font-semibold capitalize">
      <div className="bg-white shadow-xl rounded-lg px-8 py-10 max-w-lg w-full">
        <h1 className="text-3xl font-extrabold text-purple-600 mb-6 text-center">
          Add discount
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* discount Name */}
          <div>
            <label htmlFor="discountName" className="block text-sm font-medium text-gray-700 mb-1">
              Discount Name
            </label>
            <input
              type="text"
              id="discountName"
              name="discountName"
              value={formData.discountName}
              onChange={handleChange}
              required
              placeholder="Enter discount name"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
            />
          </div>

          {/* description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Percentage
            </label>
            <input
              min={0}
              type="number"
              id="percentage"
              name="percentage"
              value={formData.percentage}
              onChange={handleChange}
              required
              placeholder="Enter Discount Percentage"
              className="remove-arrow w-full border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
            />
          </div>


          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-purple-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-purple-700 shadow-lg transition-transform duration-300 transform hover:scale-105"
            >
              Add Discount
            </button>
          </div>
        </form>
      </div>
      <Toaster />
    </div>
  );
};

export default AddDiscount;
