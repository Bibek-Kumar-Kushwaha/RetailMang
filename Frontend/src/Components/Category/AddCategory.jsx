import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { AppContext } from '../../Utils/IsAdmin';
import { useNavigate } from 'react-router-dom';

const AddCategory = () => {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  axios.defaults.withCredentials = true;
  const navigate = useNavigate();
  const { isAuth, setIsAuth } = useContext(AppContext);

    useEffect(() => {
      if (!isAuth) {
        navigate("/login");
      }
    }, [isAuth, navigate]);
  
  const [formData, setFormData] = useState({
    categoryName: '',
    description: ''
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
        `${import.meta.env.VITE_BASE_URL}/category/add`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setFormData({
        categoryName: '',
        description: ''
      });
      toast.success(response?.data?.message || 'Category added successfully!');
      navigate('/category/get')
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
          Add Category
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Category Name */}
          <div>
            <label htmlFor="categoryName" className="block text-sm font-medium text-gray-700 mb-1">
              Category Name
            </label>
            <input
              type="text"
              id="categoryName"
              name="categoryName"
              value={formData.categoryName}
              onChange={handleChange}
              required
              placeholder="Enter Category name"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
            />
          </div>

          {/* description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <input
              type="text"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              placeholder="Enter description"
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
              {loading ? "Adding...." : "Add Category"}
            </button>
          </div>
        </form>
      </div>
      <Toaster />
    </div>
  );
};

export default AddCategory;