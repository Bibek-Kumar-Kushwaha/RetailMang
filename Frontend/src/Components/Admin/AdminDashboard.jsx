import React from 'react';
import DashboardLayout from '../../Layouts/DashboardLayout';

const AdminDashboard = () => {
  const adminSections = [
    // {
    //   name: 'Register As Admin',
    //   link: '/signup',
    //   bgColor: 'bg-blue-500',
    //   hoverColor: 'bg-blue-600',
    //   icon: 'add',
    //   action: 'Add New Admin',
    // },
    {
      name: 'View Admin',
      link: '/admin/get',
      bgColor: 'bg-green-500',
      hoverColor: 'bg-green-600',
      icon: 'view',
      action: 'View Admin Info',
    },
    {
      name: 'Get Own Profile',
      link: '/admin/profile',
      bgColor: 'bg-purple-500',
      hoverColor: 'bg-purple-600',
      icon: 'user',
      action: 'Get Own Profile',
    },
  ];

  return (
    <DashboardLayout pageName="Admin Dashboard" sections={adminSections} />
  );
};

export default AdminDashboard;
