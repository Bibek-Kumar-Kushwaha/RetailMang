import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { AppContext } from '../../Utils/IsAdmin';
import { useNavigate } from 'react-router-dom';

const UpdateCustomer = () => {
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
        name: '',
        phone: '',
        email: '',
        address: '',
        role: 'CUSTOMER',
    });

    useEffect(() => {
        const fetchUserData = async () => {
            setLoading(true);
            setError("");
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_BASE_URL}/user/get/all`,
                    {
                        withCredentials: true,
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });

                const user = response.data.data.allUser.find((admin) => admin._id === id);

                if (user) {
                    setFormData({
                        name: user.name || '',
                        phone: user.phone || '',
                        email: user.email || '',
                        address: user.address || '',
                        role: user.role || 'CUSTOMER',
                    });
                } else {
                    toast.error('Customer not found');
                }
            } catch (error) {
                toast.error(error.response?.data?.message || "Failed to fetch User profile");
                setError(error.response?.data?.message || "Failed to fetch User profile");
            } finally {
                setLoading(false);
            }
        };
        if (isAuth) {
            fetchUserData();
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
                `${import.meta.env.VITE_BASE_URL}/user/update/${id}`,
                formData,
                {
                    withCredentials: true,
                    headers: { 'Content-Type': 'application/json' },
                }
            );
            toast.success('User updated successfully!');
            navigate("/customer/get");
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Failed to update user';
            toast.error(errorMessage);
            console.error(errorMessage);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-purple-100 to-blue-100 flex items-center justify-center py-10 font-semibold capitalize">
            <div className="bg-white shadow-xl rounded-lg px-8 py-10 max-w-lg w-full">
                <h1 className="text-3xl font-extrabold text-purple-600 mb-6 text-center">Update Customer</h1>
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
                            placeholder="Enter user name"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
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
                            placeholder="Enter phone number"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter email"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:ring-2 focus:ring-purple-500 focus:outline-none lowercase"
                        />
                    </div>

                    {/* Address */}
                    <div>
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                        <textarea
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            placeholder="Enter address"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:ring-2 focus:ring-purple-500 focus:outline-none resize-none"
                        ></textarea>
                    </div>

                    {/* Submit Button */}
                    <div className="text-center">
                        <button
                            type="submit"
                            className="w-full bg-purple-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-purple-700 shadow-lg transition-transform duration-300 transform hover:scale-105"
                        >
                            Update Customer
                        </button>
                    </div>
                </form>
            </div>
            <Toaster />
        </div>
    );
};

export default UpdateCustomer;
