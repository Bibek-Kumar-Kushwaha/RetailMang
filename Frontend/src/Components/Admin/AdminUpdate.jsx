import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import { AppContext } from '../../Utils/IsAdmin';
import { useNavigate } from 'react-router-dom';

const AdminUpdate = () => {

  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
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
    password: '',
    address: '',
    role: '',
  });

  useEffect(() => {
    const fetchAdmin = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/admin/get/all`,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const adminData = response.data.data.allAdmin.find((admin) => admin._id === id);

        if (adminData) {
          setFormData({
            name: adminData.name || '',
            phone: adminData.phone || '',
            email: adminData.email || '',
            address: adminData.address || '',
            password: '',
            role: adminData.role || '',
          });

        } else {
          toast.error('Admin not found.');
        }
      } catch (error) {
        const errorMsg =
          error.response?.data?.message || 'Failed to fetch admin details.';
        setError(errorMsg);
        toast.error(errorMsg);
      } finally {
        setLoading(false);
      }
    };
    if (isAuth) {
      fetchAdmin();
    }
  }, [isAuth]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  const updateAdmin = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BASE_URL}/admin/update/${id}`,
        formData,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      toast.success('Admin updated successfully!');
      return response.data;
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'An error occurred on the server.';
      setError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateAdmin();
    setFormData({
      name: '',
      phone: '',
      address: '',
      email: '',
      password: '',
      role: '',
    })
    navigate('/admin/get')
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 font-semibold capitalize">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-3xl font-extrabold text-purple-600 mb-6 text-center">Update Admin</h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter Name"
              required
            />
          </div>

          {/* Phone */}
          <div className="mb-4">
            <label className="block text-gray-700">Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter Phone"
              required
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md lowercase"
              placeholder="Enter Email"
              required
            />
          </div>

           {/* Address */}
           <div className="mb-4">
            <label className="block text-gray-700">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter Address"
              required
            />
          </div>

          {/* Role */}
          <div className="mb-4">
            <label className="block text-gray-700">Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            >
              <option value="" disabled>Select Role</option>
              <option value="ADMIN">ADMIN</option>
              <option value="WantToBeAdmin">WantToBeAdmin</option>
            </select>
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
                placeholder="Enter New Password (if needed)"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-500 focus:outline-none"
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className={`w-full px-6 py-3 text-white font-semibold rounded-lg shadow-lg transition-transform duration-300 transform ${loading
              ? 'bg-gray-500 cursor-not-allowed'
              : 'bg-purple-600 hover:bg-purple-700'
              }`}
            disabled={loading}
          >
            {loading ? 'Updating...' : 'Update'}
          </button>
        </form>
        <Toaster />
      </div>
    </div>
  );
};

export default AdminUpdate;
