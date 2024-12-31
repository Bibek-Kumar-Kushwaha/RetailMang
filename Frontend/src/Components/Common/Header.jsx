import React, { useContext } from 'react';
import Logout from '../Admin/Logout';
import { AppContext } from '../../Utils/IsAdmin';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import logo from '../../assets/shopLogo.jpg'
const Header = () => {
  const navigate = useNavigate();
  const { isAuth } = useContext(AppContext);

  return (
    <header className="bg-gradient-to-r from-gray-200 to-gray-400 text-white py-4 shadow-md sticky top-0 capitalize">
      <div className="container mx-auto flex justify-between items-center px-4">
        {/* Logo Section */}
        <div className="flex items-center space-x-2">
          {/* Logo Icon */}
          <div className="w-14 h-14 bg-blue-500 rounded-full flex items-center justify-center">
            <img
              className="w-[90%] h-[90%] object-cover rounded-full"
              src={logo}
              alt="logo" />
          </div>

          {/* Logo Text */}
          <Link
            to={'/'}
            className="md:text-3xl text-xl font-extrabold tracking-tight">
            <span className="text-black">Kushwaha </span>
            <span className="text-blue-700">VetHub</span>
          </Link>
          {/* Subtext */}
          {/* <p className="text-gray-600 text-lg sm:text-xl text-center">
            Compassionate Care for Your Beloved Pets
          </p> */}
        </div>

        {/* Authentication Section */}
        <div>
          {isAuth ? (
            <Logout />
          ) : (
            <button
              onClick={() => navigate('/')}
              className="bg-purple-700 hover:bg-purple-700 text-white font-semibold px-4 py-2 rounded-md transition-colors duration-300"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
