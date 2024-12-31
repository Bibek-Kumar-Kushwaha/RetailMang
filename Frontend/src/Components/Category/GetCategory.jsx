import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { AppContext } from '../../Utils/IsAdmin';
import { useNavigate } from 'react-router-dom';

const GetCategory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  axios.defaults.withCredentials = true;
  const navigate = useNavigate();
  const { isAuth } = useContext(AppContext);

  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  }, [isAuth, navigate]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/category/get/all`,
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        setCategories(response.data.data.allCategory);
        // toast.success('Categories fetched successfully');
      } catch (err) {
        const errorMsg = err.response?.data?.message || 'Failed to fetch categories';
        toast.error(errorMsg);
        setError(errorMsg);
      } finally {
        setLoading(false);
      }
    };

    if (isAuth) fetchCategories();

  }, [isAuth]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this Category?')) {
      try {
        const response = await axios.delete(
          `${import.meta.env.VITE_BASE_URL}/category/delete/${id}`,
          {
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json',
            },
          });
        toast.success('Category deleted successfully');
        setCategories(categories.filter(category => category._id !== id));
      } catch (error) {
        console.error(error);
        toast.error(error.response?.data?.message || 'Try Again, something went wrong');
        setError(error.response?.data?.message || 'Try Again, something went wrong');
      }
    }
  };

  const filteredCategory = categories.filter((category) => {
    return (
      category.categoryName?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  if (loading) return <p className="text-green-500 text-center text-xl">Loading...</p>;
  if (error) return <p className="text-red-500 text-center text-xl">{error}</p>;
  if (!categories.length) return <p className="text-gray-500 text-center text-xl">No categories available</p>;

  return (
    <div className="min-h-screen bg-gray-50 py-10 font-semibold capitalize">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-purple-600 mb-8">All Categories</h1>
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategory.map((category) => (
            <div key={category._id} className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800">{category.categoryName}</h2>
              <p className="text-gray-600 mt-2">
                {category.description || 'No description available'}
              </p>
              <div className="mt-4">
                <p className="text-sm text-gray-500">
                  Created: {new Date(category.createdAt).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-500">
                  Updated: {new Date(category.updatedAt).toLocaleDateString()}
                </p>
              </div>

              {/* Action Button */}
              <div className="flex space-x-4 mt-4">
                <Link
                  to={`/category/update/${category._id}`}
                  className="flex items-center justify-center w-full px-4 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600 transition duration-300"
                >
                  <FaEdit className="mr-2" /> Edit
                </Link>
                <button
                  onClick={() => handleDelete(category._id)}
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

export default GetCategory;