import React, { Component } from "react";
import format from "date-fns/format";
import axios from "axios";
import VideoFrame from '../VideoFrame'

class SingleMovie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      id: "",
      apiKey: `618b753712ed0a388d986c9e485d9a7c`,
      imageBaseURL: "https://image.tmdb.org/t/p/",
      imageSize: "w154/",
      trailerLink: ""
    };
  }

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

  componentDidMount() {
    this.getTrailer(this.props.match.params.id);
  }

  minuteToHour = timeInMins => {
    const mins = timeInMins;
    let h, m;
    if (mins > 60 && mins < 3600) {
      h = Math.floor(mins / 60);
      m = Math.round(mins % 60);
    }

    if (h === 1) h = h + "hr ";
    else h = h + "hrs ";

    if (m === 1) m = m + "min ";
    else m = m + "mins ";

    const runtime = h + m;
    return runtime;
  };

  render() {
    console.log(this.props);
    const { imageBaseURL, imageSize, trailerLink } = this.state;
    const {
      id,
      title,
      poster_path,
      runtime,
      release_date,
      overview
    } = this.props.match.params;

    return (
      <>
        <header>
          <div className="container">

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

            <div className="video-player mt-2">
              {trailerLink === null ? (
                <p className="lead mx-auto text-center my-5 text-white">
                  Loading Trailer...
                  </p>
              ) : (
                  <VideoFrame src={trailerLink} />
                )}
            </div>

            <div className="row text-white mt-5">
              <div className="col-xs-12 col-sm-2 col-md-2 col-lg-2">
                <img
                  src={`${imageBaseURL}${imageSize}${poster_path}`}
                  alt={title}
                  style={{ borderRadius: "10px" }}
                  className="img-responsive mx-auto d-block text-center w-100"
                />
              </div>
              <div className="col-xs-12 col-sm-10 col-md-10 col-lg-10">
                <h3 className="text-white">{title}</h3>

                <p
                  className="lead text-white"
                  style={{ fontSize: "1rem", fontWeight: 500 }}
                >
                  <span
                    style={{
                      color: "#ccc",
                      fontWeight: 400,
                      fontSize: "0.95rem"
                    }}
                  >
                    {overview}
                  </span>
                </p>

                <p
                  className="lead text-white"
                  style={{ fontSize: "1rem", fontWeight: 500 }}
                >
                  Release Date
                  <br />
                  <span
                    style={{
                      color: "#ccc",
                      fontWeight: 400,
                      fontSize: "0.95rem"
                    }}
                  >
                    {format(release_date, "DD MMMM YYYY")}
                  </span>
                </p>

                <p
                  className="lead text-white"
                  style={{ fontSize: "1rem", fontWeight: 500 }}
                >
                  Runtime
                  <br />
                  <span
                    style={{
                      color: "#ccc",
                      fontWeight: 400,
                      fontSize: "0.95rem"
                    }}
                  >
                    {this.minuteToHour(runtime)}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </header>
      </>
    );
  }
}

export default SingleMovie;
