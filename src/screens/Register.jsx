import { useEffect, useState } from "react";
import { logo } from "../assets";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import { useRegisterMutation } from "../slices/userApiSlice";
import { setCredentials } from "../slices/authSlice";
import { useNavigate } from "react-router-dom";

function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  console.log(password, confirmPassword);
  
  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [register, { isLoading }] = useRegisterMutation();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate("/dashboard");
    }
  }, [navigate, userInfo]);

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Password dan konfirmasi password tidak cocok");
    } else {
      try {
        const res = await register({
          first_name: firstName,
          last_name: lastName,
          email,
          password,
        }).unwrap();
        
        dispatch(setCredentials({ ...res }));
        navigate("/");
      } catch (err) {
        console.log(err?.data?.message || err.error);
      }
    }
  };

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 justify-between h-screen w-full">
      {/* Left Content */}
      <div className="flex flex-col items-center justify-center h-screen space-y-4">
        <div className="flex gap-1 items-center">
          <img src={logo} alt="logo" className="w-8 h-8" />
          <h3 className="font-semibold">SIMB PPOB</h3>
        </div>

        <div className="text-center">
          <h1 className="text-2xl font-semibold">
            Masuk atau buat akun untuk memulai
          </h1>
        </div>

        <form
          onSubmit={handleRegister}
          className="flex flex-col w-full space-y-3"
        >
          <input
            type="email"
            placeholder="Masukkan email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-4 py-2 border rounded"
          />
          <input
            type="text"
            placeholder="Nama depan"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full p-4 py-2 border rounded"
          />
          <input
            type="text"
            placeholder="Nama belakang"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full p-4 py-2 border rounded"
          />
          <input
            type="password"
            placeholder="Masukkan password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-4 py-2 border rounded"
          />
          <input
            type="password"
            placeholder="Masukkan konfimasi password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-4 py-2 border rounded"
          />

          {isLoading && <Loader />}
          <button
            className="w-full bg-red-500 text-white p-4 py-2 rounded"
            type="submit"
          >
            Register
          </button>
        </form>
      </div>

      {/* Right Content */}
    </section>
  );
}

export default Register;
