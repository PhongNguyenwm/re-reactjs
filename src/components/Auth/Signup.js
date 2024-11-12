import React, { useState } from "react";
import "./Login.scss";
import { BsChevronDoubleLeft } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { postSignup } from "../../services/apiService";
import { toast } from "react-toastify";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const handleSignup = async () => {
    let res = await postSignup(email, password, username);
    console.log(res);
    if (res && res.EC === 0) {
      toast.success(res.EM);
      navigate("/");
    }
    if (res && res.EC !== 0) {
      toast.error(res.EM);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-container">
      <div className="header">
        <span>Have an account?</span>
        <button onClick={() => navigate("/login")}>Sign in</button>
      </div>
      <div className="title col-4 mx-auto">Test System</div>
      <div className="welcome col-4 mx-auto">Hello, Who's this?</div>
      <div className="content-form col-4 mx-auto">
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type={showPassword ? "text" : "password"}
            className="form-control add-icon"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="icon" onClick={() => toggleShowPassword()}>
            {!showPassword ? <BsEyeFill /> : <BsEyeSlashFill />}
          </div>
        </div>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <button onClick={() => handleSignup()}>Register</button>
        </div>
        <div className="back-homepage">
          <span onClick={() => navigate("/")}>
            <BsChevronDoubleLeft /> Back to HomePage
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
