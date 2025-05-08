import { useContext } from "react";
import CategoryPreview from "../CategoryPreview";
import { StoreContext } from "../contexts/store-context";

export default function CategoriesPreview() {
  const { categories } = useContext(StoreContext);
  return (
    <>
      {Object.keys(categories).map((title) => {
        const products = categories[title];
        return (
          <CategoryPreview key={title} title={title} products={products} />
        );
      })}
    </>
  );
}