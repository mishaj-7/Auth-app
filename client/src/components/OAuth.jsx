import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux_toolkit/User/userSlice";

export default function OAuth() {
  const dispatch = useDispatch();

  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      // console.log(result);
      const res = await fetch("api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });
       // console.log(res);
      const data = await res.json();
      console.log(data)
      dispatch(signInSuccess(data));
    } catch (err) {
      console.log("login not accept by google", err);
    }
  };

  return (
    <button
      type="button"
      onClick={handleGoogleClick}
      className="bg-yellow-950 text-white rounded-lg
          p-3 uppercase hover:opacity-95"
    >
      continue with google
    </button>
  );
}
