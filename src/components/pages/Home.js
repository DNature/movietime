import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import VideoFrame from "../VideoFrame";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apiKey: `618b753712ed0a388d986c9e485d9a7c`,
      apiBaseURL: "https://api.themoviedb.org/3/movie/",
      imageBaseURL: "https://image.tmdb.org/t/p/",
      imageSize: "w154",
      movies: [],
      currentPage: 1,
      totalPages: null,
      totalMovies: null,
      isLoading: true,
      trailerLink: null,
      count: 0
    };
  }

  increment = () => {
    this.setState({ count: this.state.count + 1 });
  };

  getTrailer = movieId => {
    /* Fetch single or multiple movie trailers via the TMDB API */
    const url = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${
      this.state.apiKey
    }`;

    axios
      .get(url)
      .then(res => {
        console.log(res.data);
        this.setState({
          trailerLink:
            "https://www.youtube.com/embed/" + res.data.results[0].key
        });
      })
      .catch(err => console.log(err));
  };

  getPopularMovies = async () => {
    const { apiKey, currentPage, movies } = this.state;
    const apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=${currentPage}`;
    const popularMovies = [...movies];
    let totalPages, totalMovies;

    await axios
      .get(apiUrl)
      .then(async res => {
        console.log("first req");
        const data = res.data;
        let newMovies = data.results;
        totalPages = data.total_pages;
        totalMovies = data.total_results;

        let movieObj = {};
        newMovies.forEach(async movie => {
          let movieId = movie.id;
          return await axios
            .get(
              `https://api.themoviedb.org/3/movie/${movieId}?api_key=618b753712ed0a388d986c9e485d9a7c`
            )
            .then(async response => {
              console.log("second req");
              const movieData = response.data;
              const runtime = movieData.runtime;
              const genres = movieData.genres;
              movieObj = { ...movie };

              movieObj.runtime = runtime;
              movieObj.genres = genres;

              popularMovies.push(movieObj);

              await this.setState(
                {
                  totalPages,
                  totalMovies,
                  movies: popularMovies
                },
                () => {
                  console.log("third req");
                  this.setState({ isLoading: false });
                }
              );
            });
        });
      })
      .catch(err => {});
  };

  componentDidMount() {
    this.getPopularMovies();
  }

  render() {
    const { movies, imageBaseURL, imageSize, trailerLink, count } = this.state;

    const name = "Francis"

    return (
      <div>
        <div className="modal" tabIndex="-1" role="dialog" id="exampleModal">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Movie Trailer</h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                {trailerLink === null ? (
                  <p className="lead mx-auto text-center my-5 text-white">
                    Loading Trailer...
                  </p>
                ) : (
                  <VideoFrame src={trailerLink} />
                )}
              </div>
            </div>
          </div>
        </div>

        <header className="header-top">
          <nav
            className="navbar navbar-expand-lg navbar-dark"
            style={{ zIndex: "100", background: "transparent" }}
          >
            <div className="text-center mx-auto">
              <a className="navbar-brand" href="/">
                <h2 className="logo">Movie Time</h2>
              </a>
            </div>
          </nav>
          <div className="overlay">
            <div className="container">
              <h1>Watch What's Next</h1>
              <h3>BOOK NOW. WATCH ANYTIME</h3>
              <a href="/book" className="btn btn-danger btn-lg">
                Book Now
              </a>
            </div>
          </div>
        </header>

        <main>
          <section className="section section-3">
            <div className="header-title">
              <h2 className="text-white text-danger text-center py-4">
                NOW SHOWING
              </h2>
              <hr />
            </div>
            <div className="container">
              <div className="row">
                {movies.length > 0 ? (
                  this.state.movies.map(movie => (
                    <div className="col-12" key={movie.id}>
                      <div
                        className="row mb-3"
                        style={{ background: "#000000" }}
                      >
                        <div className="col-xs-12 col-sm-2 col-md-2 col-lg-2ss">
                          <img
                            src={`${imageBaseURL}${imageSize}${
                              movie.poster_path
                            }`}
                            alt={movie.title}
                            style={{ borderRadius: "10px" }}
                            className="img-responsive mx-auto d-block text-center w-100"
                          />
                        </div>
                        <div className="col-xs-12 col-sm-10 col-md-10 col-lg-10">
                          <h6 className="text-danger mt-3">
                            {movie.genres.map(genre => (
                              <span key={genre.id}>
                                | {String(genre.name).toUpperCase()} |{" "}
                              </span>
                            ))}
                          </h6>
                          <Link
                            to={`/view/${movie.id}`}
                            className="h3 text-white movie-link"
                            style={{
                              textDecoration: "none"
                            }}
                          >
                            {movie.title}
                          </Link>
                          <p
                            className="lead text-white"
                            style={{ fontSize: "1rem" }}
                          >
                            {String(movie.overview)
                              .slice(0, 200)
                              .concat("...")}
                          </p>
                          <p
                            className="lead text-white"
                            style={{ fontSize: "1rem", fontWeight: 500 }}
                          >
                            {}
                            {movie.runtime} MINS | {movie.vote_average}
                            /10
                          </p>

                          <div className="cta">
                            <button
                              className="float-left btn btn-outline-secondary"
                              data-toggle="modal"
                              data-target="#exampleModal"
                              onClick={() => this.getTrailer(movie.id)}
                            >
                              WATCH TRAILER
                            </button>
                            <Link
                              to={`/movie/${movie.id}/${movie.title}${movie.poster_path}/${movie.runtime}/${movie.release_date}/${movie.overview}/view`}
                              className="btn btn-outline-danger float-right"
                            >
                              BOOK NOW
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="lead mx-auto text-center my-5 text-white">
                    Loading...
                  </p>
                )}
              </div>
            </div>
          </section>
        </main>
      </div>
    );
  }
}

export default Home;
