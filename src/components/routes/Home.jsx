
// import ProductDetail from "./components/ProductDetail";
import Shop from "../Shop";
// import { StoreContext } from "./store/store-context";
import Categories from "../Categories";


function Home() {
  // const { products } = useContext(StoreContext);
  

  // useEffect(() => {
  //   fetch("https://themealdb.com/api/json/v1/1/search.php?f=a")
  //     .then((response) => response.json())
  //     .then((data) => console.log(data.meals));
  // }, []);

  return (
    <>
        <Categories />
        <Shop/>
    </>
  );
}

export default Home;
