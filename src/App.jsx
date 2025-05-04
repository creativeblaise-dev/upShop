import { useRef, useContext } from "react";
import { Routes, Route } from "react-router";
import Home from "./components/routes/Home";
import Header from "./components/Header";
import Search from "./components/Search";
import Profile from "./components/Profile";
import CheckOut from "./components/CheckOut.jsx";
import { StoreContext } from "./components/contexts/store-context.jsx";
import shopList from "../src/shopList.js";
import Sign_In from "./components/auth/Sign_In.jsx";
import Shop from "./components/Shop.jsx";

function App() {

  const { filterProducts, setFiltered } = useContext(StoreContext);

  const searchRef = useRef();

  function searching() {
    const filterShopProduct = filterProducts.filter((product) =>
      product.name.toLowerCase().includes(searchRef.current.value)
    );

    if (searchRef.current.value === "") {
      setFiltered([...shopList]);
    } else {
      setFiltered(filterShopProduct);
    }
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
          <Header>
            <Profile />
            <Search ref={searchRef} searchFilter={searching} />
          </Header>
          <footer className="bg-stone-900 p-6"><p className="text-slate-300 text-xs">@ upShop | All rights reserved.</p></footer>
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
