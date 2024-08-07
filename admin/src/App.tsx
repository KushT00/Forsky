import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Dashboard } from './components/component/dashboard';
import { Orders } from './components/component/orders';
import { Users } from './components/component/users';
import { Products } from './components/component/products';
import { Categories } from './components/component/categories';
import { Payments } from './components/component/payment';
import { Shipping } from './components/component/shipping';
import { Reports } from './components/component/reports';
 // Assume you have a Home component
// kush
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={"Hello"} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/users" element={<Users />} />
        <Route path="/products" element={<Products />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/payments" element={<Payments />} />
        <Route path="/shipping" element={<Shipping />} />
        <Route path="/reports" element={<Reports />} />
        
      </Routes>
    </Router>
  );
}

export default App;
