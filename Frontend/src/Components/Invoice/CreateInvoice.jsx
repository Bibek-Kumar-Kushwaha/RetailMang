import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { AppContext } from "../../Utils/IsAdmin";

const CreateInvoice = () => {
  const navigate = useNavigate();
  const { isAuth } = useContext(AppContext);

  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  }, [isAuth, navigate]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [productsList, setProductsList] = useState([]);
  const [discountList, setDiscountList] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    discountName: "",
    paidAmount: 0,
    products: [{ productName: "", quantity: 1, sellingPrice: 0, amount: 0 }],
  });

  // Fetch initial data
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [customerRes, productRes, discountRes] = await Promise.all([
          axios.get(`${import.meta.env.VITE_BASE_URL}/user/get/all`, { withCredentials: true }),
          axios.get(`${import.meta.env.VITE_BASE_URL}/product/get/all`, { withCredentials: true }),
          axios.get(`${import.meta.env.VITE_BASE_URL}/discount/get/all`, { withCredentials: true }),
        ]);

        setCustomers(customerRes.data.data.allUser);
        setProductsList(productRes.data.data.allProduct);
        setDiscountList(discountRes.data.data.allDiscount);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to fetch initial data.");
      }
    };

    fetchInitialData();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle Customer Change
  const handleCustomerChange = (value) => {
    // Find customer by name or phone number
    const customer = customers.find(
      (customer) =>
        customer.name.toLowerCase() === value.toLowerCase() ||
        customer.address.toLowerCase() === value.toLowerCase() ||
        customer.phone === value
    );

    // Set selected customer
    if (customer) setSelectedCustomer(customer);
    else setSelectedCustomer(null);
  };



  // handle Product Change
  const handleProductChange = (index, e) => {
    const { name, value } = e.target;
    const updatedProducts = [...formData.products];

    if (name === "productName") {
      // Find the selected product from productsList
      const product = productsList.find((p) => p.productName === value);
      if (product) {
        // Update product details: name, rate, quantity, and amount
        updatedProducts[index] = {
          ...updatedProducts[index],
          productName: product.productName,
          rate: product.sellingPrice,
          quantity: 1,  // Reset quantity to 1 when a new product is selected
          amount: product.sellingPrice, // Set amount based on rate and quantity
        };
      }
    } else {
      // Update other fields (quantity, rate, amount)
      updatedProducts[index] = {
        ...updatedProducts[index],
        [name]: name === "quantity" || name === "rate" ? Number(value) : value
      };

      // Recalculate the amount when quantity or rate changes
      updatedProducts[index].amount = updatedProducts[index].quantity * updatedProducts[index].rate;
    }

    setFormData({ ...formData, products: updatedProducts });
  };

  // add button
  const handleAddProduct = () => {
    setFormData({
      ...formData,
      products: [
        ...formData.products,
        { productName: "", quantity: 1, rate: 0, amount: 0 }
      ]
    });
  };

  // remove button
  const handleRemoveProduct = (index) => {
    const updatedProducts = formData.products.filter((_, i) => i !== index);
    setFormData({ ...formData, products: updatedProducts });
  };


  // Submit the form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Validate form data
    if (!formData.name) {
      toast.error("Please select a customer.");
      setLoading(false);
      return;
    }


    const paidAmount = parseFloat(formData.paidAmount);
    if (isNaN(paidAmount) || paidAmount <= 0) {
      toast.error("Please provide a valid Paid Amount.");
      setLoading(false);
      return;
    }

    if (formData.products.some((p) => !p.productName || !p.quantity)) {
      toast.error("Please fill in all product details.");
      setLoading(false);
      return;
    }

    const invoiceData = {
      name: formData.name,
      paidAmount,
      discountName: formData.discountName,
      products: formData.products.map((product) => ({
        productName: product.productName,
        quantity: parseInt(product.quantity, 10),
        sellingPrice: parseFloat(product.sellingPrice) || 0,
        amount: parseFloat(product.amount) || 0,
      })),
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/invoice/create`,
        invoiceData,
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      toast.success("Invoice created successfully!");
      setFormData({
        name: "",
        discountName: "",
        paidAmount: 0,
        products: [{ productName: "", quantity: 1, sellingPrice: 0, amount: 0 }],
      });
    } catch (error) {
      console.error("API Error:", error.response ? error.response.data : error.message);
      toast.error(error.response?.data?.message || "Failed to create invoice.");
      setError(error.response?.data?.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-100 font-semibold capitalize">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold">Bibek Kumar Kushwaha</h1>
        <h2 className="text-lg">Godaita-5, Sarlahi</h2>
      </div>

      {/* Company Info */}
      <div className="flex justify-between mb-4">
        <div className="text-gray-600">Pan Number: SAMPLE</div>
        <div className="text-gray-600">LOGO</div>
      </div>
      <hr className="h-1 bg-red-700 mb-4" />

      {/* Customer and Bill Info */}
      <div className="flex justify-between mb-4">
        <div>
          <div>Name: {selectedCustomer?.name || "N/A"}</div>
          <div>Phone: {selectedCustomer?.phone || "N/A"}</div>
          <div>Address: {selectedCustomer?.address || "N/A"}</div>
        </div>
        <div>
          <div>Bill No: Auto Generate</div>
          <div>Date: {new Date().toLocaleDateString()}</div>
          <div>ID: {selectedCustomer?._id.slice(10) || "N/A"}</div>
        </div>
      </div>
      <hr className="h-1 bg-red-700 mb-4" />

      {/* form start */}
      <form onSubmit={handleSubmit}>
        <h2 className="text-3xl font-extrabold text-purple-600 mb-6 text-center">Create Invoice</h2>

        {error && <p className="text-red-500 text-lg mb-4">{error}</p>}

        <div className="mb-4">
          <label className="block text-gray-700">Customer Name or Phone</label>
          <input
            type="text"
            list="customer-list"
            name="name"
            value={formData.name}
            onChange={(e) => {
              handleCustomerChange(e.target.value);
              handleChange(e); // Update form state if needed
            }}
            className="w-full px-4 py-2 border rounded-md"
          />
          <datalist id="customer-list">
            {customers.map((customer) => (
              <option key={customer.id} value={customer.name}>
                ({customer.address}) ({customer.phone})
              </option>
            ))}
          </datalist>
        </div>

        {/* for mobile  */}
        <div className="space-y-6 lg:hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {formData.products.map((product, index) => (
              <div key={index} className="border p-4 rounded-md shadow-md space-y-4">

                {/* Product Name */}
                <div className="mb-4">
                  <label className="block text-gray-700">Product Name</label>
                  <select
                    name="productName"
                    value={product.productName}
                    onChange={(e) => handleProductChange(index, e)}
                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Product</option>
                    {productsList.map((prod) => (
                      <option key={prod.id} value={prod.productName}>
                        {prod.productName}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Quantity */}
                <div className="mb-4">
                  <label className="block text-gray-700">Quantity</label>
                  <input
                    type="number"
                    name="quantity"
                    value={product.quantity}
                    onChange={(e) => handleProductChange(index, e)}
                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Selling Price */}
                <div className="mb-4">
                  <label className="block text-gray-700">Selling Price</label>
                  <input
                    type="number"
                    name="sellingPrice"
                    value={product.rate}
                    onChange={(e) => handleProductChange(index, e)}
                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Amount */}
                <div className="mb-4">
                  <label className="block text-gray-700">Amount</label>
                  <input
                    type="number"
                    name="amount"
                    value={product.amount}
                    onChange={(e) => handleProductChange(index, e)}
                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                    readOnly
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex justify-between items-center">
                  <button
                    type="button"
                    onClick={() => handleRemoveProduct(index)}
                    className="text-gray-200 hover:text-gray-800 bg-red-600 font-bold p-2 rounded-md"
                  >
                    Remove
                  </button>
                  <button
                    type="button"
                    onClick={() => handleAddProduct()}
                    className="text-gray-200 hover:text-gray-800 bg-green-600 font-bold p-2 rounded-md"
                  >
                    Add Product
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="space-y-6 hidden lg:block">
          <div className="overflow-x-auto">
            <div className="min-w-full inline-block align-middle">
              <div className="overflow-hidden shadow-md border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full table-auto">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Product Name</th>
                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Quantity</th>
                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Selling Price</th>
                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Amount</th>
                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {formData.products.map((product, index) => (
                      <tr key={index} className="border-b">
                        {/* Product Name */}
                        <td className="px-4 py-2">
                          <select
                            name="productName"
                            value={product.productName}
                            onChange={(e) => handleProductChange(index, e)}
                            className="w-full px-4 py-2 border rounded-md"
                          >
                            <option value="">Select Product</option>
                            {productsList.map((prod) => (
                              <option key={prod.id} value={prod.productName}>
                                {prod.productName}
                              </option>
                            ))}
                          </select>
                        </td>

                        {/* Quantity */}
                        <td className="px-4 py-2">
                          <input
                            type="number"
                            name="quantity"
                            value={product.quantity}
                            onChange={(e) => handleProductChange(index, e)}
                            className="remove-arrow w-full px-4 py-2 border rounded-md"
                          />
                        </td>

                        {/* Selling Price */}
                        <td className="px-4 py-2">
                          <input
                            type="number"
                            name="sellingPrice"
                            value={product.rate}
                            onChange={(e) => handleProductChange(index, e)}
                            className="remove-arrow w-full px-4 py-2 border rounded-md"
                            readOnly
                          />
                        </td>

                        {/* Amount */}
                        <td className="px-4 py-2">
                          <input
                            type="number"
                            name="amount"
                            value={product.amount}
                            onChange={(e) => handleProductChange(index, e)}
                            className="remove-arrow w-full px-4 py-2 border rounded-md"
                            readOnly
                          />
                        </td>

                        {/* Actions (Add/Remove) */}
                        <td className="px-4 py-2 flex justify-between space-x-2">
                          <button
                            type="button"
                            onClick={() => handleRemoveProduct(index)}
                            className="text-red-600 hover:text-red-800 text-sm"
                          >
                            Remove
                          </button>
                          <button
                            type="button"
                            onClick={() => handleAddProduct()}
                            className="text-green-600 hover:text-green-800 text-sm"
                          >
                            Add Product
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Add Another Product Button */}
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleAddProduct}
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none"
            >
              Add Another Product
            </button>
          </div>
        </div>

        <div className="top-1 my-4">
          <div className="mb-4">
            <label className="block text-gray-700">Paid Amount</label>
            <input
              min={0}
              type="number"
              name="paidAmount"
              value={formData.paidAmount}
              onChange={handleChange}
              className="remove-arrow w-full px-4 py-2 border rounded-md appearance-none focus:outline-none"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Discount</label>
            <select
              name="discountName"
              value={formData.discountName}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md"
            >
              <option value="">Select Discount</option>
              {discountList.map((discount) => (
                <option key={discount.id} value={discount.discountName}>
                  {discount.discountName} ({discount.percentage}%)
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="my-2 w-full px-6 py-3 text-white font-semibold rounded-lg bg-purple-600"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Invoice"}
        </button>
      </form>
      <Toaster />
    </div>
  );
};

export default CreateInvoice;
