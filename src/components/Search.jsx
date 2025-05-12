import { Link } from "react-router";
import Button from "./Button";


export default function Search({ ref, searchFilter, onClickOutside, useClickOutside, searchToggler, isToggle, searchContent}) {


 const defaultClass = 'absolute bg-lime-50 w-100 h-90 p-4 border-1 border-stone-500 top-15 right-6 z-100 rounded-lg shadow-xl';

 const handleSearchOpen = () => {
    searchToggler(true)
 }

 useClickOutside(ref,  onClickOutside);

  return ( 
    <div className="flex-1">
      <input
        ref={ref}
        onChange={searchFilter}
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
