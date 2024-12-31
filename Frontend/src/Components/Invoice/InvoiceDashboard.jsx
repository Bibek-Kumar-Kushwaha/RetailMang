import React from 'react'
import DashboardLayout from '../../Layouts/DashboardLayout'

const InvoiceDashboard = () => {
  const invoiceSections = [
    {
      name: 'Create Invoice',
      link: '/invoice/create',
      bgColor: 'bg-blue-500',
      hoverColor: 'bg-blue-600',
      icon: 'add',
      action: 'Add New Invoice',
    },
    {
      name: 'View Invoice',
      link: '/invoice/get',
      bgColor: 'bg-green-500',
      hoverColor: 'bg-green-600',
      icon: 'view',
      action: 'View Invoice Info',
    }
  ];
  return (
    <>
    <DashboardLayout pageName={'Invoice Dashboard'} sections={invoiceSections}/>
    </>
  )
}

export default InvoiceDashboard