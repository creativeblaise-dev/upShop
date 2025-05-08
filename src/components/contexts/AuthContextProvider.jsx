
import { useReducer, useEffect, useContext } from "react";
import { AuthContext } from "./auth-context";
import { onAuthStateChangedListener, createUserDocFromSignIn} from '../../utils/firebase/firebase.utils'

function authReducer(state, action){
  if(action.type === 'AUTH_USER_SET'){

    const updatedUserState = {...state};

    const {_document: {data}} = action.payload
    const {value:{mapValue}} = data
    const {fields} = mapValue

    const {email, displayName} = fields;

    if(action.payload){
      updatedUserState.email = email.stringValue
      updatedUserState.displayName = displayName.stringValue
    }
   

    return {
      ...updatedUserState,
    }
    
  }

  if(action.type === 'USER_AUTHENTICATION'){
    // const updatedUserState = {...state};
    const user = action.payload;

    return {
     ... user
    }
  }

  if(action.type === 'USER_SIGN_OUT'){
    return {}
  }
  
  return state
}


export default function AuthContextProvider({children}){
  // const defaultUserState = {
  //   email: '',
  //   displayName: '',
  //   photoURL: '',
  //   createdAt: ''
  // }
    const {currentUser} = useContext(AuthContext)
    const [authCurrentUser, setAuthDispatch] = useReducer(authReducer, currentUser);

    useEffect(() => {
      const unsubscribe = onAuthStateChangedListener((user) => {

        if(user){
          createUserDocFromSignIn(user);
        }
        signInUser(user);
      });
      
      return unsubscribe
    }, [])
   
    function handleUserData(uid){
      setAuthDispatch({
      type: 'SET_USER_PROFILE',
      payload: uid
    });
    }

    function signInUser(user){
      setAuthDispatch({
        type: 'USER_AUTHENTICATION',
        payload: user
      })
    }


      const authContextValue = {
        currentUser : authCurrentUser,
        setAuthUser: setAuthDispatch,
        getUserData: handleUserData,
        userSigIn : signInUser,
      }

      
      return <AuthContext.Provider value={authContextValue}>
                {children}
             </AuthContext.Provider>
}
