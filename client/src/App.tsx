import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Productitems from "./components/component/productitems";
import Productsingle from "./components/component/productsingle";
import { Cart } from './components/component/cart';
import { Login } from './components/component/login';
import { Signup } from './components/component/signup';
import Items from './components/component/items';
import SingleDia from './components/component/singleprod';
import Allplates from './components/component/plates';
import PlateSingle from './components/component/CVD_details';
import { DiamondFILTER } from './components/component/diamonds';
import Layout from './layout';
import Homepage from './components/component/homepage';
// import Layout from './components/Layout';

const Home: React.FC = () => {
  return (
    <Router>
      <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      </Routes>
      <Layout>
        <Routes>
          <Route path="/" element={<Homepage/>} />
          <Route path="/filter" element={<DiamondFILTER />} />
          <Route path="/diamonds" element={<Items />} />
          <Route path="/diamond/:productid" element={<SingleDia />} />
          <Route path="/cvd" element={<Allplates />} />
          <Route path="/plate/:plate_id" element={<PlateSingle />} />
          <Route path="/store" element={<Productitems />} />
          <Route path="/product/:product_id" element={<Productsingle />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default Home;
