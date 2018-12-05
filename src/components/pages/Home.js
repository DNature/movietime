import React, { Component } from 'react';
import axios from 'axios'


class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      apiKey: `618b753712ed0a388d986c9e485d9a7c`,
      apiBaseURL: 'https://api.themoviedb.org/3/movie/',


      imageBaseURL: 'https://image.tmdb.org/t/p',
      movies: [],
      currentPage: 1,
      totalPages: null,
      totalMovies: null,
      isLoading: true
    }
  }

  getPopularMovies = () => {
    const { apiKey, currentPage, movies } = this.state;
    const apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=${currentPage}`

    axios.get(apiUrl)
      .then(res => this.setState({
        totalPages: res.data.total_pages,
        totalMovies: res.data.total_results,
        movies: [...movies, ...res.data.results],
        isLoading: false
      }, () => console.log(res) ))
      .catch(err => console.log(err))
  }

  componentDidMount() {
    this.getPopularMovies()
  }

  render() {
    const { isLoading, movies, apiBaseURL, apiKey, imageBaseURL } = this.state
    return (
      <div>
        <header className="header-top">
          <nav className="navbar navbar-expand-lg navbar-dark bg-light navbar-fixed-top" style={{ zIndex: '100' }}>
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
              <a href="/book" className="btn btn-primary btn-lg">Book Now</a>
            </div>
          </div>
        </header>

        <main>
          <section className="section section-movies">
            <div className="header-title bg-dark">
              <h1 className="text-white text-center mb-2 py-5">Latest Movies</h1>
            </div>
            <div className="container-fluid">
              <div className="row">
                {
                  movies.length > 0 ? movies.map(movie =>
                  <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3 d-flex align-item-stretch" key={movie.id}>
                    <div className="card bg-dark text-white mb-3" style={{ width: '100%' }}>
                      <img className="card-img-top" src={`${imageBaseURL}/w500${movie.poster_path}`} alt="Card caption" style={{
                        objectFit: 'cover',
                        height: 200,
                        width: "100%"
                      }} />
                      <div className="card-body">
                        <h5 className="card-title">{movie.title}</h5>

                        <a href="/" className="btn btn-secondary">Add to Cart</a>
                      </div>
                    </div>
                  </div>): (<span>loading...</span>)
                }
              </div>
            </div>
          </section>
        </main>
      </div>
    );
  }
}

export default Home;