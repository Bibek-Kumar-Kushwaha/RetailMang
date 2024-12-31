import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { AppContext } from '../../Utils/IsAdmin';
import { useNavigate } from 'react-router-dom';

const UpdateCategory = () => {
  const { id } = useParams();
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

  const [formData, setFormData] = useState({
    categoryName: '',
    description: ''
  });

  useEffect(() => {
    const fetchCategoryData = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/category/get/all`,
          {
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json',
            },
          });

        const category = response.data.data.allCategory.find((category) => category._id === id);

        if (category) {
          setFormData({
            categoryName: category.categoryName || '',
            description: category.description || '',
          });

        } else {
          toast.error('Product not found');
        }
      } catch (error) {
        toast.error('Failed to fetch Product data');
        console.error(error.response?.data?.message || error.message);
      } finally {
        setLoading(false);
      }
    };
    if (isAuth) {
      fetchCategoryData();
    }
  }, [isAuth]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `${import.meta.env.VITE_BASE_URL}/category/update/${id}`,
        formData,
        {
          withCredentials: true,
          headers:
          {
            'Content-Type': 'application/json'
          },
        }
      );
      setFormData({
        categoryName: '',
        description: '',
      })
      toast.success('Category updated successfully!');
      navigate('/category/get')
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to update user';
      toast.error(errorMessage);
      console.error(errorMessage);
    }
  };

  if (loading) {
    return <p className="text-green-500 text-xl">Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500 text-xl">{error}</p>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-100 to-blue-100 flex items-center justify-center py-10 capitalize">
      <div className="bg-white shadow-xl rounded-lg px-8 py-10 max-w-lg w-full">
        <h1 className="text-3xl font-extrabold text-purple-600 mb-6 text-center">Update Category</h1>
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              id="categoryName"
              name="categoryName"
              value={formData.categoryName}
              onChange={handleChange}
              placeholder="Enter Category name"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
            />
          </div>

          {/* Dwscription */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
            <input
              type="text"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter Category Description"
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
              {loading ? "Updatting...." : "Update Category"}
            </button>
          </div>
        </form>
      </div>
      <Toaster />
    </div>
  );
};


export default UpdateCategory