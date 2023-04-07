import React, { useState } from "react";
import { useNavigate } from "react-router";

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;

    setData({
      ...data,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = data;

    const res = await fetch("http://localhost:5200/logIn", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        email,
        password,
      }),
    });

    const result = await res.json();

    if (result.error === "Invalid Credentials") {
      alert("Invalid Credentials");
    } else if (result.message === "You Have Logged In Successfully") {
      alert("You Have Logged In Successfully");
      localStorage.setItem("auth", true);
      navigate("/home");
    }
  };
  const showPassword = () => {
    setShow(true);
  };
  const hidePassword = () => {
    setShow(false);
  };

  return (
    <div className="login mt-5">
      <form onSubmit={handleSubmit} className="login-form">
        <label style={{ fontWeight: "bold" }}>E-mail</label>
        <input
          className="form-control"
          type="email"
          required
          autoComplete="off"
          name="email"
          value={data.email}
          onChange={handleChange}
        />
        <label style={{ fontWeight: "bold" }}>Password</label>

        <input
          className="form-control"
          type={show ? "text" : "password"}
          required
          maxLength="20"
          autoComplete="off"
          name="password"
          value={data.password}
          onChange={handleChange}
          style={{ position: "relative" }}
        />
        <span>
          <i
            className="fa-regular fa-eye"
            onMouseOver={showPassword}
            onMouseOut={hidePassword}
          />
        </span>
        <div>
          <input
            type="submit"
            value="User Login"
            className="btn btn-secondary"
            style={{ width: "120px" }}
          />
        </div>
      </form>
    </div>
  );
};

export default Login;
