import { auth, provider } from "../config/firebase-config";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export const LoginPage = () => {
  const navigate = useNavigate();
  
  const signInWithGoodle = async () => {
    const reuslts = await signInWithPopup(auth, provider);

    const authInfo = {
      userId: reuslts.user.uid,
      name: reuslts.user.displayName,
      profilePhoto: reuslts.user.photoURL,
      isAuth: true,
    };

    localStorage.setItem("auth", JSON.stringify(authInfo));
    navigate("/");
  };

  return (
    <div>
      <p>Sign in with googleto continue</p>
      test
      <button onClick={signInWithGoodle}>Sign in with google</button>
    </div>
  );
};
