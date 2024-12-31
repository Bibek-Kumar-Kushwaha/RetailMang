import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { AppContext } from "../../Utils/IsAdmin";


const GetInvoice = () => {
  const navigate = useNavigate();
  const { isAuth } = useContext(AppContext);

  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  }, [isAuth, navigate]);

  const [loading, setLoading] = useState(true);
  const [invoice, setInvoice] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/invoice/get/all`,
          {
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        setInvoice(response.data.data.allInvoice); // Update state with fetched invoice data
        setLoading(false);
      } catch (error) {
        console.error("Error fetching invoice:", error);
        setLoading(false);
      }
    };

    fetchInvoice();
  }, []);

  // Filter invoices based on searchTerm (name or phone)
  const filteredInvoices = invoice.filter((inv) => {
    return (
      inv.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inv.phone.includes(searchTerm) || 
      inv.billNumber.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="p-6 bg-gray-50 min-h-screen font-semibold capitalize">
      <h1 className="text-3xl font-extrabold text-center mb-8 text-purple-700">Invoice List</h1>

      {/* Search Bar */}
      <div className="mb-6 flex justify-center">
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="Search by name or phone or BillNumber ..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {loading ? (
        <p className="text-center text-gray-600">Loading invoices...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredInvoices?.map((invoice) => (
            <div
              key={invoice._id}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all"
            >
              <div className="mb-4">
                <h2 className="text-2xl font-semibold text-blue-600">{invoice.name}</h2>
                <p className="text-gray-500">{invoice.phone}</p>
                <p className="text-gray-500">{invoice.address}</p>
              </div>
              <div className="mb-4">
                <div className="text-gray-600">Bill No: <span className="font-semibold">{invoice.billNumber}</span></div>
                <div className="text-gray-600">Date: <span className="font-semibold">{new Date(invoice.date).toLocaleDateString()}</span></div>
                <div className="text-gray-600">Paid Amount: <span className="font-semibold text-green-600">{invoice.paidAmount}</span></div>
                <div className="text-gray-600">Total Amount: <span className="font-semibold text-red-600">{invoice.grandTotal}</span></div>
              </div>
              <div className="border-t border-gray-200 mt-4 pt-4">
                <h3 className="font-semibold text-gray-800 mb-2">Products</h3>
                {invoice.products.map((product) => (
                  <div key={product._id} className="flex justify-between mb-2">
                    <span>{product.productName}</span>
                    <span className="text-gray-600">{product.quantity} x {product.sellingPrice}</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-between items-center mt-6">
                <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-all">
                  View Details
                </button>
                <Link
                  to={`/invoice/print/${invoice._id}`}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-all"
                >
                  Print
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GetInvoice;
