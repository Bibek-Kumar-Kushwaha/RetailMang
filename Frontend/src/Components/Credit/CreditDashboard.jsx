import React from 'react'
import DashboardLayout from '../../Layouts/DashboardLayout'

const CreditDashboard = () => {
  const creditSections = [
    // {
    //   name: 'Add Credit',
    //   link: '/credit/add',
    //   bgColor: 'bg-blue-500',
    //   hoverColor: 'bg-blue-600',
    //   icon: 'add',
    //   action: 'Add New Credit',
    // },
    // {
    //   name: 'Update Credit',
    //   link: '/credit/update',
    //   bgColor: 'bg-yellow-500',
    //   hoverColor: 'bg-yellow-600',
    //   icon: 'update',
    //   action: 'Update Credit Info',
    // },
    {
      name: 'View Credit',
      link: '/credit/get',
      bgColor: 'bg-green-500',
      hoverColor: 'bg-green-600',
      icon: 'view',
      action: 'View Credit Info',
    },
    // {
    //   name: 'Delete Credit',
    //   link: '/credit/delete',
    //   bgColor: 'bg-red-500',
    //   hoverColor: 'bg-red-600',
    //   icon: 'delete',
    //   action: 'Delete Credit',
    // },
  ];
  return (
    <>
      <DashboardLayout pageName={'Credit Dashboard'} sections={creditSections} />
    </>
  )
}

export default CreditDashboard