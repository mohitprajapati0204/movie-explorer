import React, { use, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { MOVIE_API } from "../utils/BaseUrl";
import "./moviesList.css";
import Loader from "../utils/Loader";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { ConfigContext } from "../contextApi/UserConfigContext";

function MoviesList() {
  const navigate = useNavigate();
  const location = useLocation();
  const [movieList, setMovieList] = useState([]);
  const [filteredMovieList, setFilteredMovieList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [favourites, setFavourites] = useState([]);
  const [totalResult, setTotalResult] = useState(0);
  const pageCount = Math.ceil(totalResult / 10);
  const [page, setPage] = useState(1);
  const { darkTheme, setDarkTheme } = useContext(ConfigContext);

  const [error, setError] = useState(null);
  const movie = location.state.movie;

  const [sort, setSort] = useState("default");

  const handlePageChange = (event, value) => {
    setPage(value);
    console.log("Current Page:", value);
  };

  const handleYear = () => {
    const sortedYear = [...movieList].sort(
      (a, b) => Number(a.Year) - Number(b.Year),
    );
    setFilteredMovieList(sortedYear);
  };

  const handleLatest = () => {
    const sortedLatest = [...movieList].sort(
      (a, b) => Number(b.Year) - Number(a.Year),
    );
    setFilteredMovieList(sortedLatest);
  };

  const handleAlphDescending = () => {
    const sortedAlpDescending = [...movieList].sort((a, b) =>
      b.Title.localeCompare(a.Title),
    );
    setFilteredMovieList(sortedAlpDescending);
  };

  const handleAlphabeticalSort = () => {
    const sortedMovies = [...movieList].sort((a, b) =>
      a.Title.localeCompare(b.Title),
    );
    setFilteredMovieList(sortedMovies);
  };

  const handleChange = (event) => {
    const value = event.target.value;
    setSort(value);

    switch (value) {
      case "alphabetical":
        handleAlphabeticalSort();
        break;
      case "descending":
        handleAlphDescending();
        break;
      case "year":
        handleYear();
        break;
      case "latest":
        handleLatest();
        break;
      default:
        setFilteredMovieList(movieList);
    }

    // if (value === "alphabetical") {
    //   handleAlphabeticalSort();
    // } else if (value === "descending") {
    //   handleAlphDescending();
    // } else if (value === "year") {
    //   handleYear();
    // } else if (value === "latest") {
    //   handleLatest();
    // } else {
    //   setFilteredMovieList(movieList);
    // }
  };

  const handleDetails = (id) => {
    navigate(`/movies/${id}`);
  };

  const fetchMoviesList = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${MOVIE_API}&s=${movie}&page=${page}`);
      const data = await response.json();
      if (data.Error) {
        setError(data.Error);
      }
      if (data.Search) {
        setMovieList(data.Search);
        setFilteredMovieList(data.Search);
      }
      if (data.totalResults) {
        setTotalResult(data.totalResults);
      }
    } catch (error) {
      console.log("error");
      setMovieList([]);
      setFilteredMovieList([]);
    } finally {
      setLoading(false);
    }
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

  useEffect(() => {
    fetchMoviesList();
    const favData = JSON.parse(localStorage.getItem("favourite_movies")) || [];

    setFavourites(favData);
  }, [page]);

  return (
    <div
      className="back-ground"
      style={{
        backgroundColor: darkTheme ? "#111" : "#fff",
        color: darkTheme ? "#fff" : "#111",
      }}
    >
      <div style={{ width: "100%", display: "flex" }}>
        <div
          style={{
            color: "white",
            width: "20%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div>
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth size="small">
                <InputLabel
                  id="demo-simple-select-label"
                  sx={{
                    color: "#b0b0b0",

                    "&.Mui-focused": {
                      color: "#90caf9",
                    },
                  }}
                >
                  Sort
                </InputLabel>

                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={sort}
                  label="Sort"
                  onChange={handleChange}
                  sx={{
                    backgroundColor: darkTheme ? "#111" : "#f2f2f2",
                    color: darkTheme ? "#fff" : "#111",

                    borderRadius: "10px",
                    width: "160px",

                    ".MuiOutlinedInput-notchedOutline": {
                      borderColor: "#555",
                    },

                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#90caf9",
                    },

                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#90caf9",
                      borderWidth: "2px",
                    },

                    "& .MuiSvgIcon-root": {
                      backgroundColor: darkTheme ? "#111" : "#f2f2f2",
                      color: darkTheme ? "#fff" : "#111",
                    },
                  }}
                  MenuProps={{
                    PaperProps: {
                      sx: {
                        backgroundColor: "#1e1e1e",
                        color: "white",
                      },
                    },
                  }}
                >
                  <MenuItem value="default">Default</MenuItem>
                  <MenuItem value="alphabetical">A-Z</MenuItem>
                  <MenuItem value="descending">Z-A</MenuItem>
                  <MenuItem value="year">Oldest</MenuItem>
                  <MenuItem value="latest">Latest</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </div>
        </div>
        <div className="movie-card">
          {loading && <Loader />}

          {filteredMovieList?.map((item, i) => {
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
                <br />
                {item.Year}
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
          {/* {movieList?.length === 0 && (
          <div style={{ color: "#fff" }}>No movie found!</div>
        )} */}
          {error && <div style={{ color: "#fff" }}>{error}</div>}
        </div>
      </div>
      {pageCount && (
        <div
          style={{
            marginTop: "16px",
            marginBottom: "16px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: darkTheme ? "#111" : "#f2f2f2",
            color: darkTheme ? "#fff" : "#111",
          }}
        >
          <Stack spacing={2}>
            <Pagination
              count={pageCount}
              page={page}
              onChange={handlePageChange}
              shape="rounded"
              variant="outlined"
              sx={{
                "& .MuiPaginationItem-root": {
                  borderColor: "#555",

                  backgroundColor: darkTheme ? "#111" : "#f2f2f2",
                  color: darkTheme ? "#fff" : "#111",
                },

                "& .MuiPaginationItem-root:hover": {
                  backgroundColor: darkTheme ? "#4b4848" : "#b3aeae6d",
                  color: darkTheme ? "#fff" : "#696464",
                },

                "& .Mui-selected": {
                  backgroundColor: "#00bcd4 !important",
                  color: "#fff",
                  borderColor: "#00bcd4",
                },

                "& .Mui-selected:hover": {
                  backgroundColor: "#0097a7 !important",
                },
              }}
            />
          </Stack>
        </div>
      )}

      <div
        className="footer"
        style={{
          backgroundColor: darkTheme ? "#111" : "#f2f2f2",
          color: darkTheme ? "#fff" : "#111",
        }}
      >
        <div>show</div>
        <div>okay</div>
      </div>
    </div>
  );
}

export default MoviesList;
