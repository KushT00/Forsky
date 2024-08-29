import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Dashboard } from './components/component/dashboard';
import { Orders } from './components/component/orders';
import { Users } from './components/component/users';
import { Products } from './components/component/products';
import { Categories } from './components/component/categories';
import { Payments } from './components/component/payment';
import { Shipping } from './components/component/shipping';
// import { Filter2 } from './components/component/filter2';
import { Login } from './components/component/login';
import { Signup } from './components/component/signup';
// import ProtectedRoute from './ProtectedRoute';
import { Discounts } from './components/component/discounts';
import ProtectedRoute from './ProtectedRoute';

import Items from './components/component/items';
import SingleDia from './components/component/singleprod';
import { Test } from './components/component/test';
import Productitems from './components/component/productitems';
import Productsingle from './components/component/productsingle';
 // Assume you have a Home component
// kush
function App() {
  return (
    <Router>
      <Routes>
  
          <Route
            path="/dashboard"
            element={<ProtectedRoute element={<Dashboard />} allowedRoles={['admin']} />}
          />
          <Route
            path="/orders"
            element={<ProtectedRoute element={<Orders />} allowedRoles={['admin']} />}
          />
          <Route
            path="/users"
            element={<ProtectedRoute element={<Users />} allowedRoles={['admin']} />}
          />
          <Route
            path="/products"
            element={<ProtectedRoute element={<Products />} allowedRoles={['admin', 'staff']} />}
          />
          <Route
            path="/categories"
            element={<ProtectedRoute element={<Categories />} allowedRoles={['admin', 'staff']} />}
          />
          <Route
            path="/payments"
            element={<ProtectedRoute element={<Payments />} allowedRoles={['admin']} />}
          />
          <Route
            path="/shipping"
            element={<ProtectedRoute element={<Shipping />} allowedRoles={['admin']} />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/diamonds" element={<Items />} />
          <Route path="/diamond/:productid" element={<SingleDia/>} />
          <Route path="/filter" element={<Test/>} />
          <Route path="/store" element={<Productitems/>} />
          <Route path="/product/:product_id" element={<Productsingle/>} />
          <Route
            path="/discounts"
            element={<ProtectedRoute element={<Discounts />} allowedRoles={['admin']} />}
          />
          
        </Routes>
    </Router>
  );
}

export default App;
