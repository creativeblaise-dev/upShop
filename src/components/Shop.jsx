
import {Routes, Route} from "react-router";
import CategoriesPreview from "./routes/CategoriesPreview";
import Category from "./routes/Category";
import Product from "./Product";
import { StoreContext } from "./contexts/store-context";

export default function Shop() {
  
  return (
    <Routes>
        <Route index element={<CategoriesPreview />} />
          <Route path=":category" element={<Category />} />
            <Route path=":category/:product" element={<Product />} />
    </Routes>
  );
}
