import Button from "./Button"
import { StoreContext } from "./contexts/store-context";
import { useContext } from "react";



export default function ProductDetail(){

    const {products, productInViewId} = useContext(StoreContext)

    const selectedProduct = products.filter( product => product.id === productInViewId);

    console.log(selectedProduct);
    return(
        <main className="py-10 px-5">
        <header>
            <Button classes="bg-slate-800 px-2 py-1 rounded cursor-pointer mb-4">
                Back to Shop
            </Button>
        </header>
           
            {selectedProduct.map( item => {
                return  <section className="flex gap-4"> 
                <div className="flex-2">
                    <img src={item.image} className=""/>
                </div>
                <div className="flex-2">
                    <h1 className="font-bold text-xl text-stone-900 mb-2">{item.name}</h1>
                    <p className="font-medium text-stone-500 mb-2">${item.price}</p>
                    <p className="text-sm text-slate-600">{item.category}</p>
                    <p className="text-sm text-stone-600 mt-6">{item.details}</p>
                    <div></div>
                </div>
                </section>
            }) }
        </main>
    )
}