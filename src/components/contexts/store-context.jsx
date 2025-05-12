import { createContext } from "react";

export const StoreContext = createContext({
    productInViewId: undefined,
    categories: {},
    cart: [],
    filterProducts: {},    
    setFiltered: () => {},
    addToCart : () => {},
    upShopStateUpdater : () => {} ,

    // updateQty: () => {},
    // subtractQty: () => {}
});
