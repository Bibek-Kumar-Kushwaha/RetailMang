import { createBrowserRouter } from "react-router-dom";

import App from '../App';
import Login from "../Components/Admin/Login";
import Register from "../Components/Admin/Register";
import AdminUpdate from "../Components/Admin/AdminUpdate";
import GetAdmin from "../Components/Admin/GetAdmin";
import AdminDashboard from "../Components/Admin/AdminDashboard";
import AddCategory from "../Components/Category/AddCategory";
import UpdateCategory from "../Components/Category/UpdateCategory";
import DeleteCategory from "../Components/Category/DeleteCategory";
import GetCategory from "../Components/Category/GetCategory";
import CategoryDashboard from "../Components/Category/CategoryDashboard";
import Footer from "../Components/Common/Footer";
import Header from "../Components/Common/Header";
import Nopage from "../Components/Common/Nopage";
import CreditDashboard from "../Components/Credit/CreditDashboard";
import GetCredit from "../Components/Credit/GetCredit";
import AddCustomer from "../Components/Customer/AddCustomer";
import UpdateCustomer from "../Components/Customer/UpdateCustomer";
import DeleteCustomer from "../Components/Customer/DeleteCustomer";
import GetCustomer from "../Components/Customer/GetCustomer";
import CustomerDashboard from "../Components/Customer/CustomerDashboard";
import Dashboard from "../Components/Dashboard/Dashboard";
import AddDiscount from "../Components/Discount/AddDiscount";
import UpdateDiscount from "../Components/Discount/UpdateDiscount";
import DeleteDiscount from "../Components/Discount/DeleteDiscount";
import GetDiscount from "../Components/Discount/GetDiscount";
import DiscountDashboard from "../Components/Discount/DiscountDashboard";
import UpdateEmployee from "../Components/Employee/UpdateEmployee";
import GetEmployee from "../Components/Employee/GetEmployee";
import CreateInvoice from "../Components/Invoice/CreateInvoice";
import GetInvoice from "../Components/Invoice/GetInvoice";
import InvoiceDashboard from "../Components/Invoice/InvoiceDashboard";
import AddProduct from "../Components/Product/AddProduct";
import UpdateProduct from "../Components/Product/UpdateProduct";
import DeleteProduct from "../Components/Product/DeleteProduct";
import GetProduct from "../Components/Product/GetProduct";
import ProductDashboard from "../Components/Product/ProductDashboard";
import AddSupplier from "../Components/Supplier/AddSupplier";
import UpdateSupplier from "../Components/Supplier/UpdateSupplier";
import DeleteSupplier from "../Components/Supplier/DeleteSupplier";
import GetSupplier from "../Components/Supplier/GetSupplier";
import SupplierDashboard from "../Components/Supplier/SupplierDashboard";
import EmployeeDashboard from "../Components/Employee/EmployeeDashboard";
import AdminProfile from "../Components/Admin/AdminProfile";
import PrintInvoice from "../Components/Invoice/PrintInvoice";
import ViewCustomer from "../Components/Customer/ViewCustomer";
import ViewProduct from "../Components/Product/ViewProduct";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [

      // Main Dashboard
      {
        path: '/',
        element: <Dashboard />
      },
      //for  Admin
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Register />
      },
      {
        path: "admin/update/:id",
        element: <AdminUpdate />
      },
      {
        path: "admin/get",
        element: <GetAdmin />
      },
      {
        path: "admin/dashboard",
        element: <AdminDashboard />
      },
      {
        path: "admin/profile",
        element: <AdminProfile />
      },

      // for Category
      {
        path: "category/add",
        element: <AddCategory />,
      },
      {
        path: "category/update/:id",
        element: <UpdateCategory />
      },
      {
        path: "category/delete",
        element: <DeleteCategory />
      },
      {
        path: "category/get",
        element: <GetCategory />
      },
      {
        path: "category/dashboard",
        element: <CategoryDashboard />
      },

      // For Common
      {
        path: 'footer',
        element: <Footer />
      },
      {
        path: 'header',
        element: <Header />
      },
      {
        path: '*',
        element: <Nopage />
      },

      // For Credit
      {
        path: 'credit/dashboard',
        element: <CreditDashboard />
      },
      {
        path: 'credit/get',
        element: <GetCredit />
      },

      // for Customer
      {
        path: 'customer/add',
        element: <AddCustomer />
      },
      {
        path: 'customer/update/:id',
        element: <UpdateCustomer />
      },
      {
        path: 'customer/delete',
        element: <DeleteCustomer />,
      },
      {
        path: 'customer/get',
        element: <GetCustomer />
      },
      {
        path: 'customer/dashboard',
        element: <CustomerDashboard />
      },
      {
        path: 'customer/view/:id',
        element: <ViewCustomer/>
      },


      // For Discount
      {
        path: 'discount/add',
        element: <AddDiscount />
      },
      {
        path: 'discount/update/:id',
        element: <UpdateDiscount />
      },
      {
        path: 'discount/delete',
        element: <DeleteDiscount />,
      },
      {
        path: 'discount/get',
        element: <GetDiscount />
      },
      {
        path: 'discount/dashboard',
        element: <DiscountDashboard />
      },

      // For Employee
      {
        path: 'employee/update/:id',
        element: <UpdateEmployee />
      },
      {
        path: 'employee/get',
        element: <GetEmployee />
      },
      {
        path: 'employee/dashboard',
        element: <EmployeeDashboard />
      },

      // For Invoice
      {
        path: '/invoice/create',
        element: <CreateInvoice />
      },
      {
        path: 'invoice/get',
        element: <GetInvoice />
      },
      {
        path: 'invoice/dashboard',
        element: <InvoiceDashboard />
      },
      {
        path: 'invoice/print/:id',
        element: <PrintInvoice />
      },

      // for Product
      {
        path: 'product/add',
        element: <AddProduct />
      },
      {
        path: 'product/update/:id',
        element: <UpdateProduct />
      },
      {
        path: 'product/delete',
        element: <DeleteProduct />,
      },
      {
        path: 'product/get',
        element: <GetProduct />
      },
      {
        path: 'product/dashboard',
        element: <ProductDashboard />
      },
      {
        path: 'product/view/:id',
        element: <ViewProduct />
      },

      // for Supplier
      {
        path: 'supplier/add',
        element: <AddSupplier />
      },
      {
        path: 'supplier/update/:id',
        element: <UpdateSupplier />
      },
      {
        path: 'supplier/delete',
        element: <DeleteSupplier />,
      },
      {
        path: 'supplier/get',
        element: <GetSupplier />
      },
      {
        path: 'supplier/dashboard',
        element: <SupplierDashboard />
      },
    ],

  },
]);
export default router;