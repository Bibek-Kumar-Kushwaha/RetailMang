import React from 'react'
import DashboardLayout from '../../Layouts/DashboardLayout'

const ProductDashboard = () => {
  const productSections = [
    {
      name: 'Add Product',
      link: '/product/add',
      bgColor: 'bg-blue-500',
      hoverColor: 'bg-blue-600',
      icon: 'add',
      action: 'Add New Product',
    },
    {
      name: 'View Product',
      link: '/product/get',
      bgColor: 'bg-green-500',
      hoverColor: 'bg-green-600',
      icon: 'view',
      action: 'View Product Info',
    },
  ];
  return (
    <>
    <DashboardLayout pageName={'Product Dashboard'} sections={productSections}/>
    </>
  )
}

export default ProductDashboard