import React from 'react'
import DashboardLayout from '../../Layouts/DashboardLayout'

const CategoryDashboard = () => {
  const categorySections = [
    {
      name: 'Add Category',
      link: '/category/add',
      bgColor: 'bg-blue-500',
      hoverColor: 'bg-blue-600',
      icon: 'add',
      action: 'Add New Category',
    },
    {
      name: 'View Category',
      link: '/category/get',
      bgColor: 'bg-green-500',
      hoverColor: 'bg-green-600',
      icon: 'view',
      action: 'View Category Info',
    },
  ];
  return (
    <>
      <DashboardLayout pageName="Category Dashboard" sections={categorySections} />
    </>
  )
}

export default CategoryDashboard