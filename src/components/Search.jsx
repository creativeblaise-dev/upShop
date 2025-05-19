
import { useRef, useContext, useMemo, useState, useEffect } from "react";
import emptyCartIcon from '../assets/img/box.png'
import { Link } from "react-router";
import Button from "./Button";
import { StoreContext } from "../components/contexts/store-context.jsx";


export default function Search() {

  const { filterProducts } = useContext(StoreContext);

  const searchRef = useRef();
  const [searchWord, setSearchWord] = useState('')

  const [products, setProducts] = useState([]);
  const [isToggle, setIsToggle] = useState(false);

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
  }, [filtering]);

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
      
      if(!isToggle){
       setSearchWord('');
       searchRef.current.value = '';
      }

      return () => {
        document.removeEventListener("click", handleClick);
      };
    });
  };

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


 const defaultClass = 'absolute bg-lime-50 w-100 h-90 p-4 border-1 border-stone-500 top-15 right-6 z-100 rounded-lg shadow-xl';

 const handleSearchOpen = () => {
    setIsToggle(true)
 }

 useClickOutside(searchRef,  closeSearch);

  return ( 
    <div className="flex-1">
      <input
        ref={searchRef}
        onChange={searching}
        onClick={handleSearchOpen}
        className="px-2 py-2 border-2 border-slate-100 shadow rounded-md text-stone-900 bg-lime-50 text-xs "
        type="search"
        placeholder="search products"
        name="searchbar"
      />
      <Button></Button>

      <div className={isToggle ? defaultClass : 'hidden'}>
        <div className="wrapper overflow-auto h-80">
        {searchContent}
        </div>
      </div>
    </div>
  );
}
