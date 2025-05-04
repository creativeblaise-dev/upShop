import { useContext } from "react";
import { StoreContext } from "./contexts/store-context";
import Button from "./Button";
import { useNavigate } from "react-router";

const CheckOut = () => {

    const {cart} = useContext(StoreContext);
    const allItemPrices = cart.map(({calculatedSum}) => {
        return calculatedSum
    });
    
    const totalPrice = allItemPrices.reduce( (first, next) => {
        return first + next
    }, 0);

    const navigate = useNavigate();

    const goToHomeHandler = () => {
        navigate('/');
    }

    return (
        <main className=" grid md:grid-cols-2 gap-3 mt-4  p-6">
        <div className="bg-white shadow-lg rounded-lg p-4 sm:col-start-1 sm:col-end-4 md:col-start-1 md:col-end-3 lg:col-start-1 lg:col-end-3 ">
            <div className="flex">
                <div className="flex-3">
                    <h1 className="text-stone-900 font-bold text-xl mb-2">CheckOut</h1>
                    <h3 className="text-slate-700 text-md ">Order details ({cart.length} items)</h3>
                </div>
                <Button classes="text-md font-medium bg-slate-900 text-white py-1 px-2 rounded-md max-h-max cursor-pointer" onClick={goToHomeHandler}>Cancel</Button>
            </div>
             
             <hr className="h-0.5 bg-slate-300 mt-3" />
             <section className="mt-4">
             {cart.map(({id, image, name, price, category, quantity, calculatedSum}) => {
                return (
                    <div className="flex gap-6 mb-4 bg-slate-100 p-4 rounded-lg shadow-lg" key={id}>
                        <div className="flex-1">
                            <img src={image} alt={`${name}`} className="rounded-lg shadow-md" />
                        </div>
                        <div className="flex flex-3">
                            <div className="flex-3">
                                <h4 className="text-xl font-bold text-stone-900 mb-2">{name}</h4>
                                <p className="text-sm text-slate-800 mb-1 font-medium">Qty: {quantity} x {price}</p>
                                <p className="text-sm text-slate-700 mb-4">In {category}</p>
                                <p className=" text-slate-800 font-bold text-lg ">Total Price: <span className="font-medium"> ${calculatedSum}</span></p>
                            </div>
                            <div className="flex flex-1 justify-end">
                                <p className="text-sm text-slate-800 font-medium">Price: ${price}</p>
                            </div>
                        
                        </div>
                    </div>
                )
             } 
             )}
                
             </section>
             
        </div>
        <div className="bg-white shadow-lg rounded-lg p-4 sm:col-start-3  max-h-max md:col-start-3 md:col-end-3  lg:col-start-3 ">
            <h1 className="text-stone-900 font-bold text-xl mb-3">Order summary</h1>
            <h2 className=" text-stone-900 font-bold mb-4">
                Total 
                <span className="font-medium"> ({cart.length} items) :</span>
                <span className="float-end ">${totalPrice}</span>
            </h2>
            <p className="text-xs text-slate-700">
            By completing your purchase, you agree to these Terms of Use.
            </p>
            <div className="flex justify-center mt-5">
                <Button classes="w-full cursor-pointer shadow-md bg-amber-400 py-2 px-5 text-stone-900 font-bold rounded-lg">Pay ${totalPrice}</Button>
            </div>
        </div>
            

        </main>
    )
}


export default CheckOut;