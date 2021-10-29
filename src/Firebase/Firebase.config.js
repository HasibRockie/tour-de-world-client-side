import { initializeApp } from "firebase/app";
import firebaseConfig from "./Firebase.init";

const initializeAuth = () => {
  initializeApp(firebaseConfig);
};

export default initializeAuth;
