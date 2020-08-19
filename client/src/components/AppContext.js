import React, { createContext, useEffect, useState } from "react";
import withFirebaseAuth from "react-with-firebase-auth";
import * as firebase from "firebase";
import "firebase/auth";

export const AppContext = createContext(null);

const firebaseConfig = {
  apiKey: "AIzaSyC23KwCFmB4cgWUIlN6yMvQHmoX-_0QZPw",
  authDomain: "test-app-6cd16.firebaseapp.com",
  databaseURL: "https://test-app-6cd16.firebaseio.com",
  projectId: "test-app-6cd16",
  storageBucket: "test-app-6cd16.appspot.com",
  messagingSenderId: "791501150250",
  appId: "1:791501150250:web:3d178b0af3133af9684b53",
  measurementId: "G-MXGDPY4R85",
};

const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider(),
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const firebaseAppAuth = firebaseApp.auth();

const AppProvider = ({ children, signInWithGoogle, signOut, user }) => {

  const [appUser, setAppUser] = useState({});

  const handleSignOut = () => {
    signOut();
    setAppUser({});
  };

  useEffect(() => {
    if (user) {
      setAppUser({
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
      });
    }
  }, [user]);

  return (
    <AppContext.Provider value={{ appUser, signInWithGoogle, handleSignOut }}>
      {children}
    </AppContext.Provider>
  );
};

export default withFirebaseAuth({
  providers,
  firebaseAppAuth,
})(AppProvider);
