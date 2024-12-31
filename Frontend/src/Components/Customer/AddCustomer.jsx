import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { AppContext } from '../../Utils/IsAdmin';
import { useNavigate } from 'react-router-dom';

const AddCustomer = () => {
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
        name: '',
        phone: '',
        address: '',
        role: 'CUSTOMER'
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
                `${import.meta.env.VITE_BASE_URL}/user/add`,
                formData,
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            setFormData({
                name: '',
                phone: '',
                address: '',
                role: 'CUSTOMER'
            })
            toast.success(response?.data?.message || 'Customer added successfully!');
            navigate("/customer/get");
        } catch (error) {
            toast.error(error.response?.data?.message || 'Something went wrong. Please try again.');
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-50 to-green-50 flex items-center justify-center p-4 font-semibold capitalize">
            <div className="bg-white shadow-xl rounded-lg px-8 py-10 max-w-lg w-full">
                <h1 className="text-3xl font-extrabold text-purple-600 mb-6 text-center">Register Customer</h1>
                <form onSubmit={handleSubmit} className="space-y-6">

                    {/* Name */}
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            placeholder="Enter customer name"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        />
                    </div>

                    {/* Phone */}
                    <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                        <input
                            type="text"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            placeholder="Enter phone number"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        />
                    </div>

                    {/* Address */}
                    <div>
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                        <input
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            required
                            placeholder="Enter address"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none resize-none"
                        ></input>
                    </div>

                    {/* Role (Hidden Input) */}
                    <input type="hidden" name="role" value="CUSTOMER" />

                    {/* Submit Button */}
                    <div className="text-center">
                        <button
                            type="submit"
                            className={`w-full px-6 py-3 text-white font-semibold rounded-lg shadow-lg transition-transform duration-300 transform  ${loading ? "bg-gray-500 cursor-not-allowed" : "bg-purple-600 hover:bg-purple-700"}`}
                            disabled={loading}
                        >
                            {loading ? "Registering...." : "Register Customer"}
                        </button>
                    </div>
                </form>
            </div>
            <Toaster />
        </div>
    );
};

export default AddCustomer;