import React, { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { IoSunny } from "react-icons/io5";
import { FaMoon } from "react-icons/fa";
import "./header.css";
import { ConfigContext } from "../../contextApi/UserConfigContext";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const { darkTheme, setDarkTheme } = useContext(ConfigContext);

  const handleFavourite = () => {
    navigate("/favourite-movie");
  };

  const handleChangeTheme = () => {
    setDarkTheme(!darkTheme);
  };

  function handleHomePage() {
    navigate("/");
    // window.open("/", "_blank", "noopener,noreferrer");
  }

  return (
    <div>
      <div
        className="header"
        style={{
          backgroundColor: darkTheme ? "#111" : "#f2f2f2",
          color: darkTheme ? "#fff" : "#111",
        }}
      >
        <div>
          {location.pathname !== "/" && (
            <button className="back-button" onClick={() => navigate(-1)}>
              Back
            </button>
          )}
        </div>
        <div
          style={{ cursor: "pointer", fontWeight: "700" }}
          onClick={handleHomePage}
        >
          Movies searcher
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {location.pathname !== "/favourite-movie" && (
            <button className="favourite" onClick={handleFavourite}>
              Favourite
            </button>
          )}

          {darkTheme ? (
            <IoSunny
              size={20}
              onClick={handleChangeTheme}
              style={{ color: "yellow", cursor: "pointer" }}
            />
          ) : (
            <FaMoon
              onClick={handleChangeTheme}
              style={{ color: "blue", cursor: "pointer" }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
