import React, { useEffect, useState, useRef, useCallback } from "react";
import axios from "./axios";
import "./Banner.css";
import requests from "./Requests";
import { VolumeUp, VolumeMute, Pause, Play } from "react-bootstrap-icons";

function Banner({
  firstTimeLoad,
  movieOrTvClicked,
  handleSetMovieOrTvForBanner,
  movieOrTvForBanner,
  handleShowYTModal,
}) {
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const iframeRef = useRef(null);
  const scrollTimeout = useRef(null);

  const returnYTTrailerIframeURL = useCallback(
    (movieOrTvKey, autoplay = true, muted = true) => {
      if (!movieOrTvKey) return null;
      return `https://www.youtube.com/embed/${movieOrTvKey}?autoplay=${
        autoplay ? 1 : 0
      }&cc_load_policy=1&controls=0&disablekb=1&fs=0&iv_load_policy=3&loop=1&rel=0&showinfo=0&start=0&mute=${
        muted ? 1 : 0
      }&playlist=${movieOrTvKey}&enablejsapi=1`;
    },
    []
  );

  // Debounced scroll handler
  const handleScroll = useCallback(() => {
    if (scrollTimeout.current) {
      window.cancelAnimationFrame(scrollTimeout.current);
    }

    scrollTimeout.current = window.requestAnimationFrame(() => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const halfwayPoint = windowHeight / 2;

      if (scrollPosition > halfwayPoint) {
        if (!isMuted) handleMute(true);
        if (isPlaying) handlePlayPause(false);
      } else {
        if (isMuted) handleMute(false);
        if (!isPlaying) handlePlayPause(true);
      }
    });
  }, [isMuted, isPlaying]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout.current) {
        window.cancelAnimationFrame(scrollTimeout.current);
      }
    };
  }, [handleScroll]);

  const handleMute = useCallback(
    (shouldMute) => {
      if (movieOrTvForBanner?.ytKey && shouldMute !== isMuted) {
        setIsMuted(shouldMute);
        const newSrc = returnYTTrailerIframeURL(
          movieOrTvForBanner.ytKey,
          isPlaying,
          shouldMute
        );
        if (iframeRef.current && newSrc) {
          iframeRef.current.src = newSrc;
        }
      }
    },
    [isMuted, isPlaying, movieOrTvForBanner?.ytKey, returnYTTrailerIframeURL]
  );

  const handlePlayPause = useCallback(
    (shouldPlay) => {
      if (movieOrTvForBanner?.ytKey && shouldPlay !== isPlaying) {
        setIsPlaying(shouldPlay);

        if (shouldPlay) {
          const newSrc = returnYTTrailerIframeURL(
            movieOrTvForBanner.ytKey,
            true,
            true // Always start muted when playing
          );
          if (iframeRef.current && newSrc) {
            iframeRef.current.src = newSrc;
            // Unmute after 2 seconds of playing
            setTimeout(() => {
              if (iframeRef.current && isPlaying) {
                handleMute(false);
              }
            }, 2000);
          }
        } else {
          if (iframeRef.current) {
            iframeRef.current.src = "about:blank";
            // Store current state before pausing
            const currentKey = movieOrTvForBanner.ytKey;
            const currentMuted = isMuted;

            setTimeout(() => {
              // Only update if the component is still mounted and the video hasn't changed
              if (
                iframeRef.current &&
                movieOrTvForBanner?.ytKey === currentKey
              ) {
                const newSrc = returnYTTrailerIframeURL(
                  currentKey,
                  false,
                  currentMuted
                );
                if (newSrc) {
                  iframeRef.current.src = newSrc;
                }
              }
            }, 50);
          }
        }
      }
    },
    [
      isPlaying,
      isMuted,
      movieOrTvForBanner?.ytKey,
      returnYTTrailerIframeURL,
      handleMute,
    ]
  );

  // Remove the existing auto-unmute effect since we're handling it in handlePlayPause
  useEffect(() => {
    if (movieOrTvForBanner?.ytKey) {
      // Reset play state when video changes
      setIsPlaying(true);
      setIsMuted(true);
    }
  }, [movieOrTvForBanner?.ytKey]);

  // Add a cleanup effect for the iframe
  useEffect(() => {
    return () => {
      if (iframeRef.current) {
        iframeRef.current.src = "about:blank";
      }
    };
  }, []);

  const handleToggleMute = () => handleMute(!isMuted);
  const handleTogglePlay = () => handlePlayPause(!isPlaying);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      setError(null);
      try {
        let request = "";

        if (firstTimeLoad) {
          request = await axios.get(requests.fetchNetflixOriginals);
          if (
            !movieOrTvForBanner ||
            Object.keys(movieOrTvForBanner).length === 0
          ) {
            const firstTimeLoadedBanner =
              request.data.results[
                Math.floor(Math.random() * (request.data.results.length - 1))
              ];

            if (!firstTimeLoadedBanner?.id) {
              throw new Error("No valid content found");
            }

            const trailers = await axios.get(
              requests.fetchTvTrailer(firstTimeLoadedBanner.id)
            );
            const trailerKey = trailers.data?.results[0]?.key;

            if (!trailerKey) {
              throw new Error("No trailer available");
            }

            const copy = { ...firstTimeLoadedBanner };
            copy.ytKey = trailerKey;
            copy.ytTrailerIframe = returnYTTrailerIframeURL(
              trailerKey,
              true,
              true
            );
            handleSetMovieOrTvForBanner(copy);
          }
        }

        if (!firstTimeLoad && movieOrTvClicked?.id !== movieOrTvForBanner?.id) {
          const isMovie =
            movieOrTvClicked?.mediaType === "movie" ||
            movieOrTvClicked?.media_type === "movie";

          request = await axios.get(
            isMovie
              ? requests.fetchMovieById(movieOrTvClicked?.id)
              : requests.fetchTvById(movieOrTvClicked?.id)
          );

          if (!request.data?.id) {
            throw new Error("Content not found");
          }

          const trailers = await axios.get(
            isMovie
              ? requests.fetchMovieTrailer(request.data.id)
              : requests.fetchTvTrailer(request.data.id)
          );

          const trailerKey = trailers.data?.results[0]?.key;
          if (!trailerKey) {
            throw new Error("No trailer available");
          }

          const copy = { ...request.data };
          copy.ytKey = trailerKey;
          copy.ytTrailerIframe = returnYTTrailerIframeURL(
            trailerKey,
            true,
            true
          );
          handleSetMovieOrTvForBanner(copy);
        }
      } catch (error) {
        console.error("Error fetching banner data:", error);
        setError(error.message || "Failed to load content");
      } finally {
        setIsLoading(false);
      }
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
    returnYTTrailerIframeURL,
  ]);

  function truncate(string, n) {
    return string?.length > n ? string.substr(0, n - 1) + "..." : string;
  }

  if (isLoading) {
    return (
      <header className="banner banner--loading">
        <div className="banner__loading">Loading...</div>
      </header>
    );
  }

  if (error) {
    return (
      <header className="banner banner--error">
        <div className="banner__error">{error}</div>
      </header>
    );
  }

  return (
    <header className="banner" role="banner">
      <div className="banner__background">
        {movieOrTvForBanner?.ytTrailerIframe && (
          <iframe
            ref={iframeRef}
            className="banner__video"
            src={movieOrTvForBanner.ytTrailerIframe}
            title={`${
              movieOrTvForBanner.title || movieOrTvForBanner.name
            } trailer`}
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            playsInline
            aria-label="Movie trailer"
          ></iframe>
        )}
        <div
          className="banner__video-controls"
          role="group"
          aria-label="Video controls"
        >
          <button
            className="banner__control-button"
            onClick={handleTogglePlay}
            aria-label={isPlaying ? "Pause video" : "Play video"}
            aria-pressed={!isPlaying}
          >
            {isPlaying ? <Pause size={24} /> : <Play size={24} />}
          </button>
          <button
            className="banner__control-button"
            onClick={handleToggleMute}
            aria-label={isMuted ? "Unmute video" : "Mute video"}
            aria-pressed={isMuted}
          >
            {isMuted ? <VolumeMute size={24} /> : <VolumeUp size={24} />}
          </button>
        </div>
      </div>
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
              movieOrTvForBanner?.ytTrailerIframe && handleShowYTModal(true)
            }
            aria-label="Play full trailer"
          >
            Play
          </button>
          <button
            className="banner__button banner__listButton"
            aria-label="Add to my list"
          >
            My List
          </button>
        </div>
        <p className="banner__description">
          {truncate(movieOrTvForBanner?.overview, 150)}
        </p>
      </div>
      <div className="banner__fadeBottom" aria-hidden="true" />
    </header>
  );
}

export default Banner;
