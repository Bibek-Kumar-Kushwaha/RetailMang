import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { AppContext } from "../../Utils/IsAdmin";
import { useNavigate } from "react-router-dom";

const GetProduct = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [maxStock, setMaxStock] = useState("");
  axios.defaults.withCredentials = true;
  const navigate = useNavigate();
  const { isAuth, setIsAuth } = useContext(AppContext);

  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  }, [isAuth, navigate]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/product/get/all`,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setProducts(response.data.data.allProduct);
        setLoading(false);
        // toast.success(response?.data?.message || "All Products Fetched");
      } catch (error) {
        toast.error(
          error.response?.data?.message || "Failed to fetch products"
        );
        setError(error.response?.data?.message || "Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };
    if (isAuth) {
      fetchProducts();
    }
  }, [isAuth]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this Customer?')) {
      try {
        const response = await axios.delete(`${import.meta.env.VITE_BASE_URL}/product/delete/${id}`, {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        });
        toast.success('Customer deleted successfully');
        setProducts(products.filter(product => product._id !== id));
      } catch (error) {
        console.error(error);
        toast.error(error.response?.data?.message || 'Try Again, something went wrong');
        setError(error.response?.data?.message || 'Try Again, something went wrong');
      }
    }
  };

  const filteredProducts = products.filter((product) => {
    // Check if the product name, category, or supplier matches the search term
    const matchesName =
      product.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.categoryName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.supplierName.toLowerCase().includes(searchTerm.toLowerCase());

    // Check if the stock quantity is less than or equal to the max stock
    const matchesMaxStock = maxStock === "" || product.stockQuantity <= parseFloat(maxStock);

    // Return true if both conditions are met
    return matchesName && matchesMaxStock;
  });


  if (loading) {
    return <p className="text-green-500 text-xl">Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500 text-xl">{error}</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 font-semibold capitalize">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-purple-600 mb-8">
          All Products
        </h1>

        {/* Search Bar */}
        <div 
        className="mb-6 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by product, category, or supplier..."
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          />


          <input
            type="number"
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Show Stock less than this value"
            value={maxStock}
            onChange={(e) => setMaxStock(e.target.value)}
          />
        </div>

        {filteredProducts.length === 0 ? (
          <p className="text-center text-gray-600">No products found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {filteredProducts.map((product) => (
              <div
                key={product._id}
                className="bg-white shadow-md rounded-lg p-4 transition-transform transform hover:scale-105"
              >

                {/* For Image */}
                {/* <img
                  src={
                    product.productImage?.secure_url ||
                    "https://via.placeholder.com/150"
                  }
                  alt={product.productName}
                  className="w-full h-32 object-cover rounded-t-lg"
                /> */}

                <div className="mt-4">
                  <h2 className="text-xl font-bold text-gray-800 capitalize">
                    {product.productName}
                  </h2>
                  <p className="text-gray-600">{product.categoryName}</p>
                  <p className="text-gray-600">
                    Supplier:{" "}
                    <span className="font-medium">{product.supplierName}</span>
                  </p>
                  <p className="text-green-600 font-semibold">
                    रु {product.sellingPrice}
                  </p>
                  <p className="text-gray-500 text-sm mt-2">
                    {product.description || "No description available"}
                  </p>
                  <p
                    className="text-lg"
                  >
                    Stock:{" "}
                    <span
                      className={`text-lg ${product.stockQuantity === 0 ? 'text-red-500' : 'text-green-500'}`}
                    >
                      {product.stockQuantity > 0 ? product.stockQuantity : "Out of stock"}
                    </span>
                  </p>

                  <div className="flex space-x-2 mt-4">
                    {/* View Button */}
                    <Link
                      to={`/product/view/${product._id}`}
                      className="flex items-center px-2 py-2 text-green-500 border border-green-500 rounded-md hover:bg-green-500 hover:text-white transition"
                    >
                      <FaEye className="mr-2" />
                      View
                    </Link>

                    {/* Edit Button */}
                    <Link
                      to={`/product/update/${product._id}`}
                      className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600 transition"
                    >
                      <FaEdit className="mr-2" />
                      Edit
                    </Link>

                    {/* Delete Button */}
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="flex items-center px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                    >
                      <FaTrash className="mr-2" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        <Toaster />
      </div>
    </div>
  );
};

export default GetProduct;
