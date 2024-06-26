import { useState } from "react";
import { Link, useNavigate} from "react-router-dom";
import { signInStart, signFailure, signInSuccess } from "../redux_toolkit/User/userSlice.js";
import { useDispatch, useSelector } from "react-redux";
import OAuth from "../components/OAuth";


export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    if (error) {
      dispatch(signFailure(null));
    }
    // console.log(formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      // Handle the case where one or both fields are empty
      dispatch(
        signFailure({ message: "Please enter your email and password" })
      );
      return;
    }

    try {
      // setLoading(true);
      // setError(false);
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      
      // setLoading(false);
         console.log(data.success);
      
      if (data.success === false) {
        dispatch(signFailure(data))
        //setError(true);
        return;
      }
      dispatch(signInSuccess(data));
      navigate('/') // this function nvavigate to route we provde in it
    } catch (err) {
      //console.log(err) // error come from back end and its text messge we add state value and print the value on dom
    dispatch(signFailure(err))
      // setLoading(false);
      // setError(true);
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
       
        <input
          type="email"
          placeholder="Email"
          id="email"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-green-900 text-white
        rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "Loading..." : "Sign In"}
        </button>
      <OAuth />
      </form>
      <div className="flex gap-2 mt-5">
        <p>Dont Have an account ?</p>
        <Link to="/sign-up">
          <span className="text-blue-500">Sign Up</span>
        </Link>
      </div>
      <p className="text-red-700 mt-5">{error ? error.message || "somthing went wrong!!": ''}</p>
    </div>
  );
}
