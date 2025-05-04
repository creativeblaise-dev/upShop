
import { Link, Outlet } from "react-router";
import logo from '../assets/img/shopping-cart.png'

export default function Header({children}){
    return (
        <>
        <header className="flex py-3 px-4 bg-amber-300 shadow">
            <div className="flex-3 logo p-2 font-bold text-stone-800 text-3xl ">
                <Link to='/' className="text-xl font-bold"><img className="w-15 inline-flex" src={logo}/> <span>upShop</span></Link>
            </div>
            <div className="profile flex-2 justify-center ">
                <div className=" -space-x-1 overflow-hidden flex p-2 gap-8 justify-end">
                    {children}
                </div>
            </div>
        </header>
        <Outlet />
        </>
    )

}