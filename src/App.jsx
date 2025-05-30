
import { Routes, Route } from "react-router";
import Home from "./components/routes/Home";
import Header from "./components/Header";
import Search from "./components/Search";
import Profile from "./components/Profile";
import CheckOut from "./components/CheckOut.jsx";
import Sign_In from "./components/auth/Sign_In.jsx";
import Shop from "./components/Shop.jsx";


function App() {

  return (
    <Routes>
      <Route
        path="/*"
        element={
          <>
            <Header>
              <Profile/>
              <Search/>
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
