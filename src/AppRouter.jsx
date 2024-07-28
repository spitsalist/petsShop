import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Categories from "./pages/Categories";
import Category from "./pages/Category";
import Product from "./pages/Product";
import Cart from "./components/Cart/Cart";
import NotFound from "./pages/NotFound";
import Sales from "./pages/Sales";
import ProductPage from "./pages/ProductPage";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="categories" element={<Categories />} />
          <Route path="categories/:categoryId" element={<Category />} />
          <Route path="products" element={<Product />} />
          <Route path="products/:productId" element={<ProductPage />} />
          <Route path="sales/all" element={<Sales />} />
          <Route path="cart" element={<Cart />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
