import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../../src/img/logo.png";
import { AuthContext } from "../../utilities/authContext";
import "./Navbar.scss";
import login from "../../img/login.png";
import Dropdown from "../DropDown/DropDown";
import logoIcon from "../../img/logo_tuition.png";
export default function Navbar() {
  const { currentUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);

  return (
    <div className="nav-container">
      <div className="logo">
        <Link to="/" className="logo-text-container">
          <h1 className="logo-text">
            <img src={logoIcon} />
          </h1>
        </Link>
      </div>
      <div className="user">
        <div>
          <i>{currentUser?.user_name}</i>
        </div>

        <Dropdown
          visible={visible}
          onClick={() => {
            setVisible(!visible);
          }}
          img={
            currentUser && currentUser.user_img ? (
              <div>
                <img src={`${currentUser.user_img}`} alt="user-img" />
              </div>
            ) : (
              <img src={login} alt="loing-icon" />
            )
          }
        >
          {visible && currentUser ? (
            <div className="drop-down-list">
              <p>
                <Link
                  className="link"
                  to={`/user/${currentUser.id}`}
                  state={currentUser}
                >
                  Your profile
                </Link>
              </p>
              <p>
                <Link className="link" to="/write">
                  Create post
                </Link>
              </p>
              <p
                onClick={() => {
                  logout();
                  navigate("/");
                }}
              >
                Logout
              </p>
            </div>
          ) : (
            <div className="drop-down-list">
              <Link className="link" to="/login">
                Login
              </Link>
            </div>
          )}
        </Dropdown>
      </div>
    </div>
  );
}
