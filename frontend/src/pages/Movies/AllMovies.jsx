import { useGetAllMoviesQuery } from "../../redux/api/movies";
import { useFetchGenresQuery } from "../../redux/api/genre";
import {
  useGetNewMoviesQuery,
  useGetTopMoviesQuery,
  useGetRandomMoviesQuery,
} from "../../redux/api/movies";
import MovieCard from "./MovieCard";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import banner from "../../assets/banner7.jpg";
import {
  setMoviesFilter,
  setFilteredMovies,
  setMovieYears,
  setUniqueYears,
} from "../../redux/features/movies/moviesSlice";
import './AllMovies.css'; // Adjust the path as needed
import { useMediaQuery } from 'react-responsive';
//DONE

const AllMovies = () => {

  const isSmallScreen = useMediaQuery({ query: '(max-width: 576px)' });
  const isMediumScreen = useMediaQuery({ query: '(min-width: 577px) and (max-width: 768px)' });
  const isLargeScreen = useMediaQuery({ query: '(min-width: 769px) and (max-width: 992px)' });



  const dispatch = useDispatch();
  const { data } = useGetAllMoviesQuery();
  const { data: genres } = useFetchGenresQuery();
  const { data: newMovies } = useGetNewMoviesQuery();
  const { data: topMovies } = useGetTopMoviesQuery();
  const { data: randomMovies } = useGetRandomMoviesQuery();

  const { moviesFilter, filteredMovies } = useSelector((state) => state.movies);

  const movieYears = data?.map((movie) => movie.year);
  const uniqueYears = Array.from(new Set(movieYears));

  useEffect(() => {
    dispatch(setFilteredMovies(data || []));
    dispatch(setMovieYears(movieYears));
    dispatch(setUniqueYears(uniqueYears));
  }, [data, dispatch]);

  const handleSearchChange = (e) => {
    dispatch(setMoviesFilter({ searchTerm: e.target.value }));

    const filteredMovies = data.filter((movie) =>
      movie.name.toLowerCase().includes(e.target.value.toLowerCase())
    );

    dispatch(setFilteredMovies(filteredMovies));
  };

  const handleGenreClick = (genreId) => {
    const filterByGenre = data.filter((movie) => movie.genre === genreId);
    dispatch(setFilteredMovies(filterByGenre));
  };

  const handleYearChange = (year) => {
    const filterByYear = data.filter((movie) => movie.year === +year);
    dispatch(setFilteredMovies(filterByYear));
  };

  const handleSortChange = (sortOption) => {
    switch (sortOption) {
      case "new":
        dispatch(setFilteredMovies(newMovies));
        break;
      case "top":
        dispatch(setFilteredMovies(topMovies));
        break;
      case "random":
        dispatch(setFilteredMovies(randomMovies));
        break;

      default:
        dispatch(setFilteredMovies([]));
        break;
    }
  };

  return (
    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 gap-4" style={{ marginTop: '-1rem' }}>
    <>
        <section>
        <div className="position-relative mb-3 d-flex align-items-center justify-content-center bg-cover" 
        style={{ height: "40rem", backgroundImage: `url(${banner})`, width: '100vw' }}>

        <div style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, background: 'linear-gradient(to bottom, #333333 0%, #000000 100%)', opacity: 0.6 }}></div>

           
            <section  className=" position-absolute">
            <h1 class="text-center display-1 fw-bold text-light mb-5 mt-12"  style={{ marginTop: '10rem' }}>Viridian</h1>

              

              <input
                type="text"
                className="form-control border px-4 rounded"

                placeholder="Search Movie"
                value={moviesFilter.searchTerm}
                onChange={handleSearchChange}

                style={{ height: '4rem', width: '60vw'}}
              />
              <section className="sorts-container mt-4 w-100"
>
                <select
                  className="border p-2 rounded ml-2 text-dark"

                  value={moviesFilter.selectedGenre}
                  onChange={(e) => handleGenreClick(e.target.value)}
                  style={{ alignContent:'center'}}
                >
                  <option value="">Genres</option>
                  {genres?.map((genre) => (
                    <option key={genre._id} value={genre._id}>
                      {genre.name}
                    </option>
                  ))}
                </select>

                <select
                  className="border p-2 rounded ml-2 text-dark"

                  value={moviesFilter.selectedYear}
                  onChange={(e) => handleYearChange(e.target.value)}
                >
                  <option value="">Year</option>
                  {uniqueYears.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>

                <select
                  className="border p-2 rounded ml-2 text-dark"

                  value={moviesFilter.selectedSort}
                  onChange={(e) => handleSortChange(e.target.value)}
                >
                  <option value="">Sort By</option>
                  <option value="new">New Movies</option>
                  <option value="top">Top Movies</option>
                  <option value="random">Random Movies</option>
                </select>
              </section>
            </section>
          </div>

         
          <section className="movie-container" style={{ marginLeft: '9rem' }}>
  {filteredMovies?.map((movie) => (
    <div
      key={movie._id}
      className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4" // Bootstrap responsive grid
    >
      <MovieCard movie={movie} />
    </div>
  ))}
</section>




        </section>
      </>
    </div>
  );
};

export default AllMovies;