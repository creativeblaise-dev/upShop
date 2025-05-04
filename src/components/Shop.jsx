import {Routes, Route} from "react-router";
import CategoriesPreview from "./routes/CategoriesPreview";
import Category from "./routes/Category";

export default function Shop() {

  return (
    <Routes>
        <Route index element={<CategoriesPreview />} />
        <Route path=":category" element={<Category />} />
    </Routes>
  );
}
