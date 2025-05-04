
import { useContext, useState } from "react";
import {
  signInWithGPopup,
  signInUser,
  retrieveUserFromCollection,

} from "../../utils/firebase/firebase.utils";
import Button from "../Button";
import SignUp from "./SignUp";
import FormInput from "../FormInput";
import { AuthContext } from "../contexts/auth-context";
import { getDoc } from "firebase/firestore";
// import { StoreContext } from "../contexts/store-context";

const Sign_In = () => {
    const { userSigIn} = useContext(AuthContext);
    // const {upShopStateUpdater} = useContext(StoreContext);

    const [checkUserAuth, setUserAuth] = useState({
        user_email: '',
        user_password: ''
    });

    const {user_email, user_password} = checkUserAuth;

  const logGUser = async () => {
    await signInWithGPopup();
  };

  const handleChange = (event) => {
    const {name, value} = event.target;
    setUserAuth({...checkUserAuth, [name]: value});
    
  }

  const handleUserSignIn = async(event) => {
    event.preventDefault();
    try {
      if(user_email !== '' && user_password !== ''){
        const result = await signInUser(user_email, user_password);
        const {user} = result;

        alert('Sign in was successful..');

        setUserAuth({
            user_email: '',
            user_password: ''
        });

      //  const response =  await retrieveUserFromUsersCollection();
      //  console.log(response)

      //  const userResponse =  response.docs.filter((doc) => {
      //   return doc.id === user.uid
      //   // return fields
      // });

      // const userFromDB = userResponse[0];
      // const {id} = userFromDB

      const docSnap = await getDoc(retrieveUserFromCollection(user));
   

      if (docSnap.exists()) {
        const userDoc = docSnap.data();
        userSigIn(userDoc)
      
        // upShopStateUpdater({
        //   type: 'SET_USER',
        //   payload: user
        // });
        
      } else {
        // docSnap.data() will be undefined in this case
        alert("No such document!");
      }
     
      }
    } catch (error) {
      console.log(error)
    }
  
  }

  // const handleUsersFetchData = (user) => {
  //   setAuthUser({
  //       type: 'AUTH_USER_SET',
  //       payload: user
  //   })
  // }

  // const handleSubmit = async(event) => {
  //   event.preventDefault();
  //   try{
  //       if(user_email !== '' && user_password !== ''){
  //       const result = await signInUser(user_email, user_password);
  //       const {user} = result;
  //       getUserData(user.uid);
        
  //       alert('Sign in was successful..');
  //       setUserAuth({
  //           user_email: '',
  //           user_password: ''
  //       });

  //      const response =  await retrieveUserFromUsersCollection();

  //      const userResponse =  response.docs.filter((doc) => {
            
  //           return doc.id === user.uid
  //           // return fields
  //       });

  //       const foundResponse = userResponse[0];
    
  //       handleUsersFetchData(foundResponse);

  //       }else{
  //           alert('Email and password cannot be empty')
  //       }
  //   }catch(error){
  //       if(error.code === 'auth/invalid-credential'){
  //           alert('Invalid credentails');
  //           console.log(error)
  //       }
  //   }
  // }


  return (
    <main className="flex justify-self-center gap-20">
      <div className="p-4 flex-2 ">
        <h3 className="text-xl font-bold text-slate-950 mb-5">Sign In</h3>
        <p className="text-sm font-bold text-stone-900 mb-2">
          Already have an account ?
        </p>
        <Button
              classes="w-75 bg-red-500 text-md text-slate-100 p-2 rounded-md cursor-pointer"
              onClick={logGUser}
            >
              Sign in with Google
        </Button>
        <p className="text-sm text-stone-900 mt-4">
          OR sign in with your email and password
        </p>
        <form onSubmit={handleUserSignIn}>
          <FormInput
            label="Email"
            value={user_email}
            type="text"
            name="user_email"
            required
            onChange={handleChange}
          />
        
          <FormInput
            label="Password"
            value={user_password}
            type="password"
            name="user_password"
            required
            onChange={handleChange}
          />
        
          <div className="flex mt-4 gap-2">
            <Button
              type="submit"
              classes="w-75 bg-stone-950 text-md text-slate-100 p-2 rounded-md cursor-pointer"
            >
              Sign in
            </Button>
           
          </div>
        </form>
      </div>
      <div className="flex-3 p-4">
        <SignUp />
      </div>
    </main>
  );
};

export default Sign_In;
