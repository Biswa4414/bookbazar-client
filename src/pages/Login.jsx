import React, { useState } from "react";
import "../pages/style.css";
import { FaFacebookF, FaGooglePlusG, FaLinkedinIn } from "react-icons/fa";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner";

const Login = () => {
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const loginSubmit = (event) => {
    event.preventDefault();
    const data = { loginId, password };

    // Check if any field is empty
    if (!loginId || !password) {
      enqueueSnackbar("Fill all the credentials", {
        variant: "error",
      });
      return;
    }

    // Check if user exists or not
    setLoading(true);
    axios
      .post("http://localhost:8000/books/login", data)
      .then((res) => {
        setLoading(false);
        console.log(res.data.exists === false);
        if (res.data.exists === false) {
          enqueueSnackbar("Email or Username not exist", {
            variant: "error",
          });
          return;
        } else if (res.data.pwExists === false) {
          enqueueSnackbar("Invalid Password", {
            variant: "error",
          });
          return;
        } else {
          setLoading(true);
          enqueueSnackbar("Login Successfully", { variant: "success" });
          navigate("/books");
        }
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar("Error", { variant: "error" });
        console.log(error);
      });
  };

  return (
    <div>
      <div className="form-container sign-in-container">
        <form onSubmit={loginSubmit}>
          <h1>Sign in</h1>
          {loading ? <Spinner /> : ""}
          <div className="social-container">
            <a href="https://www.facebook.com/" className="social">
              <FaFacebookF />
            </a>
            <a href="https://www.google.com/" className="social">
              <FaGooglePlusG />
            </a>
            <a href="https://www.linkedIn.com/" className="social">
              <FaLinkedinIn />
            </a>
          </div>
          <span>or use your account</span>
          <input
            type="text"
            placeholder="Enter your LoginId"
            name="loginId"
            onChange={(e) => setLoginId(e.target.value)}
          />
          <input
            type="password"
            name="password"
            placeholder="Enter your Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button>Sign In</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
