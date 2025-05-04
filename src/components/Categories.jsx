import { useContext } from "react";
import { Link} from "react-router";
import CATEGORY_ICONS from "../cayegory-icons";
import { StoreContext } from "./contexts/store-context";

const Categories = () => {

    const {categories} = useContext(StoreContext);

    console.log(categories)

    return (
        <>
        <h3 className="font-bold text-slate-600 px-6 text-xl mt-4"> Product Categories</h3>
        <main className="grid grid-cols-6 p-4 gap-2">
            {Object.keys(categories).map((title) => (
                    <div id={title} key={title} className="flex-1 bg-slate-50 rounded-lg shadow">
                        <div className="category-card text-center p-4 right">
                            <div className="flex justify-center">
                                {/* <img src={icon} className="p-4 w-25"/> */}
                            </div>
                            <Link to={`shop/${title}`} className='rounded-md 
                             text-stone-800 font-bold  cursor-pointer' >{title.toUpperCase()}</Link>	
                        </div>
                   
                    </div>
            ))}
        </main>
        </>
    )
}

export default Categories