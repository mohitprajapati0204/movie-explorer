import React, { useContext, useEffect, useState } from "react";
import "./favourite.css";
import { Navigate } from "react-router-dom";
import { ConfigContext } from "../contextApi/UserConfigContext";

function Favourite() {
  const [favourites, setFavourites] = useState([]);
  const { darkTheme, setDarkTheme } = useContext(ConfigContext);

  const handleDetails = (id) => {
    Navigate(`/movies/${id}`);
  };

  const handleAddToFavourite = (e, item) => {
    e.stopPropagation();

    const updatedFav = [...favourites, item];

    setFavourites(updatedFav);

    localStorage.setItem("favourite_movies", JSON.stringify(updatedFav));
  };

  const handleRemoveFavourite = (e, item) => {
    e.stopPropagation();
    const updatedFav = favourites.filter((m) => m.imdbID !== item.imdbID);

    setFavourites(updatedFav);

    localStorage.setItem("favourite_movies", JSON.stringify(updatedFav));
  };

  const isFavourite = (id) => {
    return favourites.some((movie) => movie.imdbID === id);
  };

  console.log(favourites);
  useEffect(() => {
    const favData = JSON.parse(localStorage.getItem("favourite_movies")) || [];

    setFavourites(favData);
  }, []);

  return (
    <div
      className="back-ground"
      style={{
        backgroundColor: darkTheme ? "#111" : "#fff",
        color: darkTheme ? "#fff" : "#111",
      }}
    >
      <div className="favourite-title">Favourite Movies</div>
      <div className="movie-card">
        {favourites?.map((item, i) => {
          return (
            <div
              key={i}
              className="img-card"
              style={{
                color: darkTheme ? "#fff" : "#111",
              }}
              onClick={() => handleDetails(item.imdbID)}
            >
              <img src={item.Poster} className="src-card" />
              {item.Title}
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {!isFavourite(item.imdbID) ? (
                  <button onClick={(e) => handleAddToFavourite(e, item)}>
                    Add Favourite
                  </button>
                ) : (
                  <button
                    style={{ background: "red", color: "white" }}
                    onClick={(e) => handleRemoveFavourite(e, item)}
                  >
                    Remove Favourite
                  </button>
                )}
              </div>
            </div>
          );
        })}
        <div
          className="footer"
          style={{
            backgroundColor: darkTheme ? "#111" : "#f2f2f2",
            color: darkTheme ? "#fff" : "#111",
          }}
        >
          <div>Show</div>
          <div>off</div>
        </div>
      </div>
    </div>
  );
}

export default Favourite;
