import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../../Utils/IsAdmin";
import toast, { Toaster } from 'react-hot-toast';

const Login = () => {
  const { isAuth, setIsAuth } = useContext(AppContext);
  const [formData, setFormData] = useState({
    phone: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  axios.defaults.withCredentials = true;
  const navigate = useNavigate();

    useEffect(() => {
       if(isAuth){
        navigate('/')
       }
    })

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((values) => ({ ...values, [name]: value }));
  };

  // Handle form submission
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/admin/login`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        // Store tokens in localStorage
        localStorage.setItem("accessToken", response.data.data.accessToken);
        localStorage.setItem("refreshToken", response.data.data.refreshToken);

        // Reset form and context
        setFormData({ email: "", password: "" });
        setIsAuth(true);

        // Redirect to dashboard
        navigate("/");
        toast.success(response?.data?.message);
      } else {
        toast.error(error.response?.data?.message || "Invalid credentials");
        setError(error.response?.data?.message || "Invalid credentials");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong. Please try again.');
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 font-semibold capitalize">
      <form
        className="bg-white p-6 rounded shadow-md w-full max-w-sm"
        onSubmit={handleLogin}
      >
        <h2 className="text-3xl font-extrabold text-purple-600 mb-6 text-center">Admin Login</h2>

        {error && <p className="text-red-500 text-2xl mb-4">{error}</p>}

        {/* Phone */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Phone</label>
          <input
            type="Number"
            name="phone"
            placeholder="Enter your phone"
            value={formData.phone}
            onChange={handleChange}
            className="remove-arrow w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-2 text-gray-500"
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>
        </div>

        <button
          type="submit"
          className={`w-full px-6 py-3 text-white font-semibold rounded-lg shadow-lg transition-transform duration-300 transform  ${loading ? "bg-gray-500 cursor-not-allowed" : "bg-purple-600 hover:bg-purple-700"}`}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
        <div className="text-center mt-3">
          <p>
          Don't have an account?{' '}
            <Link
              className="text-purple-700 hover:underline transition-colors duration-200 font-bold"
              to="/signup"
            >
              Signup
            </Link>
          </p>
        </div>

      </form>
      <Toaster />
    </div>
  );
};

export default Login;
