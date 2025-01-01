import React, { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../../Utils/IsAdmin';

const Dashboard = () => {
  const navigate = useNavigate();
  const { isAuth } = useContext(AppContext);

  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  }, [isAuth, navigate]);

  const sections = [
    { name: 'Admin', description: 'Manage system, product and users', icon: '👤', route: '/admin/dashboard' },
    { name: 'Customer', description: 'Access customer details and orders', icon: '🛍️', route: '/customer/dashboard' },
    { name: 'Product', description: 'View and manage products', icon: '📦', route: '/product/dashboard' },
    { name: 'Category', description: 'Organize products into categories', icon: '📚', route: '/category/dashboard' },
    { name: 'Discount', description: 'Manage discounts and promotions', icon: '💸', route: '/discount/dashboard' },
    { name: 'Invoice', description: 'Generate and manage invoices', icon: '🧾', route: '/invoice/dashboard' },
    { name: 'Credit', description: 'Track and manage customer credits', icon: '💳', route: '/credit/dashboard' },
    { name: 'Supplier', description: 'Manage suppliers and orders', icon: '🚚', route: '/supplier/dashboard' },
    // { name: 'Employee', description: 'View and manage employee details', icon: '👨‍💼', route: '/employee/dashboard' },
  ];

  return (
    <div className="min-h-screen bg-gray-100 py-10 text-center font-semibold">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center text-purple-700 mb-8">Dashboard</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {sections.map((section, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-center mb-4 justify-center">
                <div className="text-4xl text-blue-500 mr-4">{section.icon}</div>
                <h2 className="text-2xl font-semibold text-gray-800">{section.name}</h2>
              </div>
              <p className="text-gray-600">{section.description}</p>
              <Link
                to={section.route}
                className="inline-block mt-4 bg-purple-600 text-white py-2 px-5 rounded-md hover:bg-purple-700 transition-colors duration-300"
              >
                Manage {section.name}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
