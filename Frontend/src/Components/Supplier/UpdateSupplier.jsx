import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { AppContext } from '../../Utils/IsAdmin';
import { useNavigate } from 'react-router-dom';

const UpdateSupplier = () => {

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
        supplierName: '',
        supplierAddress: '',
        supplierPhone: '',
        supplierEmail: '',
        depositeAmount: '',
        purchaseAmount: '',
    });

    useEffect(() => {
        const fetchSupplierData = async () => {
            setLoading(true);
            setError("");
            try {

                const response = await axios.get(
                    `${import.meta.env.VITE_BASE_URL}/supplier/get/all`,
                    {
                        withCredentials: true,
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }
                );

                const supplier = response.data.data.supplierDetails.find((supplier) => supplier._id === id);

                if (supplier) {
                    setFormData({
                        supplierName: supplier.supplierName || '',
                        supplierPhone: supplier.supplierPhone || '',
                        supplierEmail: supplier.supplierEmail || '',
                        supplierAddress: supplier.supplierAddress || '',
                        purchaseAmount: supplier.purchaseAmount || '',
                        depositeAmount: supplier.depositeAmount || ''
                    });
                } else {
                    toast.error('Supplier not found');
                }
            } catch (error) {
                toast.error('Failed to fetch Supplier data');
                console.error(error.response?.data?.message || error.message);
            } finally {
                setLoading(false);
            }
        };
        if (isAuth) {
            fetchSupplierData();
        }
    }, [isAuth]);

    // edit 
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(
                `${import.meta.env.VITE_BASE_URL}/supplier/update/${id}`,
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
                supplierName: '',
                supplierAddress: '',
                supplierPhone: '',
                supplierEmail: '',
                depositeAmount: ''
            })
            toast.success('Supplier updated successfully!');
            navigate('/supplier/get')
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Failed to update Supplier';
            toast.error(errorMessage);
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
                <h1 className="text-3xl font-extrabold text-purple-600 mb-6 text-center">Update Supplier Details</h1>
                <form onSubmit={handleSubmit} className="space-y-6">
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
                            placeholder="Enter Supplier name"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
                        />
                    </div>

                    {/* Phone Name */}
                    <div>
                        <label htmlFor="supplierPhone" className="block text-sm font-medium text-gray-700 mb-1">
                            Supplier Phone Number
                        </label>
                        <input
                            type="text"
                            id="supplierPhone"
                            name="supplierPhone"
                            value={formData.supplierPhone}
                            onChange={handleChange}
                            placeholder="Enter Supplier Phone Number"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
                        />
                    </div>

                    {/* Supplier Name */}
                    <div>
                        <label htmlFor="supplierAddress" className="block text-sm font-medium text-gray-700 mb-1">
                            Supplier Address
                        </label>
                        <input
                            type="text"
                            id="supplierAddress"
                            name="supplierAddress"
                            value={formData.supplierAddress}
                            onChange={handleChange}
                            placeholder="Enter Supplier Address"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
                        />
                    </div>

                    {/* Cost Price */}
                    <div>
                        <label htmlFor="supplierEmail" className="block text-sm font-medium text-gray-700 mb-1">
                            Supplier Email
                        </label>
                        <input
                            type="text"
                            id="supplierEmail"
                            name="supplierEmail"
                            value={formData.supplierEmail}
                            onChange={handleChange}
                            placeholder="Enter Supplier Email"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
                        />
                    </div>

                    {/* Deposite Amount */}
                    <div>
                        <label htmlFor="depositeAmount" className="block text-sm font-medium text-gray-700 mb-1">
                            Deposite Amount
                        </label>
                        <input
                            type="number"
                            id="depositeAmount"
                            name="depositeAmount"
                            value={formData.depositeAmount}
                            onChange={handleChange}
                            placeholder="Enter Deposite Amount"
                            className="remove-arrow w-full border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="text-center">
                        <button
                            type="submit"
                            className={`w-full px-6 py-3 text-white font-semibold rounded-lg shadow-lg transition-transform duration-300 transform  ${loading ? "bg-gray-500 cursor-not-allowed" : "bg-purple-600 hover:bg-purple-700"}`}
                            disabled={loading}
                        >
                            {loading ? "Updatting...." : "Update Supplier"}
                        </button>
                    </div>
                </form>
            </div>
            <Toaster />
        </div>
    );
};

export default UpdateSupplier;