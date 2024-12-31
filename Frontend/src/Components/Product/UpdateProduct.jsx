import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { AppContext } from '../../Utils/IsAdmin';
import { useNavigate } from 'react-router-dom';


const UpdateProduct = () => {
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
        productName: '',
        categoryName: '',
        supplierName: '',
        costPrice: '',
        sellingPrice: '',
        markPrice: '',
        stockQuantity: '',
        expiryData: '',
        description: '',
        unit: '',
    });

    useEffect(() => {
        const fetchProductData = async () => {
            setLoading(true);
            setError("");
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_BASE_URL}/product/get/all`,
                    {
                        withCredentials: true,
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }
                );

                const product = response.data.data.allProduct.find((product) => product._id === id);
                if (product) {
                    setFormData({
                        productName: product.productName || '',
                        categoryName: product.categoryName || '',
                        supplierName: product.supplierName || '',
                        costPrice: product.costPrice || '',
                        sellingPrice: product.sellingPrice || '',
                        markPrice: product.markPrice || '',
                        stockQuantity: product.stockQuantity || '',
                        expiryData: product.expiryData || '',
                        description: product.description || '',
                        unit: product.unit || '',
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
            fetchProductData();
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
                `${import.meta.env.VITE_BASE_URL}/product/update/${id}`,
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
                productName: '',
                categoryName: '',
                supplierName: '',
                costPrice: '',
                sellingPrice: '',
                markPrice: '',
                stockQuantity: '',
                expiryData: '',
                description: '',
                unit: '',
            })
            navigate("/product/get");
             toast.success('Product updated successfully!');
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Failed to update Product';
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
        <div className="min-h-screen bg-gradient-to-r from-purple-100 to-blue-100 flex items-center justify-center py-10 font-semibold capitalize">
            <div className="bg-white shadow-xl rounded-lg px-8 py-10 max-w-lg w-full">
                <h1 className="text-3xl font-extrabold text-purple-600 mb-6 text-center">Update Product</h1>
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
                            placeholder="Enter product name"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
                        />
                    </div>

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
                            placeholder="Enter category name"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
                        />
                    </div>

                    {/* Supplier Name */}
                    <div>
                        <label htmlFor="supplierName" className="block text-sm font-medium text-gray-700 mb-1">
                            Supplier Name
                        </label>
                        <input
                            type="text"
                            id="supplierName"
                            name="supplierName"
                            value={formData.supplierName}
                            onChange={handleChange}
                            placeholder="Enter supplier name"
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
                            placeholder="Enter mark price"
                            className="remove-arrow w-full border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
                        />
                    </div>

                    {/* Stock Quantity */}
                    <div>
                        <label htmlFor="stockQuantity" className="block text-sm font-medium text-gray-700 mb-1">
                            Stock Quantity
                        </label>
                        <input
                            min={0}
                            type="number"
                            id="stockQuantity"
                            name="stockQuantity"
                            value={formData.stockQuantity}
                            onChange={handleChange}
                            placeholder="Enter Product quantity"
                            className="remove-arrow w-full border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
                        />
                    </div>

                    {/* Expiry Date */}
                    <div>
                        <label htmlFor="expiryData" className="block text-sm font-medium text-gray-700 mb-1">
                            Expiry Date
                        </label>
                        <input
                            type="date"
                            id="expiryData"
                            name="expiryData"
                            value={formData.expiryData}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                            Description
                        </label>
                        <textarea
                            type="text"
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Enter description"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:ring-2 focus:ring-purple-500 focus:outline-none resize-none"
                        ></textarea>
                    </div>

                    {/* Unit */}
                    <div>
                        <label htmlFor="unit" className="block text-sm font-medium text-gray-700 mb-1">
                            Unit
                        </label>
                        <input
                            type="text"
                            id="unit"
                            name="unit"
                            value={formData.unit}
                            onChange={handleChange}
                            placeholder="Enter Unit"
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
                            {loading ? "Updatting...." : "Update Product"}
                        </button>
                    </div>
                </form>
            </div>
            <Toaster />
        </div>
    );
};

export default UpdateProduct;