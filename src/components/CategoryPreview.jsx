import { useContext, useRef } from "react";
import { Link } from "react-router";
import { StoreContext } from "./contexts/store-context";
import Button from "./Button";
import CartModal from "./CartModal";
// import ProductDisplayModal from "./ProductDisplayModal";
import Card from "./Card";

export default function CategoryPreview({ title, products }) {
  const { cart, addToCart, upShopStateUpdater } = useContext(StoreContext);

  const dialog = useRef();
  // const productDialog = useRef();

  function openCart() {
    dialog.current.open();
  }

  function handleProductView(id) {
    upShopStateUpdater({
      type: "VIEW_PRODUCT",
      payload: id,
    });

    // productDialog.current.open();
  }

  return (
    <>
      <CartModal ref={dialog} />
      {/* <ProductDisplayModal ref={productDialog}/> */}

      <div key={title} className="category-section p-6">
        <h1 className="text-lg font-bold text-stone-800 cursor-pointer'>">
          <Link to={`/shop/${title}`} >{title.toUpperCase()}</Link>	
        </h1>
        <main className=" p-4 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-4">
          {products
            .filter((_, index) => index < 4)
            .map((product) => {

              const productExistsInCart = cart.find(
                (item) => item.id === product.id
              );

              const cartButton = (
                <Button
                  onClick={() =>
                    productExistsInCart ? openCart() : addToCart(product)
                  }
                  classes={
                    productExistsInCart
                      ? "text-md text-slate-200 text-xs cursor-pointer bg-gray-400 rounded-lg py-2 px-3"
                      : "text-md text-slate-200 text-xs cursor-pointer bg-stone-800 rounded-lg py-2 px-3"
                  }
                >
                  {productExistsInCart ? "Go to Cart" : "Add to Cart"}
                </Button>
              );
              return (
                <Card
                  id={product.id}
                  cartbtn={cartButton}
                  product={product}
                  viewProduct={handleProductView}
                  key={product.id}
                  category={title}
                />
              );
            })}
        </main>
      </div>
    </>
  );
}
