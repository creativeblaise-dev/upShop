
import {useState, useContext , useEffect, useRef} from "react";
import { useParams } from "react-router";
import { StoreContext } from "../contexts/store-context";
import Card from "../Card";
import CartModal from "../CartModal";
import Button from "../Button";

const Category = () => {
const {categories, upShopStateUpdater, cart, addToCart} = useContext(StoreContext);
const {category} = useParams();
const [products, setProducts] = useState(categories[category]);

 const dialog = useRef();
  const productDialog = useRef();

  function openCart() {
    dialog.current.open();
  }

  function handleProductView(id) {
    upShopStateUpdater({
      type: "VIEW_PRODUCT",
      payload: id,
    });

    productDialog.current.open();
  }
     
  

useEffect(() => {
    setProducts(categories[category])
}, [categories, category]);


    return(
        <div>
         <CartModal ref={dialog} />
         <main className=" p-4 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-4">
            {products && products.map((product) => {
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
             return <Card
                    id={product.id}
                    cartbtn={cartButton}
                    product={product}
                    viewProduct={handleProductView}
                    key={product.id}
                />
            })}
        </main>
        </div>
    )
}



export default Category