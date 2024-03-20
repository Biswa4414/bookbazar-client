import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import axios from "axios";
import Spinner from "../components/Spinner";
import { FaFacebookF, FaGooglePlusG, FaLinkedinIn } from "react-icons/fa";

const Register = ({ onRegisterSuccess }) => {
  const [registerId, setRegisterId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [isAuthenticated, setIsAuthenticated] = useState("false");

  const submit = (event) => {
    event.preventDefault();
    const data = { name, email, username, password };
    // Check if any field is empty
    if (!name || !email || !username || !password) {
      enqueueSnackbar("Fill all the credentials", {
        variant: "error",
      });
      return;
    }
    // Validate name length
    if (name.length < 3 || name.length > 30) {
      enqueueSnackbar("Name should be between 3 and 30 characters", {
        variant: "error",
      });
      return;
    }
    if (username.length < 3 || username.length > 30) {
      enqueueSnackbar("Username should be between 3 and 30 characters", {
        variant: "error",
      });
      return;
    }
    // Check email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      enqueueSnackbar("Enter a valid email address", {
        variant: "error",
      });
      return;
    }
    // Check if user already exists
    setLoading(true);
    axios
      .post("http://localhost:8000/books/register", data)

      .then((res) => {
        console.log(res.data.emailExists === true);
        if (res.data.emailExists === true) {
          enqueueSnackbar("Email already exists", {
            variant: "error",
          });
          setLoading(false);
          return;
        } else if (res.data.usernameExists === true) {
          enqueueSnackbar("Username already exists", {
            variant: "error",
          });
          setLoading(false);
          return;
        } else if (res.data.exists === true) {
          enqueueSnackbar("Email or Username already exists", {
            variant: "error",
          });
          setLoading(false);
          return;
        }
        setLoading(false);
        enqueueSnackbar("Register Successfully", { variant: "success" });
        onRegisterSuccess();
        setIsAuthenticated(true);
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar("Error in registration", { variant: "error" });
        console.log(error);
      });
  };

  return (
    <div className="body">
      <div className="form-container sign-in-container">
        <form onSubmit={submit}>
          <h1>Register Form</h1>
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
          <span>or use your email for registration</span>
          <input
            type="text"
            name="name"
            placeholder="Enter your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            name="email"
            placeholder="Enter your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            name="username"
            placeholder="Enter your Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            name="password"
            placeholder="Enter your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />{" "}
          <button>Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
