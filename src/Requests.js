const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const requests = {
  fetchTrending: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
  fetchNetflixOriginals: `/discover/tv?api_key=${API_KEY}&with_networks=213`,
  fetchTopRated: `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
  fetchActionMovies: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
  fetchComedyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
  fetchHorrorMovies: `/discover/movie?api_key=${API_KEY}&with_genres=27`,
  fetchRomanceMovies: `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
  fetchDocumentaries: `/discover/movie?api_key=${API_KEY}&with_genres=99`,
  fetchPopularTVShows: `/tv/popular?api_key=${API_KEY}&language=en-US`,
  fetchUpcoming: `/movie/upcoming?api_key=${API_KEY}&language=en-US`,
  fetchFamilyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=10751`,
  fetchSciFiFantasy: `/discover/movie?api_key=${API_KEY}&with_genres=878,14`,
  fetchCrimeThrillers: `/discover/movie?api_key=${API_KEY}&with_genres=80,53`,
  fetchAwardWinning: `/discover/movie?api_key=${API_KEY}&sort_by=vote_average.desc&vote_count.gte=1000`,
  fetchInternational: `/discover/movie?api_key=${API_KEY}&with_original_language=hi|ko|es|fr`,
  fetchAnime: `/discover/tv?api_key=${API_KEY}&with_genres=16&with_keywords=210024`,
  fetchDramaSeries: `/discover/tv?api_key=${API_KEY}&with_genres=18`,
  fetchRealityTV: `/discover/tv?api_key=${API_KEY}&with_genres=10764`,
  fetchMovieById: function(movieId) {
    return `/movie/${movieId}?api_key=${API_KEY}&language=en-US`;
  },
  fetchTvById: function(tvId) {
    return `/tv/${tvId}?api_key=${API_KEY}&language=en-US`;
  },
  fetchMovieTrailer: function(movieTrailerKey) {
    return `/movie/${movieTrailerKey}/videos?api_key=${API_KEY}&language=en-US`;
  },
  fetchTvTrailer: function(tvTrailerKey) {
    return `/tv/${tvTrailerKey}/videos?api_key=${API_KEY}&language=en-US`;
  },
};

export default requests;