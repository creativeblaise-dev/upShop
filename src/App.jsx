import { useRef, useContext, useMemo, useState, useEffect } from "react";
import { Routes, Route } from "react-router";
import Home from "./components/routes/Home";
import Header from "./components/Header";
import Search from "./components/Search";
import Profile from "./components/Profile";
import CheckOut from "./components/CheckOut.jsx";
import { StoreContext } from "./components/contexts/store-context.jsx";
import Sign_In from "./components/auth/Sign_In.jsx";
import Shop from "./components/Shop.jsx";
import emptyCartIcon from '../src/assets/img/box.png'
import { Link } from "react-router";

function App() {
  const { filterProducts } = useContext(StoreContext);

  const searchRef = useRef();
  const [searchWord, setSearchWord] = useState('')

  const [products, setProducts] = useState([]);


  const filtering = useMemo(() => {
    const allProducts = [];

    Object.keys(filterProducts).map((category) => {
      return filterProducts[category].map((item) => {
        allProducts.push(item);
        return item;
      });
    });

    return allProducts;

  }, [filterProducts]);

  useEffect(() => {
    setProducts(filtering);
  }, [filtering, searchRef]);

  let searchContent;

  if(searchWord === ''){
     searchContent = <div className=" gap-6 mb-2 p-2 mr-4 text-center ">
                         <h1 className="text-3xl text-stone-900 font-extrabold  ">It's empty here, start searching...</h1>
                         <img src={emptyCartIcon} className="w-full" />
                     </div> 
  }else{
     searchContent = products && products.map((product) => (
                         <div className="flex gap-6 mb-2 p-2 mr-4 border-1 rounded-md border-slate-300" key={product.id}>
                             <div className="flex-1">
                                 <img
                                     src={product.image}
                                     alt={`${product.name}`}
                                     className="rounded-lg shadow-md"
                                 />
                             </div>
                             <div className="flex-3">
                                 <h4 className="text-sm font-bold text-stone-900 mb-2">
                                     <Link
                                     to={`/shop/${product.category.toLowerCase()}/${
                                         product.id
                                     }`}
                                     >
                                     {product.name}
                                     </Link>
                                 </h4>
                                 <p className="text-sm text-slate-800 font-medium">
                                     Price: ${product.price}
                                 </p>
                             </div>
                         </div>
                 ))
  }

  //custom hook or search toggler , takes the ref dom element and a callback as arguments
  const useClickOutside = (searchRef, callback) => {
    const handleClick = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        callback();
      }
    };

    useEffect(() => {
      document.addEventListener("click", handleClick);
      return () => {
        document.removeEventListener("click", handleClick);
      };
    });
  };

  const [isToggle, setIsToggle] = useState(false);

  function searching() {

    const searchTerm = searchRef.current.value;
    setSearchWord(searchTerm);

    const filterShopProduct = products.filter((product) =>
      product.name.toLowerCase().includes(searchRef.current.value.toLowerCase())
    );

  
    if (searchWord === "") {
      setProducts(filtering);
    } else {
      setProducts(filterShopProduct);
    }
  }

  function closeSearch() {
    if (isToggle) {
      setIsToggle(!isToggle);
    }
  }


  return (
    <Routes>
      <Route
        path="/*"
        element={
          <>
            <Header>
              <Profile />
              <Search
                isToggle={isToggle}
                searchToggler={setIsToggle}
                onClickOutside={closeSearch}
                ref={searchRef}
                useClickOutside={useClickOutside}
                searchFilter={searching}
                searchContent={searchContent}
              />
            </Header>
            <footer className="bg-stone-900 p-6">
              <p className="text-slate-300 text-xs">
                @ upShop | All rights reserved.
              </p>
            </footer>
          </>
        }
      >
        <Route index element={<Home />} />
        <Route path="shop/*" element={<Shop />} />
        <Route path="checkout" element={<CheckOut />} />
        <Route path="sign-in" element={<Sign_In />} />
      </Route>
    </Routes>
  );
}

export default App;
