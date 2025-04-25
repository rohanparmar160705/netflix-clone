import React, { useEffect } from "react";
import axios from "./axios";
import "./Banner.css";
import requests from "./Requests";

function Banner({
  firstTimeLoad,
  movieOrTvClicked,
  handleSetMovieOrTvForBanner,
  movieOrTvForBanner,
  handleShowYTModal,
}) {
  const returnYTTrailerIframeURL = (movieOrTvKey) => {
    return `https://www.youtube.com/embed/${movieOrTvKey}?autoplay=1&cc_load_policy=1&controls=1&disablekb=0&enablejsapi=0&fs=1&iv_load_policy=1&loop=0&rel=0&showinfo=1&start=0&wmode=transparent&theme=dark&mute=0`;
  };

  useEffect(() => {
    async function fetchData() {
      let request = "";
      if (firstTimeLoad) {
        request = await axios.get(requests.fetchNetflixOriginals);
        if (movieOrTvForBanner?.length === 0) {
          const firstTimeLoadedBanner =
            request.data.results[
              Math.floor(Math.random() * request.data.results.length - 1)
            ];
          const firstTimeLoadedBannerTrailers = await axios.get(
            requests.fetchTvTrailer(firstTimeLoadedBanner?.id)
          );

          const firstTimeLoadedBannerCopy = {...firstTimeLoadedBanner}

          firstTimeLoadedBannerCopy.ytTrailerIframe = returnYTTrailerIframeURL(
            firstTimeLoadedBannerTrailers.data?.results[0]?.key
          );

          handleSetMovieOrTvForBanner(firstTimeLoadedBannerCopy);
        }
      }
      if (!firstTimeLoad && movieOrTvClicked?.id !== movieOrTvForBanner?.id) {
        if (
          movieOrTvClicked?.mediaType === "movie" ||
          movieOrTvClicked?.media_type === "movie"
        ) {
          request = await axios.get(
            requests.fetchMovieById(movieOrTvClicked?.id)
          );
          const movieDataWithTrailerIframe = request.data;
          const movieTrailers = await axios.get(
            requests.fetchMovieTrailer(movieDataWithTrailerIframe?.id)
          );
          const movieDataWithTrailerIframeCopy = {...movieDataWithTrailerIframe};
          if (movieTrailers.data.results[0]?.key) {
            movieDataWithTrailerIframeCopy.ytTrailerIframe =
              returnYTTrailerIframeURL(movieTrailers.data?.results[0]?.key);
          }
          handleSetMovieOrTvForBanner(movieDataWithTrailerIframeCopy);
        } else if (
          movieOrTvClicked?.mediaType === "tv" ||
          movieOrTvClicked?.media_type === "tv"
        ) {
          request = await axios.get(requests.fetchTvById(movieOrTvClicked?.id));
          const tvDataWithTrailerIframe = request.data;
          const tvTrailers = await axios.get(
            requests.fetchTvTrailer(tvDataWithTrailerIframe?.id)
          );
          const tvDataWithTrailerIframeCopy = {...tvDataWithTrailerIframe}
          if (tvTrailers.data?.results[0]?.key) {
            tvDataWithTrailerIframeCopy.ytTrailerIframe =
              returnYTTrailerIframeURL(tvTrailers.data?.results[0]?.key);
          }
          handleSetMovieOrTvForBanner(tvDataWithTrailerIframeCopy);
        }
      }
      return request;
    }
    fetchData();
  }, [
    firstTimeLoad,
    movieOrTvClicked?.id,
    movieOrTvClicked?.mediaType,
    movieOrTvClicked?.media_type,
    movieOrTvClicked,
    movieOrTvForBanner,
    handleSetMovieOrTvForBanner,
  ]);

  function truncate(string, n) {
    return string?.length > n ? string.substr(0, n - 1) + "..." : string;
  }
  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `linear-gradient(
          45deg,
          rgba(0, 0, 0, 1) 25%,
          rgba(0, 0, 0, 0) 100%
        ), url('https://image.tmdb.org/t/p/original/${movieOrTvForBanner?.backdrop_path}')`,
        backgroundPosition: "center center",
      }}
    >
      <div className="banner__contents">
        <h1 className="banner__title">
          {movieOrTvForBanner?.title ||
            movieOrTvForBanner?.name ||
            movieOrTvForBanner?.original_name}
        </h1>
        <div className="banner__buttons">
          <button
            className="banner__button banner__playButton"
            onClick={() =>
              movieOrTvForBanner.ytTrailerIframe && handleShowYTModal(true)
            }
          >
            Play
          </button>
          <button className="banner__button banner__listButton">My List</button>
        </div>
        <h1 className="banner__description">
          {truncate(movieOrTvForBanner?.overview, 150)}
        </h1>
      </div>
      <div className="banner__fadeBottom" />
    </header>
  );
}

export default Banner;
