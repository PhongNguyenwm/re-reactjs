import React, { useState } from "react";
import "./Login.scss";
import { BsChevronDoubleLeft } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { postLogin } from "../../services/apiService";
import { toast } from "react-toastify";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    let res = await postLogin(email, password);
    if (res && res.EC === 0) {
      toast.success(res.EM);
      navigate("/");
    }
    if (res && res.EC !== 0) {
      toast.error(res.EM);
    }
  };

  return (
    <div className="login-container">
      <div className="header">
        <span>Don't have an account yet?</span>
        <button>Sign up</button>
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
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <span>Forgot password?</span>
        <div>
          <button onClick={() => handleLogin()}>Login</button>
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
