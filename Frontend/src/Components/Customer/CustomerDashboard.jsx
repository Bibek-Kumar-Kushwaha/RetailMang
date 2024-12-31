import React from 'react'
import DashboardLayout from '../../Layouts/DashboardLayout'

const CustomerDashboard = () => {
  const customerSections = [
    {
      name: 'Register Customer',
      link: '/customer/add',
      bgColor: 'bg-blue-500',
      hoverColor: 'bg-blue-600',
      icon: 'add',
      action: 'Register New Customer',
    },
    {
      name: 'View Customer',
      link: '/customer/get',
      bgColor: 'bg-green-500',
      hoverColor: 'bg-green-600',
      icon: 'view',
      action: 'View Customer Info',
    }
  ];
  return (
    <>
      <DashboardLayout pageName={'Customer Dashboard'} sections={customerSections} />
    </>
  )
}

export default CustomerDashboard