import React from 'react';
import { Link } from 'react-router-dom';
import { PlusIcon, PencilIcon, TrashIcon, EyeIcon, UserIcon } from '@heroicons/react/24/solid';

const DashboardLayout = ({ pageName, sections }) => {
  const icons = {
    add: <PlusIcon className="w-5 h-5 mr-2" />,
    update: <PencilIcon className="w-5 h-5 mr-2" />,
    view: <EyeIcon className="w-5 h-5 mr-2" />,
    delete: <TrashIcon className="w-5 h-5 mr-2" />,
    user: <UserIcon className="w-5 h-5 mr-2" />
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6 font-semibold capitalize">
      <h1 className="text-4xl font-bold text-center mb-6 text-purple-600">{pageName}</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {sections.map((section, index) => (
          <div key={index} className="bg-white p-4 rounded-md shadow-md text-center">
            <h2 className="text-xl font-semibold mb-4">{section.name}</h2>
            <Link
              to={section.link}
              className={`flex items-center justify-center text-white ${section.bgColor} hover:${section.hoverColor} px-4 py-2 rounded-md transition-colors`}
            >
              {icons[section.icon]}
              {section.action}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardLayout;
