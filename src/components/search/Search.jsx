import { useContext, useState } from "react";
import "./search.css";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { ConfigContext } from "../../contextApi/UserConfigContext";
import { IoMdPlay } from "react-icons/io";
import { IoIosFlash } from "react-icons/io";
import { FaStar } from "react-icons/fa";
import { MdResetTv } from "react-icons/md";

const featureData = [
  {
    title: "Extensive Library",
    description: "Thousands of movies and TV shows",
    icon: <IoMdPlay />,
    color: "red",
  },
  {
    title: "Fast Search",
    description: "Find any movie or show in seconds",
    icon: <IoIosFlash />,
    color: "purple",
  },
  {
    title: "Personlized",
    description: "Get recommendations you'll love",
    icon: <FaStar />,
    color: "yellow",
  },
  {
    title: "Watch Anywhere",
    description: "On any device, anytime, anywhere",
    icon: <MdResetTv />,
    color: "green",
  },
];

function Search() {
  const [movie, setMovie] = useState("");

  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();
  const { darkTheme, setDarkTheme } = useContext(ConfigContext);

  const handleSubmit = () => {
    navigate("/movies", {
      state: { movie },
    });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (!movie.trim()) {
        enqueueSnackbar("Please enter a movie name", {
          autoHideDuration: 4000,
          variant: "error",
        });
        return;
      }
      handleSubmit();
    }
  };

  return (
    <div className={`container ${darkTheme ? "darkTheme" : "lightTheme"}`}>
      <div className="search-box">
        <h1
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          Unlimited Movies,TV
        </h1>
        <h1 style={{ display: "flex", justifyContent: "center" }}>
          Shows and More
        </h1>
        <h3 style={{ display: "flex", justifyContent: "center" }}>
          Watch anywhere
        </h3>
        <input
          onChange={(event) => setMovie(event.target.value)}
          value={movie}
          type="text"
          placeholder="Movies search..."
          onKeyDown={handleKeyDown}
        />

        <div className="search-btn">
          <button onClick={handleSubmit} disabled={!movie}>
            Search
          </button>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "#000000a8",
          padding: "16px",
        }}
      >
        {featureData.map((item, i) => (
          <div
            key={item.title}
            style={{
              display: "flex",
              alignItems: "center",
              width: "220px",
              margin: "0 24px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                fontSize: "25px",
                border: `2px solid ${item.color}`,
                borderRadius: "50%",
                height: "40px",
                width: "40px",
                minWidth: "40px",
                justifyContent: "center",
                color: item.color,
              }}
            >
              {item.icon}
            </div>
            <div style={{ marginLeft: "8px", fontSize: "18px" }}>
              <div>{item.title}</div>
              <div style={{ fontSize: "13px", color: "#a19c9c" }}>
                {item.description}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Search;
