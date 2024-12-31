import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../Utils/IsAdmin";

const AddProduct = () => {
  const navigate = useNavigate();
  const { isAuth } = useContext(AppContext);

  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  }, [isAuth, navigate]);

  const [categoryList, setCategoryList] = useState([]);
  const [supplierList, setSupplierList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  axios.defaults.withCredentials = true;

  const [formData, setFormData] = useState({
    productName: '',
    costPrice: '',
    sellingPrice: '',
    markPrice: '',
    categoryName: '',
    supplierName: '',
  });

  // Fetch initial data
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [categoryRes, supplierRes] = await Promise.all([
          axios.get(`${import.meta.env.VITE_BASE_URL}/category/get/all`, { withCredentials: true }),
          axios.get(`${import.meta.env.VITE_BASE_URL}/supplier/get/all`, { withCredentials: true }),
        ]);
        setCategoryList(categoryRes.data.data.allCategory);
        setSupplierList(supplierRes.data.data.supplierDetails
        );
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to fetch initial data.");
      }
    };

    fetchInitialData();
  }, []);


  const handleCategoryChange = (value) => {
    const category = categoryList.find(
      (category) => category.categoryName === value
    );
    if (category) setCategoryList(category);
    else setCategoryList(null)
  }

  const handleSupplierChange = (value) => {
    const supplier = supplierList.find(
      (supplier) => supplier.supplierName === value
    );
    if (supplier) setCategoryList(supplier);
    else setCategoryList(null)
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/product/add`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setFormData({
        productName: '',
        costPrice: '',
        sellingPrice: '',
        markPrice: '',
        categoryName: '',
        supplierName: '',
      });
      toast.success(response?.data?.message || "Product Added successfully!");
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong. Please try again.');
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-100 to-blue-100 flex items-center justify-center py-10 font-semibold capitalize">
      <div className="bg-white shadow-xl rounded-lg px-8 py-10 max-w-lg w-full">
        <h1 className="text-3xl font-extrabold text-purple-600 mb-6 text-center">
          Add Product Details
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Product Name */}
          <div>
            <label htmlFor="productName" className="block text-sm font-medium text-gray-700 mb-1">
              Product Name
            </label>
            <input
              type="text"
              id="productName"
              name="productName"
              value={formData.productName}
              onChange={handleChange}
              required
              placeholder="Enter product name"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
            />
          </div>

          {/* Cost Price */}
          <div>
            <label htmlFor="costPrice" className="block text-sm font-medium text-gray-700 mb-1">
              Cost Price
            </label>
            <input
              type="number"
              id="costPrice"
              name="costPrice"
              value={formData.costPrice}
              onChange={handleChange}
              required
              placeholder="Enter cost price"
              className="remove-arrow w-full border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
            />
          </div>

          {/* Selling Price */}
          <div>
            <label htmlFor="sellingPrice" className="block text-sm font-medium text-gray-700 mb-1">
              Selling Price
            </label>
            <input
              type="number"
              id="sellingPrice"
              name="sellingPrice"
              value={formData.sellingPrice}
              onChange={handleChange}
              required
              placeholder="Enter selling price"
              className="remove-arrow w-full border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
            />
          </div>

          {/* Mark Price */}
          <div>
            <label htmlFor="markPrice" className="block text-sm font-medium text-gray-700 mb-1">
              Mark Price
            </label>
            <input
              type="number"
              id="markPrice"
              name="markPrice"
              value={formData.markPrice}
              onChange={handleChange}
              required
              placeholder="Enter mark price"
              className="remove-arrow w-full border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
            />
          </div>

          {/* Category Name */}
          <div>
            <label htmlFor="categoryName" className="block text-sm font-medium text-gray-700 mb-1">
              Category Name
            </label>
            <select
              type="text"

              list="category-list"
              name="categoryName"
              value={formData.categoryName}
              onChange={handleChange}
              placeholder="Enter Category name"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
            >
              <option value="">Select Category</option>
              {Array.isArray(categoryList) &&
                categoryList.map((category) => (
                  <option key={category.id} value={category.categoryName}>
                    {category.categoryName}
                  </option>
                ))}
            </select>
          </div>

          {/* Supplier Name */}
          <div>
            <label htmlFor="categoryName" className="block text-sm font-medium text-gray-700 mb-1">
              Supplier Name
            </label>
            <select
              type="text"
              id="supplierName"
              list="supplier-list"
              name="supplierName"
              value={formData.supplierName}
              onChange={handleChange}
              placeholder="Enter Supplier name"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
            >
              <option value="">Select Supplier</option>
              <option id="supplier-list">
                {supplierList.map((supplier) => (
                  <option key={supplier.id} value={supplier.supplierName}>
                    {supplier.supplierName}
                  </option>
                ))}
              </option>
            </select>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className={`w-full px-6 py-3 text-white font-semibold rounded-lg shadow-lg transition-transform duration-300 transform  ${loading ? "bg-gray-500 cursor-not-allowed" : "bg-purple-600 hover:bg-purple-700"}`}
              disabled={loading}
            >
              {loading ? "Adding...." : "Add Product"}
            </button>
          </div>
        </form>
      </div>
      <Toaster />
    </div>
  );
};

export default AddProduct;
