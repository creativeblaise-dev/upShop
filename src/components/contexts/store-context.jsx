import { createContext } from "react";

export const StoreContext = createContext({
    productInViewId: undefined,
    categories: {},
    products: [],
    cart: [],
    filterCategories: [],    
    setFiltered: () => {},
    addToCart : () => {},
    upShopStateUpdater : () => {} ,

    // updateQty: () => {},
    // subtractQty: () => {}
});
