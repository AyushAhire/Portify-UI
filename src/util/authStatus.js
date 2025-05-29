// src/utils/authStatus.js
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

export const checkAuth = (setUser) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUser(user);
    } else {
      setUser(null);
    }
  });
};
