import React, { useEffect, useState } from "react";
import axios from "./axios";
import "./Row.css";

function Row({
  title,
  mediaType = false,
  fetchUrl,
  isLargeRow = false,
  handleSetMovieOrTvClicked,
}) {
  const [moviesOrTvs, setMoviesOrTvs] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  // eslint-disable-next-line no-unused-vars
  const [loadedImages, setLoadedImages] = useState(0);
  const [showContent, setShowContent] = useState(false);
  const imageBaseUrl = import.meta.env.VITE_TMDB_IMAGE_BASE_URL;

  useEffect(() => {
    const abortController = new AbortController();

    async function fetchData() {
      setIsLoading(true);
      setLoadedImages(0);
      setShowContent(false);
      try {
        const request = await axios.get(fetchUrl, {
          signal: abortController.signal,
        });
        if (request.data?.results) {
          setMoviesOrTvs(request.data.results);
          setError(null);
        }
      } catch (error) {
        if (!abortController.signal.aborted) {
          console.error("Error fetching data:", error);
          setError("Failed to load content");
        }
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();

    return () => {
      abortController.abort();
    };
  }, [fetchUrl]);

  const handleImageLoad = () => {
    setLoadedImages((prev) => {
      const newCount = prev + 1;
      // Calculate the number of valid items (with either poster_path or backdrop_path)
      const validItems = moviesOrTvs.filter(
        (item) =>
          (isLargeRow && item.poster_path) ||
          (!isLargeRow && item.backdrop_path)
      ).length;

      // Show content when 50% of images are loaded
      if (newCount >= validItems * 0.5 && !showContent) {
        setShowContent(true);
      }
      return newCount;
    });
  };

  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = "https://via.placeholder.com/300x450?text=No+Image";
    handleImageLoad(); // Count error images as loaded
  };

  if (error) {
    return (
      <div className="row">
        <h2>{title}</h2>
        <div className="row__error">{error}</div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="row">
        <h2>{title}</h2>
        <div className="row__loading">Loading...</div>
      </div>
    );
  }

  return (
    <div className="row">
      <h2>{title}</h2>
      {!showContent && <div className="row__loading">Loading images...</div>}
      <div
        className={`row__posters__container ${showContent ? "show" : "hide"}`}
      >
        <div className="row__posters">
          {moviesOrTvs.map(
            (movieOrTv) =>
              ((isLargeRow && movieOrTv.poster_path) ||
                (!isLargeRow && movieOrTv.backdrop_path)) && (
                <div key={movieOrTv.id} className="row__poster-container">
                  <img
                    className={`row__poster ${
                      isLargeRow ? "row__posterLarge" : ""
                    }`}
                    src={`${imageBaseUrl}${
                      isLargeRow
                        ? movieOrTv.poster_path
                        : movieOrTv.backdrop_path
                    }`}
                    alt={movieOrTv.name || movieOrTv.title || "Movie poster"}
                    onClick={() =>
                      handleSetMovieOrTvClicked(movieOrTv, mediaType)
                    }
                    onLoad={handleImageLoad}
                    onError={handleImageError}
                    loading="lazy"
                  />
                  <p className="row__poster__name">
                    {movieOrTv.original_name || movieOrTv.original_title}
                  </p>
                </div>
              )
          )}
        </div>
      </div>
    </div>
  );
}

export default Row;
