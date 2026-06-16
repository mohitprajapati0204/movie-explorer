import { BrowserRouter, Routes, Route } from "react-router-dom";

import Search from "../components/search/Search";
import MoviesList from "../components/MoviesList";
import MoviesDetails from "../components/MoviesDetails";
import Favourite from "../components/Favourite";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Search />} />
      <Route path="/movies" element={<MoviesList />} />
      <Route path="/movies/:id" element={<MoviesDetails />} />
      <Route path="/favourite-movie" element={<Favourite />} />
    </Routes>
  );
}

export default AppRoutes;
