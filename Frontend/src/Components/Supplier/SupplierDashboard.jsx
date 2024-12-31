import React from 'react'
import DashboardLayout from '../../Layouts/DashboardLayout'

const SupplierDashboard = () => {
  const supplierSections = [
    {
      name: 'Add Supplier',
      link: '/supplier/add',
      bgColor: 'bg-blue-500',
      hoverColor: 'bg-blue-600',
      icon: 'add',
      action: 'Add New Supplier',
    },
    {
      name: 'View Supplier',
      link: '/supplier/get',
      bgColor: 'bg-green-500',
      hoverColor: 'bg-green-600',
      icon: 'view',
      action: 'View Supplier Info',
    },
  ];
  return (
    <>
      <DashboardLayout pageName={'Supplier Dashboard'} sections={supplierSections}/>
    </>
  )
}

export default SupplierDashboard