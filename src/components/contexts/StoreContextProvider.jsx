import { useReducer, useState, useEffect} from "react";
import {getCategoriesAndDoc} from "../../utils/firebase/firebase.utils"
import shopList from "../../shopList";
import { StoreContext } from "./store-context";

function shopAppReducer(state, action){
    if(action.type === 'ADD_ITEM'){
        const updatedShop = {...state};
        const existingItemIndex = updatedShop.cart.findIndex( (item) => item.id === action.payload.id);
        const existingItem = updatedShop.cart[existingItemIndex];

        if(existingItem){
            const updatedItem = {
                ...existingItem
            }
            updatedShop.cart[existingItemIndex] = updatedItem
        }else{
            updatedShop.cart.unshift({
                ...action.payload,
                itemID: Math.random(),
                quantity: 1,
                calculatedSum: action.payload.price
            })
        }
       
        return {
            ...state,
            cart: updatedShop.cart
        }


        // {checkCart ? 
        //     setShop(prevState => {
        //         return {...prevState}
        //     }):
        //     setShop(prevState => {
        //         return {
        //             ...prevState,
        //             cart : [
        //               {
        //                   ...action.payload,
        //                   itemID: Math.random(),
        //                   qty: 1
        //               },
        //               ...prevState.cart 
        //           ]
        //         }
        //     });
        // }    
    }
    if(action.type === 'INCREASE_QUANTITY'){
        const updatedShop = {...state};
        const {cart} = updatedShop

        const existingCartItem = cart.find( (cartItem) => cartItem.id === action.payload);
      
        if(existingCartItem){
            return {
                ...updatedShop,
                cart : cart.map((cartItem) => cartItem.id === action.payload
                    ? {...cartItem, 
                        quantity: cartItem.quantity + 1,
                        calculatedSum: cartItem.calculatedSum + cartItem.price
                    }
                    : cartItem
                )
            }
            
        };

    }

    if(action.type === 'DECREASE_QUANTITY'){
        const updatedShop = {...state};
        const {cart} = updatedShop

        const existingCartItem = cart.find( (cartItem) => cartItem.id === action.payload);
      
        if(existingCartItem && existingCartItem.quantity !== 1){
            return {
                ...updatedShop,
                cart : cart.map((cartItem) => cartItem.id === action.payload
                    ? {...cartItem, 
                        quantity: cartItem.quantity - 1,
                        calculatedSum: cartItem.calculatedSum - cartItem.price
                    }
                    : cartItem
                )
            }
            
        };
    }
         


    if(action.type === 'VIEW_PRODUCT'){
        // console.log(action.payload)
        return {
            ...state,
            productInViewId: action.payload
          };
    }

    if(action.type === 'REMOVE_FROM_CART'){
        const filteredCart = state.cart.filter( item => {
            return item.id !== action.payload
         });
         
            return {
                ...state, 
                cart: filteredCart
            }
        
    }

    // if(action.type === 'SET_USER'){
    //     const {email} = action.payload
    //     return {
    //         ...state,
    //         currentUser: email
    //     }

        
    // }
    
    return state;
}

export default function StoreContextProvider({children}){

    const [upshopState, upShopDispatch] = useReducer(shopAppReducer, {
            productInViewId: undefined,
            categories: {},
            cart: []
    });

    const [storeProducts , setstoreProducts] = useState({});
    const [filterItems, setFilterItems] = useState({});
    // useEffect(() => {
    //     addCollectionAndDocs('categories', shopList)
    // }, []);

    useEffect( () => {
       const getCategories = async() => {
         const response = await getCategoriesAndDoc();
         setstoreProducts(response);
         setFilterItems(response);
       };

       getCategories();
    }, [])


    
    // const [shop, setShop] = useState({
    //     productInViewId: undefined,
    //     products: shopList,
    //     cart: []
    //   });

      function handleAddToCart(product){
        upShopDispatch({
            type: 'ADD_ITEM',
            payload: product
        });

        // const checkCart = shop.cart.find( item => item.id === product.id);

        // {checkCart ? 
        //     setShop(prevState => {
        //         return {...prevState}
        //     }):
        //     setShop(prevState => {
        //         return {
        //             ...prevState,
        //             cart : [
        //               {
        //                   ...product,
        //                   itemID: Math.random(),
        //                   qty: 1
        //               },
        //               ...prevState.cart 
        //           ]
        //         }
        //     });
        // }    
        
      }

    //   function addQuantity(id) {
    //    upShopDispatch({
    //     type: 'ADD_QUANTITY',
    //     payload: id
    //    });

    //    const addQty = shop.cart.filter( cartItem => {
    //     if( cartItem.id === id) {
    //        cartItem.qty += 1
    //        cartItem.price += cartItem.price
    //     }
    //     return cartItem;
    // })


    // setShop( (prevValue) => {
    //         return {
    //             productInViewId: id ,
    //             products: [...prevValue.products],
    //             cart: addQty
    //         }
    //     });
    //   }
    
    
    //   function subtractQuantity(id) {
    //     upShopDispatch({
    //         type: 'SUBTRACT_QUANTITY',
    //         payload: id
    //        });
    //     // const subtractQty = shop.cart.filter( cartItem => {
    //     //     if( cartItem.id === id && cartItem.qty > 1) {
    //     //        cartItem.qty -= 1
    //     //        cartItem.price /= 2
    //     //     }
    //     //     return cartItem;
    //     // })
    //     // setShop( (prevValue) => {
    //     //         return {
    //     //             productInViewId: id ,
    //     //             products: [...prevValue.products],
    //     //             cart: subtractQty
    //     //     }});
    //   }
        

    //   const storeContextValue = {
    //     productInViewId: shop.productInViewId,
    //     products: shop.products,
    //     cart: shop.cart,
    //     addToCart : handleAddToCart,
    //     upShopStateUpdater: setShop,
    //     updateQty: addQuantity,
    //     subtractQty: subtractQuantity
    //   }

      const storeContextValue = {
        productInViewId: upshopState.productInViewId,
        categories: storeProducts,
        cart: upshopState.cart,
        filterProducts: filterItems,
        addToCart : handleAddToCart,
        upShopStateUpdater: upShopDispatch,
      }

      return <StoreContext.Provider value={storeContextValue}>
                {children}
             </StoreContext.Provider>
}
