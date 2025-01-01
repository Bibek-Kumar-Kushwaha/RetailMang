import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../Utils/IsAdmin";

const PrintInvoice = () => {
    const navigate = useNavigate();
    const { isAuth } = useContext(AppContext);
    useEffect(() => {
        if (!isAuth) {
            navigate("/login");
        }
    }, [isAuth, navigate]);

    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [invoice, setInvoice] = useState(null);

    useEffect(() => {
        const fetchInvoice = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_BASE_URL}/invoice/print/${id}`,
                    {
                        withCredentials: true,
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }
                );
                setInvoice(response.data.data.invoice); // Set the invoice data
                setLoading(false);
            } catch (error) {
                console.error("Error fetching invoice:", error);
                setLoading(false);
            }
        };

        fetchInvoice();
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!invoice) {
        return <div>No invoice found</div>;
    }

    // Function to generate PDF
    const downloadPDF = () => {
        const doc = new jsPDF("p", "mm", "a4");

        // Add Header
        doc.setFontSize(16);
        doc.setFont("helvetica", "bold");
        doc.text("Bibek Kuamr Kushwaha", 105, 10, { align: "center" });
        doc.setFontSize(12);
        doc.setFont("helvetica", "normal");
        doc.text("Godaita-5, Sarlahi", 105, 16, { align: "center" });

        // Invoice Details
        doc.setFontSize(12);
        doc.text(`Name: ${invoice.name}`, 10, 30);
        doc.text(`Phone: ${invoice.phone}`, 10, 36);
        doc.text(`Address: ${invoice.address}`, 10, 42);

        doc.text(`Bill No: ${invoice.billNumber}`, 150, 30);
        doc.text(`Date: ${new Date(invoice.date).toLocaleDateString()}`, 150, 36);
        doc.text(`ID: ${invoice._id || "N/A"}`, 150, 42);

        // Add Table Header
        const headers = ["SN", "Product Name", "Quantity", "Rate", "Amount"];
        let y = 60;
        headers.forEach((header, i) => {
            const x = 10 + i * 35; // Adjust header spacing
            doc.setFont("helvetica", "bold");
            doc.text(header, x, y);
        });

        // Table Content
        invoice.products.forEach((product, index) => {
            y += 8;
            const row = [
                `${index + 1}`,
                product.productName,
                product.quantity.toString(),
                product.sellingPrice.toString(),
                product.amount.toString(),
            ];
            row.forEach((cell, i) => {
                const x = 10 + i * 35;
                doc.setFont("helvetica", "normal");
                doc.text(cell, x, y);
            });
        });

        // Summary Section
        y += 15;
        doc.setFont("helvetica", "bold");
        // doc.text("Summary", 10, y);

        const summary = [
            ["Grand Total", invoice.grandTotal || 0],
            ["Discount Amount", invoice.discountAmount || 0],
            ["Due Amount", invoice.oldCreditAmount || 0],
            ["Total Amount", (invoice.grandTotal || 0) - (invoice.discountAmount || 0) + (invoice.oldCreditAmount || 0)],
            ["Paid Amount", invoice.paidAmount || 0],
            ["Credit Amount", invoice.creditAmount || 0],
        ];

        summary.forEach(([label, value]) => {
            y += 8;
            doc.setFont("helvetica", "normal");
            doc.text(`${label}:`, 120, y);
            doc.text(`${value}`, 170, y, { align: "right" });
        });

        // Save the document
        doc.save(`${invoice.billNumber || "Invoice"}_invoice.pdf`);
    };

    const printInvoice = () => {
        const content = `
            <html>
            <head>
                <title>Invoice Print</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        margin: 20px;
                        color: #333;
                    }
                    .container {
                        padding: 20px;
                        border: 1px solid #ddd;
                        border-radius: 10px;
                        background-color: #f9f9f9;
                    }
                    .header {
                        text-align: center;
                        margin-bottom: 20px;
                    }
                    .header h1 {
                        font-size: 24px;
                        color: #000;
                        margin: 0;
                    }
                    .header h1 span {
                    color: #0000FF;
                    }
                    .header h2 {
                        font-size: 14px;
                        color: #2A9D8F;
                        margin: 5px 0;
                    }
                    .summary {
                        margin-top: 20px;
                        display: flex;
                        flex-direction: column;
                        align-items: flex-end;
                        background-color: #f1f1f1;
                        padding: 15px;
                        border-radius: 8px;
                    }
                    .summary div {
                        margin-bottom: 5px;
                        font-size: 14px;
                    }
                    .summary .total {
                        font-weight: bold;
                        font-size: 16px;
                        color: #4A47A3;
                    }
                    .table {
                        width: 100%;
                        border-collapse: collapse;
                        margin-top: 20px;
                    }
                    .table th, .table td {
                        padding: 10px;
                        border: 1px solid #ddd;
                        text-align: left;
                    }
                    .table th {
                        background-color: #4A47A3;
                        color: #fff;
                    }
                    .footer {
                        margin-top: 20px;
                        text-align: center;
                        font-size: 12px;
                        color: #777;
                    }
                        .invoice-details {
                      display: flex;
                      justify-content: space-between;
                      gap: 20px;
                    }
                    
                    .left-section {
                      flex: 1;
                      text-align: left;
                    }
                    
                    .right-section {
                      flex: 1;
                      text-align: right;
                    }
   
                    
                                    </style>
                                </head>
                                <body>
                                    <div class="container">
                                        <div class="header">
                                            <h1>Bibek <span class="color"> Kushwaha </span></h1>
                                            <h2>Godaita-5, Sarlahi</h2>
                                        </div>
                        
                    <div class="invoice-details">
                      <!-- Left Section -->
                      <div class="left-section">
                        <p><strong>Name:</strong> ${invoice.name}</p>
                        <p><strong>Phone:</strong> ${invoice.phone}</p>
                        <p><strong>Address:</strong> ${invoice.address}</p>
                      </div>
                      <!-- Right Section -->
                      <div class="right-section">
                        <p><strong>Bill No:</strong> ${invoice.billNumber}</p>
                        <p><strong>Date:</strong> ${new Date(invoice.date).toLocaleDateString()} </p>
                        <p><strong>ID:</strong> ${invoice._id}</p>
                      </div>
                     </div>
                
    
                    <table class="table">
                        <thead>
                            <tr>
                                <th>SN</th>
                                <th>Product Name</th>
                                <th>Quantity</th>
                                <th>Rate</th>
                                <th>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${invoice.products
                .map(
                    (product, index) => `
                                    <tr>
                                        <td>${product.SN}</td>
                                        <td>${product.productName}</td>
                                        <td>${product.quantity}</td>
                                        <td>${product.sellingPrice}</td>
                                        <td>${product.amount}</td>
                                    </tr>
                                `
                )
                .join("")}
                        </tbody>
                    </table>
    
                    <div class="summary">
                        <div>Grand Total: <span>${invoice.grandTotal || 0}</span></div>
                        <div>Discount Amount: <span>${invoice.discountAmount || 0}</span></div>
                        <div>Due Amount: <span>${invoice.oldCreditAmount || 0}</span></div>
                        <div>Total Amount: <span>${(invoice.grandTotal) - (invoice.paidAmount) + (invoice.oldCreditAmount) || 0}</span></div>
                         <div>Paid Amount: <span>${invoice.paidAmount || 0}</span></div>
                        <div class="total">Credit Amount: <span>${invoice.creditAmount || 0}</span></div>
                    </div>
    
                    <div class="footer">
                        "Your satisfaction is our priority."
                    </div>
                </div>
            </body>
            </html>
        `;

        const printWindow = window.open('', '', 'height=700,width=900');
        printWindow.document.write(content);
        printWindow.document.close();
        printWindow.print();
    };



    return (
        <div className="p-6 bg-gray-50 min-h-screen font-sans text-gray-700 capitalize">
            <div className="bg-white max-w-4xl mx-auto p-8 rounded-lg shadow-lg" id="invoice-content">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-extrabold text-gray-800">
                        Bibek <span className="text-blue-600">Kushwaha</span>
                    </h1>
                    <p className="text-sm text-gray-500">Godaita-5, Sarlahi</p>
                </div>

                {/* Invoice Details */}
                <div className="flex justify-between items-center mb-6">
                    <div className="text-sm">
                        <p className="font-semibold">Pan Number: <span className="text-gray-600">123456789</span></p>
                    </div>
                    <div className="text-gray-500 text-sm">
                        <span className="text-lg font-bold">LOGO</span>
                    </div>
                </div>

                <hr className="border-t border-gray-200 mb-6" />

                {/* Customer and Invoice Info */}
                <div className="flex justify-between gap-4 mb-6">
                    <div>
                        <p className="font-semibold">Name: <span className="text-gray-600">{invoice.name}</span></p>
                        <p className="font-semibold">Phone: <span className="text-gray-600">{invoice.phone}</span></p>
                        <p className="font-semibold">Address: <span className="text-gray-600">{invoice.address}</span></p>
                    </div>
                    <div>
                        <p className="font-semibold">Bill No: <span className="text-gray-600">{invoice.billNumber}</span></p>
                        <p className="font-semibold">Date: <span className="text-gray-600">{new Date(invoice.date).toLocaleDateString()}</span></p>
                        <p className="font-semibold">ID: <span className="text-gray-600">{invoice._id.slice(-5)}</span></p>
                    </div>
                </div>

                <hr className="border-t border-gray-200 mb-6" />

                {/* Invoice Title */}
                <div className="text-center text-2xl font-bold text-gray-800 mb-4">INVOICE</div>

                {/* Table Headers */}
                <div className="grid grid-cols-5 font-semibold text-gray-600 bg-gray-100 p-2 rounded-t-md">
                    <div>SN</div>
                    <div>Product Name</div>
                    <div>Quantity</div>
                    <div>Rate</div>
                    <div>Amount</div>
                </div>

                {/* Product List */}
                <div className="border border-gray-200 rounded-b-md overflow-hidden">
                    {invoice.products.map((product, index) => (
                        <div
                            key={product._id}
                            className="grid grid-cols-5 items-center p-2 border-b border-gray-200 last:border-b-0"
                        >
                            <div>{product.SN}</div>
                            <div>{product.productName}</div>
                            <div>{product.quantity}</div>
                            <div>{product.sellingPrice}</div>
                            <div>{product.amount}</div>
                        </div>
                    ))}
                </div>

                {/* Summary Section */}
                <div className="bg-gray-100 p-4 rounded-lg mt-6 max-w-xs
                 ml-auto">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-700 font-medium">Grand Total:</span>
                        <span className="font-semibold text-gray-800">{invoice.grandTotal || 0}</span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-700 font-medium">Discount Amount:</span>
                        <span className="font-semibold text-gray-800">{invoice.discountAmount || 0}</span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-700 font-medium">Due Amount:</span>
                        <span className="font-semibold text-gray-800">{invoice.oldCreditAmount || 0}</span>
                    </div>
                    <hr className='bg-black h-0.5' />
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-700 font-medium">Total Amount:</span>
                        <span className="font-semibold text-gray-800">{invoice.grandTotal - invoice.discountAmount + invoice.oldCreditAmount}</span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-700 font-medium">Paid Amount:</span>
                        <span className="font-semibold text-gray-800">{invoice.paidAmount || 0}</span>
                    </div>
                    <hr className='bg-black h-0.5' />
                    <div className="flex justify-between items-center mt-4">
                        <span className="text-gray-700 font-medium text-lg">Total Credit:</span>
                        <span className="font-bold text-xl text-blue-600">{invoice.creditAmount || 0}</span>
                    </div>
                </div>


                {/* Buttons */}
                <div className="flex justify-center mt-8 space-x-4">
                    <button
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                        onClick={printInvoice}
                    >
                        Print
                    </button>
                    <button
                        className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
                        onClick={downloadPDF}
                    >
                        Download PDF
                    </button>
                </div>
            </div>
        </div>
    );

};

export default PrintInvoice;
