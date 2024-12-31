import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';
import { useParams } from 'react-router-dom';

const ViewProduct = () => {
  const { id } = useParams();
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProductDetails = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/product/view/${id}`,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setProductData(response.data.data.product); // Assuming you want to show the first product
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch product details");
        toast.error(err.response?.data?.message || "Failed to fetch product details");
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  if (loading) {
    return <p className="text-green-500 text-xl text-center mt-10">Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500 text-xl text-center mt-10">{error}</p>;
  }

  const {
    productImage,
    productName,
    categoryName,
    supplierName,
    costPrice,
    sellingPrice,
    markPrice,
    stockQuantity,
    expiryDate,
    description,
    createdAt,
    updatedAt,
  } = productData;

  return (
    <div className="min-h-screen bg-gray-50 py-8 capitalize">
      <h1 className="text-4xl font-extrabold text-center mb-8 text-purple-700">
        Product Details
      </h1>
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
        {/* Product Image */}
        {/* <div className="bg-gray-100 p-6 flex justify-center">
          {productImage?.secure_url ? (
            <img
              src={productImage.secure_url}
              alt={productName}
              className="w-40 h-40 object-cover rounded-lg shadow-sm"
            />
          ) : (
            <div className="w-40 h-40 flex items-center justify-center bg-purple-100 rounded-lg shadow-sm">
              <span className="text-xl font-semibold text-purple-700">No Image</span>
            </div>
          )}
        </div> */}

        {/* Product Details */}
        <div className="p-6 space-y-4 font-semibold">
          <div className="flex flex-col md:flex-row justify-between items-center border-b pb-4 font-bold">
            <p className="text-lg font-bold capitalize">
              <span className="text-gray-500">Product Name:</span> {productName}
            </p>
            <p className="text-lg font-bold capitalize">
              <span className="text-gray-500">Category:</span> {categoryName}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <p className="text-green-700 capitalize">
              <span className="font-medium text-gray-500">Supplier: </span> {supplierName}
            </p>
            <p className="text-gray-700">
              <span className="font-medium text-gray-500">Cost Price: </span>
              <span className="currency-value">रु {costPrice}</span>
            </p>
            <p className="text-gray-700">
              <span className="font-medium text-gray-500">Selling Price: </span>
              <span className="currency-value">रु {sellingPrice}</span>
            </p>
            <p className="text-gray-700">
              <span className="font-medium text-gray-500">Mark Price: </span>
              <span className="currency-value">रु {markPrice}</span>
            </p>
            <p
              className={`text-lg font-bold ${stockQuantity === 0 ? 'text-red-500' : 'text-green-500'}`}
            >
              <span className="font-medium text-gray-500">Stock Quantity: </span>
              {stockQuantity > 0
                ? stockQuantity
                : "Out of stock"}
            </p>
            <p className="text-gray-700">
              <span className="font-medium text-gray-500">Expiry Date:</span>{" "}
              {expiryDate ? new Date(expiryDate).toLocaleDateString() : "N/A"}
            </p>
          </div>

          <div className="pt-4">
            <p className="text-gray-700">
              <span className="font-medium text-gray-500">Description:</span>{" "}
              {description || "No Description Provided"}
            </p>
          </div>
        </div>

        {/* Timestamps */}
        <div className="bg-gray-50 p-6 border-t grid grid-cols-1 md:grid-cols-2 gap-4">
          <p className="text-gray-600">
            <span className="font-medium">Created At:</span> {new Date(createdAt).toLocaleDateString()}
          </p>
          <p className="text-gray-600">
            <span className="font-medium">Updated At:</span> {new Date(updatedAt).toLocaleDateString()}
          </p>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default ViewProduct;
