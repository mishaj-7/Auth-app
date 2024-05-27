import { useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';

export default function Profile() {
  const fileRef = useRef(null);
  const [image, setImage] = useState(null);
  const [imagePercent, setImagePercent] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [formData, setFormData] = useState({});
  //console.log(formData)

  const { currentUser } = useSelector(state => state.user);
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

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1
        className="text-3xl font-semibold
       text-center my-7"
      >
        Profile
      </h1>

      <form className="flex flex-col gap-4">
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
        />
        <input
          defaultValue={currentUser.email}
          type="email"
          id="email"
          placeholder="Email"
          className="bg-slate-100 rounded-lg p-3"
        />
        <input
          type="password"
          id="Password"
          placeholder="Password"
          className="bg-slate-100 rounded-lg p-3"
        />
        <button
          className="bg-slate-700 text-white p-3 
        rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          update
        </button>
      </form>

      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer">Delete Account</span>
        <span className="text-red-700 cursor-pointer">Sign Out</span>
      </div>
    </div>
  );
}
