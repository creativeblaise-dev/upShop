import { useContext, useImperativeHandle, useRef } from "react";
import { Link } from "react-router";
import { createPortal } from "react-dom";
import Button from "./Button";
import { StoreContext } from "./contexts/store-context";
import trashIcon from "../assets/img/trash.png";
import "../components/styles/cart.styles.scss";

export default function CartModal({ ref }) {
  const { cart, upShopStateUpdater } = useContext(StoreContext);

  const dialog = useRef(null);

  useImperativeHandle(
    ref,
    () => {
      return {
        open() {
          dialog.current.showModal();
        },
      };
    },
    []
  );

  function openCheckOutCloseModal() {
    dialog.current.close()
  }

  function addQuantity(id) {
    upShopStateUpdater({
      type: "INCREASE_QUANTITY",
      payload: id,
    });
  }

  function subtractQuantity(id) {
    upShopStateUpdater({
      type: "DECREASE_QUANTITY",
      payload: id,
    });
  }

  function removeCartItem(id) {
    upShopStateUpdater({
      type: "REMOVE_FROM_CART",
      payload: id,
    });

  }



    //  const filteredCart = cart.filter( item => {
    //     return item.id !== id
    //  });

    //  upShopStateUpdater( prev => {
    //     return {
    //         ...prev , cart: filteredCart
    //     }
    //  });
  

  let cartContent = (
    <section className="text-center py-5 px-40 mb-10">
      <h1 className="text-xl text-slate-200 font-bold">
        You have an empty cart!
      </h1>
      <p className="text-sm text-slate-300">Start adding some items</p>
    </section>
  );

  if (cart.length >= 1) {
    cartContent = (
      <section>
        <div className="cart-wrapper">
          {cart.map((product) => {
            return (
              <div
                key={product.id}
                id={product.id}
                className="flex cart-item bg-stone-700 gap-6 p-2 shadow mb-3 rounded-lg"
              >
                <div className="flex-1">
                  <img src={product.image} className="w-65" />
                </div>
                <div className="flex-3">
                  <div className="flex">
                    <h1 className="flex-3 font-extrabold mb-1">
                      {product.name}
                    </h1>
                    <Button
                      onClick={() => removeCartItem(product.id)}
                      classes="cursor-pointer px-1"
                    >
                      <img src={trashIcon} className="h-6" />
                    </Button>
                  </div>
                  <p className="text-sm mb-4 text-slate-400">
                    {product.category}
                  </p>
                  <p className="text-xs mb-4">Qty. {product.quantity}</p>

                  <div className="flex gap-4">
                    <p className="text-sm flex-2 font-bold">${product.price}</p>
                    <div className="flex flex-1 justify-end shadow">
                      <>
                        <Button
                          onClick={() => subtractQuantity(product.id)}
                          classes="cursor-pointer bg-amber-400 py-1 px-3.5 text-stone-600 font-bold rounded-l-2xl"
                        >
                          -
                        </Button>
                        <div className="py-1 px-3 bg-stone-400 ">
                          <p className="font-bold">
                            {cart.length >= 1 ? product.quantity : 0}
                          </p>
                        </div>
                        <Button
                          onClick={() => addQuantity(product.id)}
                          classes="cursor-pointer bg-amber-400 py-1 px-3 text-stone-600 font-bold rounded-r-2xl"
                        >
                          +
                        </Button>
                      </>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex justify-center mt-10">
          <Link
            onClick={openCheckOutCloseModal}
            className="text-slate-200 bg-stone-800 py-2 px-3 rounded-md cursor-pointer"
            to="/checkout"
          >
            Checkout
          </Link>
        </div>
      </section>
    );
  }

  return createPortal(
    <dialog className=" cart-modal" ref={dialog}>
      <div className="border-b-1 border-b-sky-200 mb-10 ">
        <h1 className="text-xl font-bold">Cart</h1>
        <p className="pt-2 pb-4">{cart.length} products</p>
      </div>
      {cartContent}

      <form method="dialog" className="mt-20">
        <Button classes="outline-1 outline-amber-300 py-1 px-3 cursor-pointer shadow">
          Close
        </Button>
      </form>
    </dialog>,
    document.getElementById("modal")
  );
}
