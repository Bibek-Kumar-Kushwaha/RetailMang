import React from 'react'
import DashboardLayout from '../../Layouts/DashboardLayout'

const EmployeeDashboard = () => {
  const employeeSections = [
    // {
    //   name: 'Add Employee',
    //   link: '/employee/add',
    //   bgColor: 'bg-blue-500',
    //   hoverColor: 'bg-blue-600',
    //   icon: 'add',
    //   action: 'Add New Employee',
    // },
    // {
    //   name: 'Update Employee',
    //   link: '/employee/update',
    //   bgColor: 'bg-yellow-500',
    //   hoverColor: 'bg-yellow-600',
    //   icon: 'update',
    //   action: 'Update Employee Info',
    // },
    {
      name: 'View Employee',
      link: '/employee/get',
      bgColor: 'bg-green-500',
      hoverColor: 'bg-green-600',
      icon: 'view',
      action: 'View Employee Info',
    },
    // {
    //   name: 'Delete Employee',
    //   link: '/employee/delete',
    //   bgColor: 'bg-red-500',
    //   hoverColor: 'bg-red-600',
    //   icon: 'delete',
    //   action: 'Delete Employee',
    // },
  ];
  return (
    <>
    <DashboardLayout pageName={'Employee Dashboard'} sections={employeeSections}/>
    </>
  )
}

export default EmployeeDashboard