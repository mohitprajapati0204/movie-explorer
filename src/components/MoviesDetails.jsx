import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MOVIE_API } from "../utils/BaseUrl";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { IoClose } from "react-icons/io5";

import "./moviesDetails.css";
import Loader from "../utils/Loader";
import { ConfigContext } from "../contextApi/UserConfigContext";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "black",
  border: "2px solid #000",
  boxShadow: 24,
  padding: "0 8px 8px 8px",
};

function MoviesDetails() {
  const params = useParams();
  const [details, setDetails] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { darkTheme, setDarkTheme } = useContext(ConfigContext);

  const handleBackDetails = () => {
    navigate(-1);
  };

  const fetchMoviesDetails = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${MOVIE_API}&i=${params.id}`);
      const data = await response.json();
      setDetails(data);
    } catch (error) {
      console.log(error);
      setDetails({});
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMoviesDetails();
  }, []);

  return (
    <div
      className="back-ground"
      style={{
        backgroundColor: darkTheme ? "#111" : "#fff",
        color: darkTheme ? "#fff" : "#111",
      }}
    >
      {loading && <Loader />}
      {!loading && details && (
        <div style={{ display: "flex", width: "100%" }}>
          <div style={{ width: "350%" }} onClick={handleOpen}>
            <img src={details.Poster} className="Img-detail" />
          </div>
          <div
            style={{
              width: "650%",
              color: "white",
              margin: "10% 10% 0 10%",
              color: darkTheme ? "#fff" : "#111",
            }}
          >
            <h1>Title: {details.Title}</h1>
            <h3>Released: {details.Released}</h3>
            <h3>Runtime: {details.Runtime}</h3>
            <h3>Director: {details.Director}</h3>
            <h3>Actors: {details.Actors}</h3>
            <h4>Awards: {details.Awards}</h4>
          </div>
        </div>
      )}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <IoClose
            onClick={() => setOpen(!open)}
            style={{ color: "white", float: "right", cursor: "pointer" }}
          />
          <img src={details?.Poster} style={{ width: "100%" }} />
        </Box>
      </Modal>
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

export default MoviesDetails;
