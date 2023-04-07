import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const auth = localStorage.getItem("auth");
  const navigate = useNavigate();

  // console.log(auth);
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const handleBack = () => {
    navigate(-1);
  };

  const location = useLocation();

  if (location.pathname === "/" || location.pathname === "/logIn") {
    localStorage.clear();
  }

  return (
    <div className="Nav">
      <img
        src="https://logos.textgiraffe.com/logos/logo-name/33549846-designstyle-african-l.png"
        alt="logo"
        style={{
          width: "225px",
          height: "75px",
          marginLeft: "20px",
        }}
      />

      <div
        className={auth ? "buttonsThree" : "buttonsTwo"}
        style={{
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        {auth && location.pathname !== "/" && location.pathname !== "/logIn" ? (
          <>
            <Link to="/">
              <button className="btn btn-warning" style={{ width: "75px" }}>
                Home
              </button>
            </Link>

            <button
              className="btn btn-secondary"
              onClick={handleBack}
              style={{ width: "75px" }}
            >
              Back
            </button>
            <button
              className="btn btn-danger"
              onClick={handleLogout}
              style={{ width: "75px" }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/">
              <button className="btn btn-warning" style={{ width: "75px" }}>
                Signup
              </button>
            </Link>

            <Link to="/login">
              <button className="btn btn-success" style={{ width: "75px" }}>
                Login
              </button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
