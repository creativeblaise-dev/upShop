import { useState, useContext } from "react";
import Button from "../Button";
import FormInput from "../FormInput";
import {
  createUserWithTraditionalMethod,
  createUserDocFromSignIn,
  retrieveUserFromCollection
} from "../../utils/firebase/firebase.utils";
import { AuthContext } from "../contexts/auth-context";
import { getDoc } from "firebase/firestore";

const SignUp = () => {

  const { userSigIn} = useContext(AuthContext);

  const defaultFromFields = {
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const [formFields, setFormFields] = useState(defaultFromFields);

  const { displayName, email, password, confirmPassword } = formFields;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if(password !== confirmPassword){
        alert('Passwords do not macth, recheck!');
        return
      }
      const result = await createUserWithTraditionalMethod(email, password);
      const { user } = result;
      user.displayName = displayName;
      await createUserDocFromSignIn(user, {displayName});

      const docSnap = await getDoc(retrieveUserFromCollection(user));

      if (docSnap.exists()) {
        const userDoc = docSnap.data();
        userSigIn(userDoc)
        
      } else {
        // docSnap.data() will be undefined in this case
        alert("No such document!");
      }
      
      alert('Sign up was successful..')
      setFormFields(defaultFromFields);

    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("Email is already in use.");
      }else{
        console.log("User creation failed!", error);
      }
      
    }
  };

  return (
    <>
      <h3 className="text-xl font-bold text-slate-950 mb-2">Sign Up</h3>
      <p className='text-sm text-stone-900'>Sign up with your email and password</p>
      <form onSubmit={handleSubmit}>
      <FormInput 
        label='Username'
        value={displayName}
        type="text"
        required
        name="displayName"
        onChange={handleChange}
      />
      <FormInput 
        label='Email'
        value={email}
        type="email"
        name="email"
        required
        onChange={handleChange}
      />
      <FormInput 
        label='Password'
        value={password}
        type="password"
        name="password"
        required
        onChange={handleChange}
      />
      <FormInput 
        label='Confirm Password'
        value={confirmPassword}
        type="password"
        name="confirmPassword"
        required
        onChange={handleChange}
      />
        <Button
          type="submit"
          classes="bg-stone-950 text-md text-slate-100 p-2 rounded-md mt-6 w-75"
        >
          Sign up
        </Button>
      </form>
    </>
  );
};

export default SignUp;
