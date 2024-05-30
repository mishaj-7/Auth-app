import { useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import {
  updateUserStart,
  updateUserSucces,
  udpateUserFailiure,
  deleteUserAccountStart,
  deleteUserAccountSuccess,
  deleteUserAccountFailure,
  signOut
} from '../redux_toolkit/User/userSlice.js';


export default function Profile() {
  const fileRef = useRef(null);
  const dispatch = useDispatch();
  const [image, setImage] = useState(null);
  const [imagePercent, setImagePercent] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setupdateSuccess] = useState(false);
  //console.log(formData)

  const { currentUser, loading, error } = useSelector(state => state.user); // states comes from redux store
  // console.log(currentUser._id);

  useEffect(() => {
    if (image) {
      handleImageUpload(image);
    }
  }, [image]);

  const handleImageUpload = async (image) => {
    // console.log(image);
    const storage = getStorage(app);
    //console.log(storage);
    const fileName = new Date().getTime() + image.name; // which provide unique name every time
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on("state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100; // it gives the uplaoding percentage
        setImagePercent(Math.round(progress));
      },
      (err) => {
        // console.log(err);
        setImageError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
        .then((downloadURL) => setFormData({ ...formData, profilePicture: downloadURL }));
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
   // console.log(formData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.success === false) {
        dispatch(udpateUserFailiure(data));
        return; // update filiure it return here and
      };
      dispatch(updateUserSucces(data));
      setupdateSuccess(true);
    } catch (err) {
      dispatch(udpateUserFailiure(err))
      // console.log(err + ' cant update');
    }
  };
  
  const handleDeleteAccount = async () => {
    try {
      dispatch(deleteUserAccountStart());
      const res = await fetch(`api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserAccountFailure(data));
        return;
      };
      dispatch(deleteUserAccountSuccess());
    }
    catch (err) {
      dispatch(deleteUserAccountFailure(err))
    };
  };

  const handleSignOut = async () => {
    try {
      await fetch("/api/auth/signout/", { // this request just clear the cookie so uer automatically sign out
        method: "GET",
      });
      dispatch(signOut());
    }
    catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1
        className="text-3xl font-semibold
       text-center my-7"
      >
        Profile
      </h1>

      <form className = "flex flex-col gap-4" onSubmit = {handleSubmit} >
        <input
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />

        {/* this is not js we wrote inside firebase for only accept img file should 2mb or less 
        allow read;
        allow write: if 
        request.resource.size < 2 * 1024 *1024 &&
        request.resource.contentType.matches('image/.*') */}
        <a
          className="relative flex  h-24 w-24 m-auto hover cursor-pointer hover:opacity-80"
          onClick={() => fileRef.current.click()}
        >
          <img
            src={formData.profilePicture || currentUser.profilePicture}
            alt="profile"
            className="h-24 w-24 self-center cursor-pointer 
          rounded-full object-cover mt-2"
          />
          <div className="absolute inset-0 flex items-center justify-center text-black text-sm  opacity-0 hover:opacity-100 rounded-full">
            dp change
          </div>
        </a>
        <p className="text-sm self-center">
          {imageError ? (
            <span className="text-red-700">
              check file is image and size &lt; 2mb
            </span>
          ) : imagePercent > 0 && imagePercent < 100 ? (
            <span className="text-slate-700">{`Uploading: 
            ${imagePercent} '%'`}</span>
          ) : imagePercent === 100 ? (
            <span className="text-green-700">Uplaod succesfull</span>
          ) : (
            ""
          )}
        </p>
        <input
          defaultValue={currentUser.username}
          type="text"
          id="username"
          placeholder="Username"
          className="bg-slate-100 rounded-lg p-3"
          onChange={handleChange}
        />
        <input
          defaultValue={currentUser.email}
          type="email"
          id="email"
          placeholder="Email"
          className="bg-slate-100 rounded-lg p-3"
          onChange={handleChange}
        />
        <input
          type="password"
          id="Password"
          placeholder="Password"
          className="bg-slate-100 rounded-lg p-3"
          onChange={handleChange}
        />
        <button
          className="bg-slate-700 text-white p-3 
        rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? 'Loading...' : 'Update'}
        </button>
      </form>

      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer"
        onClick={handleDeleteAccount}
        >Delete Account</span>
        <span className="text-red-700 cursor-pointer"
        onClick={handleSignOut}
        >Sign Out</span>
      </div>
      <p className='text-red-700 mt-5 text-[18px]'>{error && 'something went wrong singin and try again !!!'}</p>
      <p className='text-green-700 mt-5'>{updateSuccess && 'user updated succesfully \u{1F44F}'}</p>
    </div>
  );
};
