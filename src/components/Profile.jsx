import { useContext, useRef } from "react";
import cartIcon from "../assets/img/bag.png";
import {StoreContext } from "./contexts/store-context";
import Button from "./Button";
import CartModal from "./CartModal";
import { Link } from "react-router";
import { AuthContext } from "./contexts/auth-context";
import profileImg from "../assets/img/alien.png";
import { signUserOut } from "../utils/firebase/firebase.utils";

export default function Profile() {
  const { currentUser, setAuthUser } = useContext(AuthContext);


  const {cart} = useContext(StoreContext);

  const dialog = useRef();

  function handleOpenCart() {
    dialog.current.open();
  }

  const handleSignOut = async (currentUser) => {
    await signUserOut();

    setAuthUser({
      type: "USER_SIGN_OUT",
      payload: currentUser,
    });
  };

  let userProfileImage ;

  if( currentUser !== null && currentUser.photoURL === null){
    userProfileImage = profileImg
  }else if(currentUser !== null && currentUser.photoURL !== null){
    userProfileImage = currentUser.photoURL
  }

  function toggleMode(){
    const card = document.getElementsByClassName('card')
    
    for (const cardItem of card) {
        cardItem.classList.toggle('dark')
    }
    
  }

  return (
    <>
      <CartModal ref={dialog} />
      <div className="flex-2 flex gap-2 justify-end">
       <span>
        <Button id='toggleDark' classes='text-md text-slate-200 text-xs cursor-pointer bg-stone-800 rounded-lg py-2 px-3' 
               onClick={toggleMode}
          >
           Toggle Mode
        </Button>
       </span>
        {currentUser && Object.entries(currentUser).length === 0 ? (
          <Link className="text-sm text-stone-900" to="/sign-in">
            Sign In
          </Link>
        ) : (
          <Link className="text-sm text-stone-900" onClick={handleSignOut}>
            Sign Out
          </Link>
        )}
        { userProfileImage &&
        <img
          className="inline-block size-6 rounded-full ring-2 ring-white"
          src={userProfileImage}
          alt="profile image"
        />
        }
        <p className="text-stone-700 text-sm pr-4">
          {currentUser !== null && currentUser.displayName !== null ? currentUser.displayName : currentUser.email}
        </p>
        <div className="text-sm text-slate-600 flex gap-1 border-l-1 pl-3">
          <Button classes="cursor-pointer" onClick={handleOpenCart}>
            <img className="h-5" src={cartIcon} />
          </Button>
          <p className="text-stone-700">{cart.length}</p>
        </div>
      </div>
    </>
  );
}
