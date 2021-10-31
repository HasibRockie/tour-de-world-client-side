import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import initializeAuth from "./Firebase.config";
import { useState, useEffect } from "react";
import { useHistory } from "react-router";

initializeAuth();

const FirebaseSettings = () => {
  const history = useHistory();
  const [user, setUser] = useState({});
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);
  const [details, setDetails] = useState({
    name: user.displayName,
    email: user.email,
    phone: "",
    city: "",
    address: "",
  });
  const [userProfile, setUserProfile] = useState({});
  const [profileId, setProfileId] = useState("");
  const [allUsers, setAllUsers] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState("");
  const provider = new GoogleAuthProvider();
  const auth = getAuth();

  const [services, setServices] = useState([]);

  useEffect(() => {
    setLoading(true);

    fetch("https://tour-de-world-private-limited.herokuapp.com/services")
      .then((res) => res.json())
      .then((data) => setServices(data));

    fetch("https://tour-de-world-private-limited.herokuapp.com/users")
      .then((res) => res.json())
      .then((data) => setAllUsers(data));

    // const present = allUsers.filter(
    //   (singleUser) => singleUser.user.email === user?.email
    // );
    // setUserProfile({ ...present[0], details });

    // setCart(present[0]?.cart || []);
    // setOrders(present[0]?.orders || []);

    onAuthStateChanged(auth, (user) => {
      const present = allUsers.filter(
        (singleUser) => singleUser.user.email === userEmail
      );
      setUserProfile(present[0]);

      setCart(userProfile?.cart || []);
      setOrders(userProfile?.orders || []);

      if (user) {
        setUser(user);
        setUserEmail(user.email);
        setLoggedIn(true);
        const uid = user.uid;

        // console.log("user found");
      } else {
        setUser({});
        setLoggedIn(false);
        console.log("user not ofound");
      }
      setLoading(false);  
    });
  }, [cart]);

  // check user function
  const checkUser = async (userEmail) => {
    const member = allUsers.filter(
      (singleUser) => singleUser.user?.email === userEmail
    );

    console.log(member);
    if (member.length !== 0) {
      setProfileId(member[0]?._id);
      console.log(member[0]?._id);
      setCart(member[0]?.cart);
    } else {
      console.log(user);
      userProfile.cart = cart;
      userProfile.orders = orders;
      const url = `https://tour-de-world-private-limited.herokuapp.com/users`;
      const object = await userProfile;
      fetch(url, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(object),
      })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => console.log(err));
    }
  };

  // google sign in
  const handleGoogleSignin = () => {
    setLoading(true);
    signInWithPopup(auth, provider)
      .then((result) => {
        setUser(result.user);
        setUserEmail(result.user?.email);
        console.log(userEmail);
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        checkUser(result.user?.email);
        const userId = result.user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(errorMessage);
      })
      .finally(setLoading(false));
  };

  const handleSignout = () => {
    setLoading(true);
    signOut(auth)
      .then(() => {
        setUser({});
        setLoggedIn(false);
        setUserProfile({});
        setCart([]);
        setOrders([]);
      })
      .catch((error) => {
        console.log(error.errorMessage);
      })
      .finally(setLoading(false));
  };

  return {
    handleGoogleSignin,
    handleSignout,
    user,
    loggedIn,
    setUser,
    loading,
    services,
    setServices,
    allUsers,
    setAllUsers,
    cart,
    setCart,
    orders,
    setOrders,
    userProfile,
    setUserProfile,
    profileId,
    setProfileId,
    details,
    setDetails,
  };
};

export default FirebaseSettings;
