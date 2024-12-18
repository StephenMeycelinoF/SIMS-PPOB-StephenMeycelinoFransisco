import { useEffect, useState } from "react";
import { illustrasi_login, logo } from "../assets";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../slices/userApiSlice";
import { setCredentials } from "../slices/authSlice";
import Loader from "../components/Loader";
import { Button } from "@/components/ui/button";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate("/dashboard");
    }
  }, [navigate, userInfo]);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await login({ email, password }).unwrap();
      localStorage.setItem("userToken", res.data.token);
      dispatch(setCredentials({ ...res }));
      navigate("/dashboard");
    } catch (err) {
      console.log(err?.data?.message || err.error);
    }
  };

  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 items-center min-h-screen w-full">
      <div className="space-y-8 md:space-y-12 md:max-w-lg mx-4 sm:mx-auto w-full">
        <div className="flex items-center justify-center gap-2">
          <img src={logo} alt="LOGO" className="h-8 w-auto" />
          <h3 className="text-2xl font-semibold">SIMS PPOB</h3>
        </div>
        <h1 className="font-bold text-3xl text-center">
          Masuk atau buat akun untuk memulai
        </h1>
        <form onSubmit={handleLogin} className="space-y-8">
          <div className="space-y-4 md:space-y-8">
            <input
              type="email"
              placeholder="Masukkan email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-4 py-2 border rounded"
            />
            <input
              type="password"
              placeholder="Masukkan password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-4 py-2 border rounded"
            />
          </div>

          {isLoading && <Loader />}
          <div className="space-y-4 md:space-y-8">
            <Button
              type="submit"
              className="w-full p-5"
              isLoading={isLoading ? true : false}
            >
              Masuk
            </Button>

            <div className="flex items-center">
              <p className="mr-1">Belum punya akun? register</p>
              <Link
                to="/register"
                className="text-red-500 font-semibold hover:text-red-700"
              >
                disini
              </Link>
            </div>
          </div>
        </form>
      </div>
      <img
        src={illustrasi_login}
        alt="illustrasi_login"
        className="w-full h-screen object-center object-cover hidden lg:block"
      />
    </section>
  );
}

export default Login;
