import React, { useState } from "react";
import Banner from "../Banner";
import Footer from "../Footer";
import Nav from "../Nav";
import requests from "../Requests";
import Row from "../Row";
import "./HomeScreen.css";
import YTFrameContainer from "./YTFrameContainer";

function HomeScreen() {
  const [firstTimeLoad, setFirstTimeLoad] = useState(true);
  const [movieOrTvForBanner, setMovieOrTvForBanner] = useState([]);
  const [movieOrTvClicked, setMovieOrTvClicked] = useState(null);
  const [showYTModal, setShowYTModal] = useState(false);

  const handleSetMovieOrTvClicked = (movieOrTvClicked, mediaType) => {
    const newMovieOrTvClicked = { ...movieOrTvClicked };
    newMovieOrTvClicked.mediaType = mediaType;
    setFirstTimeLoad(false);
    setMovieOrTvClicked(newMovieOrTvClicked);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSetMovieOrTvForBanner = (movieOrTvForBanner) => {
    setMovieOrTvForBanner(movieOrTvForBanner);
  };

  const handleShowYTModal = (state) => {
    setShowYTModal(state);
  };
  return (
    <div className="homeScreen">
      {showYTModal && (
        <YTFrameContainer
          key={movieOrTvForBanner.id}
          handleShowYTModal={handleShowYTModal}
          movieOrTvForBanner={movieOrTvForBanner}
        />
      )}
      <Nav />
      <Banner
        firstTimeLoad={firstTimeLoad}
        movieOrTvClicked={movieOrTvClicked}
        handleSetMovieOrTvForBanner={handleSetMovieOrTvForBanner}
        movieOrTvForBanner={movieOrTvForBanner}
        handleShowYTModal={handleShowYTModal}
      />
      <Row
        title="NETFLIX ORIGINALS"
        mediaType="tv"
        fetchUrl={requests.fetchNetflixOriginals}
        isLargeRow
        handleSetMovieOrTvClicked={handleSetMovieOrTvClicked}
      />
      <Row
        title="Trending Now"
        mediaType="movie"
        fetchUrl={requests.fetchTopRated}
        handleSetMovieOrTvClicked={handleSetMovieOrTvClicked}
      />
      <Row
        title="Popular TV Shows"
        mediaType="tv"
        fetchUrl={requests.fetchPopularTVShows}
        handleSetMovieOrTvClicked={handleSetMovieOrTvClicked}
      />
      <Row
        title="Upcoming Movies"
        mediaType="movie"
        fetchUrl={requests.fetchUpcoming}
        handleSetMovieOrTvClicked={handleSetMovieOrTvClicked}
      />
      <Row
        title="Action Movies"
        mediaType="movie"
        fetchUrl={requests.fetchActionMovies}
        handleSetMovieOrTvClicked={handleSetMovieOrTvClicked}
      />
      <Row
        title="Comedy Movies"
        mediaType="movie"
        fetchUrl={requests.fetchComedyMovies}
        handleSetMovieOrTvClicked={handleSetMovieOrTvClicked}
      />
      <Row
        title="Horror Movies"
        mediaType="movie"
        fetchUrl={requests.fetchHorrorMovies}
        handleSetMovieOrTvClicked={handleSetMovieOrTvClicked}
      />
      <Row
        title="Romance Movies"
        mediaType="movie"
        fetchUrl={requests.fetchRomanceMovies}
        handleSetMovieOrTvClicked={handleSetMovieOrTvClicked}
      />
      <Row
        title="Family Movies"
        mediaType="movie"
        fetchUrl={requests.fetchFamilyMovies}
        handleSetMovieOrTvClicked={handleSetMovieOrTvClicked}
      />
      <Row
        title="Sci-Fi & Fantasy"
        mediaType="movie"
        fetchUrl={requests.fetchSciFiFantasy}
        handleSetMovieOrTvClicked={handleSetMovieOrTvClicked}
      />
      <Row
        title="Crime & Thrillers"
        mediaType="movie"
        fetchUrl={requests.fetchCrimeThrillers}
        handleSetMovieOrTvClicked={handleSetMovieOrTvClicked}
      />
      <Row
        title="Award-Winning Films"
        mediaType="movie"
        fetchUrl={requests.fetchAwardWinning}
        handleSetMovieOrTvClicked={handleSetMovieOrTvClicked}
      />
      <Row
        title="International Movies"
        mediaType="movie"
        fetchUrl={requests.fetchInternational}
        handleSetMovieOrTvClicked={handleSetMovieOrTvClicked}
      />
      <Row
        title="Anime"
        mediaType="tv"
        fetchUrl={requests.fetchAnime}
        handleSetMovieOrTvClicked={handleSetMovieOrTvClicked}
      />
      <Row
        title="Drama Series"
        mediaType="tv"
        fetchUrl={requests.fetchDramaSeries}
        handleSetMovieOrTvClicked={handleSetMovieOrTvClicked}
      />
      <Row
        title="Reality TV"
        mediaType="tv"
        fetchUrl={requests.fetchRealityTV}
        handleSetMovieOrTvClicked={handleSetMovieOrTvClicked}
      />
      <Row
        title="Documentaries"
        mediaType="movie"
        fetchUrl={requests.fetchDocumentaries}
        handleSetMovieOrTvClicked={handleSetMovieOrTvClicked}
      />
      <Footer />
    </div>
  );
}

export default HomeScreen;
