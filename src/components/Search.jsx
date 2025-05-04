export default function Search({ref,searchFilter}){
    return (
        <div className="flex-1">
            <input ref={ref} onChange={searchFilter} 
            className="px-2 py-2 border-2 border-slate-100 shadow rounded-md text-stone-900 bg-lime-50 text-xs " 
            type="search" placeholder="search products" name="searchbar" />
        </div>
    )
}