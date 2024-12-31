import React from 'react'
import DashboardLayout from '../../Layouts/DashboardLayout'

const DiscountDashboard = () => {
  const discountSections = [
    {
      name: 'Add Discount',
      link: '/discount/add',
      bgColor: 'bg-blue-500',
      hoverColor: 'bg-blue-600',
      icon: 'add',
      action: 'Add New Discount',
    },
    {
      name: 'View Discount',
      link: '/discount/get',
      bgColor: 'bg-green-500',
      hoverColor: 'bg-green-600',
      icon: 'view',
      action: 'View Discount Info',
    }
  ];
  return (
    <>
      <DashboardLayout pageName={'Discount Dashboard'} sections={discountSections} />
    </>
  )
}

export default DiscountDashboard