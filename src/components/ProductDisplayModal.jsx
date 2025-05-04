import { useContext,useRef, useImperativeHandle} from "react";
import { createPortal } from "react-dom";
import { StoreContext } from "./contexts/store-context";
import {useNavigate} from "react-router";
import Button from "./Button";
import '../components/styles/cart.styles.scss'

export default function ProductDisplayModal({ref}) {

  const navigate = useNavigate();

  const goToCheckOutHandler = () => {
      navigate('/checkout');
  }

const productDialog = useRef(null);

const {categories, productInViewId, cart, addToCart} = useContext(StoreContext)

const inCart = cart.filter(item => item.id === productInViewId);
  
const selectedProduct = categories.find(product => product.id === productInViewId);


  useImperativeHandle(
    ref,
    () => {
      return {
        open() {
            productDialog.current.showModal();
        },
      };
    },
    []
  );
  
 
  return createPortal(
    <dialog className=" cart-modal" ref={productDialog}>
      <main className="py-6 px-5">
              <header className="mb-6">
              <form method="dialog" className="flex">
              <Button classes="bg-slate-800 px-2 py-1 rounded cursor-pointer ">
                      Back to Shop
                  </Button>
              </form>
              </header>
                      return  <section className="flex gap-10" key={selectedProduct.id}> 
                      <div className="flex-2">
                          <img src={selectedProduct.image} className="rounded-xl"/>
                      </div>
                      <div className="flex-2">
                          <h1 className="font-bold text-4xl text-stone-200 mb-6">{selectedProduct.name}</h1>
                          <p className="font-medium text-lg text-stone-300 mb-2">${selectedProduct.price}</p>
                          <p className="text-sm text-slate-300">{selectedProduct.category}</p>
                          <p className="text-sm mt-2 text-slate-400">Item Code: {selectedProduct.id}</p>
                          <p className="text-sm text-stone-300 mt-6 mb-10">{selectedProduct.details}</p>
                         
                          { inCart.length >= 1 ?
                            <Button  onClick={goToCheckOutHandler} classes=" font-bold block w-full bg-slate-700 border-2 border-slate-300 py-2 px-4 cursor-pointer">
                            CheckOut
                          </Button> :
                          <Button onClick={() => addToCart(selectedProduct) } classes="font-bold block w-full bg-slate-700 border-2 border-slate-300 py-2 px-4 cursor-pointer">
                            Add to Cart
                          </Button>
                          }
                          
                      </div>
                      <div> 
                        
                      </div>
                      </section>
              </main>
    

      <form method="dialog" className="mt-20">
        <Button classes="outline-1 outline-amber-300 py-1 px-3 cursor-pointer shadow">
          Close
        </Button>
      </form>
    </dialog>,
    document.getElementById("product-modal")
  );
}
