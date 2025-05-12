import { Link } from "react-router"
import { useContext } from "react"
import { StoreContext } from "./contexts/store-context"


export default function Card({cartbtn, product}){
      // function onOpenProduct() {
      //   productDialog.current.open();
      //   console.log(viewProduct)
      // }
const {upShopStateUpdater} = useContext(StoreContext)

      function viewProduct(id){
        upShopStateUpdater({
          type: 'VIEW_PRODUCT',
          payload: id
        })
      }
 
    return (
         <div className="card bg-white rounded-lg shadow drop-shadow-xl " key={product.id}>
                      <div className="p-1 ml-2 absolute shadow-lg rounded-sm font-bold text-xs mt-2 bg-amber-300 text-stone-800">
                        {product.status}
                      </div>
                      <div className="md:shrink-0">
                        <img src={product.image} className="rounded-t-lg" />
                      </div>
                      <div className="py-4 px-4">
                      {/* <Button onClick={() => viewProduct(product.id)} classes="cursor-pointer">
                        <h1 className="text-stone-700 font-bold mb-3 min-h-15 ">
                            {product.name}
                        </h1>
                        </Button> */}
                        <Link to={`/shop/${(product.category.toLowerCase())}/${product.id}`} onClick={() => viewProduct(product.id)} className="cursor-pointer">
                            <h1 className="text-stone-700 font-bold mb-3 min-h-15 ">
                                {product.name}
                            </h1>
                        </Link>	
                        <p className="text-stone-500 text-sm mb-4">In {product.category} </p>
                        <p className="text-slate-600 font-medium">${product.price} </p>
        
                        <div className="flex justify-end mt-4">
                           {cartbtn}
                        </div>
                      </div>
                    </div>
    )
}