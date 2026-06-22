"use client";

import { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "@/firebase/firebase.config";
import axiosPublic from "@/lib/axiosPublic";
import AuthContext from "@/context/AuthContext";

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  
  const registerUser = async (name, email, password, photo, extraDoctorFields = {}) => {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(result.user, { displayName: name, photoURL: photo });

    await axiosPublic.post("/users", {
      name,
      email,
      photo,
      role: extraDoctorFields.role || "patient",
      ...extraDoctorFields,
    });

    await exchangeForBackendJWT(result.user);
    return result;
  };

  const loginUser = async (email, password) => {
    const result = await signInWithEmailAndPassword(auth, email, password);
    await exchangeForBackendJWT(result.user);
    return result;
  };

  const loginWithGoogle = async () => {
    const result = await signInWithPopup(auth, googleProvider);

    
    await axiosPublic.post("/users", {
      name: result.user.displayName,
      email: result.user.email,
      photo: result.user.photoURL,
      role: "patient",
    });

    await exchangeForBackendJWT(result.user);
    return result;
  };

  const logOut = async () => {
    localStorage.removeItem("medicare-token");
    setRole(null);
    return signOut(auth);
  };

 
  const exchangeForBackendJWT = async (firebaseUser) => {
    const idToken = await firebaseUser.getIdToken();
    const { data } = await axiosPublic.post(
      "/jwt",
      {},
      { headers: { Authorization: `Bearer ${idToken}` } }
    );
    localStorage.setItem("medicare-token", data.token);
    setRole(data.role);
    return data;
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        try {
          // Refresh the backend JWT so role + expiry always stay current.
          await exchangeForBackendJWT(currentUser);
        } catch (err) {
          console.error("Could not refresh backend JWT", err);
        }
      } else {
        localStorage.removeItem("medicare-token");
        setRole(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();

  }, []);

  const authInfo = {
    user,
    role,
    loading,
    registerUser,
    loginUser,
    loginWithGoogle,
    logOut,
  };

  return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
