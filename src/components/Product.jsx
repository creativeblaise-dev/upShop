import {  useContext, useMemo } from "react";
import { useParams, useNavigate } from "react-router";
import Button from "./Button";
import { StoreContext } from "./contexts/store-context";

const Product = () => {
    const {categories, cart, addToCart} = useContext(StoreContext);

    const {category, product} = useParams();
    const navigate = useNavigate();

    const goToCheckOutHandler = () => {
        navigate('/checkout');
    }
    const goToCategoryHandler = () => {
        navigate(`/shop/${category}`);
    }


    const processedData = useMemo(() => {

        const p = Object.keys(categories).map(item => {
            if(item === category){
                const pros = categories[item].find(item => item.id === Number(product))
                return pros
            }
        });

        const pro = p.findIndex((item) => {
            return item
        })

        const result = p.find((item , index) =>  {
            if(index === pro){
                return item
            }
        })

        return result

    }, [category, product, categories]);


    const inCart = cart.filter((item) => item.id === processedData.id);

    console.log(inCart)

    return(
         <main className="py-6 px-5">
              <header className="mb-6">
                <Button onClick={goToCategoryHandler} classes="bg-slate-800 px-2 py-1 rounded cursor-pointer ">
                        Go Back 
                </Button>
              </header>
                {processedData &&
                    <section className="grid grid-col-2 gap-10 bg-white shadow rounded-lg p-4" key={processedData.id}> 
                      <div className="md:col-start-1 md:col-end-3"> 
                          <img src={processedData.image} className="rounded-xl"/>
                      </div>
                      <div className="md:col-start-3">
                          <h1 className="font-bold text-4xl text-stone-800 mb-6">{processedData.name}</h1>
                          <p className="font-medium text-lg text-stone-700 mb-2">${processedData.price}</p>
                          <p className="text-sm text-slate-700">In { processedData.category}</p>
                          <p className="text-sm mt-2 text-slate-400">Item Code: {processedData.id}</p>
                          <p className="text-sm text-stone-600 italic mt-6 mb-10">{processedData.details}</p>

                         { inCart.length >= 1 ?
                            <Button  onClick={goToCheckOutHandler} classes=" font-bold block w-full bg-slate-700 border-2 border-slate-300 py-2 px-4 cursor-pointer">
                            CheckOut
                          </Button> :
                          <Button onClick={() => addToCart(processedData) } classes="font-bold block w-full bg-slate-700 border-2 border-slate-300 py-2 px-4 cursor-pointer">
                            Add to Cart
                          </Button>
                          }

                      </div>
                    </section>
                }
              </main>
    )
}


export default Product;