import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  useGetProfileQuery,
  useUpdateProfileImgMutation,
  useUpdateProfileMutation,
} from "../slices/userApiSlice";
import Loader from "../components/Loader";
import { setCredentials } from "../slices/authSlice";
import { profile_photo } from "../assets";
import { Pencil } from "lucide-react";

function Account() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    data,
    isLoading: profileLoading,
    isError,
    error,
    refetch,
  } = useGetProfileQuery();
  const [updateProfile] = useUpdateProfileMutation();
  const [updateProfileImg] = useUpdateProfileImgMutation();

  useEffect(() => {
    if (isError && error?.status === 401) {
      alert("Token kadaluarsa, silakan login ulang.");
      localStorage.removeItem("userToken");
      navigate("/login");
    }
  }, [isError, error, navigate]);

  useEffect(() => {
    if (data?.data) {
      setEmail(data.data.email || "");
      setFirstName(data.data.first_name || "");
      setLastName(data.data.last_name || "");
      setProfileImage(data.data.profile_image || "");
      setImagePreview(data.data.profile_image || "");
    }
  }, [data]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const uploadImage = async () => {
    const formData = new FormData();
    formData.append("file", profileImage);

    try {
      const res = await updateProfileImg(formData).unwrap();
      if (res?.data?.profile_image) {
        setImagePreview(res.profile_image);
        alert("Gambar profil berhasil diperbarui");
        dispatch(setCredentials({ ...res.data }));
      }
    } catch (err) {
      console.error(err);
      alert("Gagal mengunggah gambar profil");
    }
  };

  const handlerSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await updateProfile({
        email,
        first_name: firstName,
        last_name: lastName,
        profile_image: profileImage,
      }).unwrap();
      dispatch(setCredentials({ ...res }));

      if (profileImage && typeof profileImage !== "string") {
        await uploadImage();
      }

      alert("Profil berhasil diperbarui");
      refetch();
      setIsEditing(false);
    } catch (err) {
      alert(err?.data?.message || err.error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    dispatch(setCredentials(null));
    navigate("/login");
  };

  if (profileLoading) return <Loader />;

  return (
    <section className="w-full max-w-xl mx-auto">
      <div className="flex flex-col items-center justify-center mt-16 space-y-4">
        <form
          onSubmit={handlerSubmit}
          className="flex flex-col w-full items-center space-y-5"
        >
          <div className="relative">
            <img
              src={imagePreview || profile_photo}
              alt="Profile"
              className="w-32 h-32 object-cover rounded-full border-2 border-gray-300"
            />

            <div className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-md cursor-pointer">
              <Pencil
                size={12}
                color="#4B5563"
                onClick={() =>
                  document.querySelector('input[type="file"]').click()
                }
              />
            </div>

            <input
              type="file"
              accept="image/*"
              className="absolute inset-0 opacity-0 cursor-pointer"
              onChange={handleImageChange}
              disabled={!isEditing}
            />
          </div>

          <div>
            <h1 className="text-2xl font-semibold">
              {data.data.first_name + " " + data.data.last_name}
            </h1>
          </div>

          <div className="w-full space-y-1">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="Masukkan email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-4 py-2 border rounded"
              disabled={!isEditing}
            />
          </div>

          <div className="w-full space-y-1">
            <label htmlFor="firstName">Nama Depan</label>
            <input
              type="text"
              placeholder="Nama depan"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full p-4 py-2 border rounded"
              disabled={!isEditing}
            />
          </div>

          <div className="w-full space-y-1">
            <label htmlFor="lastName">Nama Belakang</label>
            <input
              type="text"
              placeholder="Nama belakang"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full p-4 py-2 border rounded"
              disabled={!isEditing}
            />
          </div>

          <div className="flex flex-col space-y-4 w-full">
            {!isEditing && (
              <>
                <button
                  className="bg-red-500 w-full text-white p-2 rounded"
                  onClick={() => setIsEditing(true)}
                >
                  Edit Profile
                </button>
                <button
                  className="bg-white text-red-500  w-full border border-red-500 p-2 rounded"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </>
            )}
          </div>

          {isEditing && (
            <button
              className="w-full bg-red-500 text-white p-4 py-2 rounded"
              type="submit"
            >
              Simpan
            </button>
          )}
        </form>
      </div>
    </section>
  );
}

export default Account;
