import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
// import Product from './../pages/Product';

const Layout = () => {
  return (
    <div>
      <Header />
      <main  >
        <Outlet />
        {/* <Product /> */}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;