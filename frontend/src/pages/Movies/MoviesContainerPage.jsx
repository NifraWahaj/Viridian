import { useState } from "react";
import {
  useGetNewMoviesQuery,
  useGetTopMoviesQuery,
  useGetRandomMoviesQuery,
} from "../../redux/api/movies";
import { useFetchGenresQuery } from "../../redux/api/genre";
import SliderUtil from "../../component/SliderUtil";

const MoviesContainerPage = () => {
  const { data } = useGetNewMoviesQuery();
  const { data: topMovies } = useGetTopMoviesQuery();
  const { data: genres } = useFetchGenresQuery();
  const { data: randomMovies } = useGetRandomMoviesQuery();

  const [selectedGenre, setSelectedGenre] = useState(null);

  const handleGenreClick = (genreId) => {
    setSelectedGenre(genreId);
  };

  const filteredMovies = data?.filter(
    (movie) => selectedGenre === null || movie.genre === selectedGenre
  );

  return (
    <div className="d-flex flex-column lg-flex-row lg-justify-between items-center">
      
      <h1 > Explore, Rate, and Discover the Best Films </h1>
      <section className="d-flex flex-column justify-center items-center w-100 lg-w-auto">
        <div className="w-100 lg-w-100rem mb-8 ">
          <h1  class="text-5xl my-4 font-extrabold">Choose For You</h1>
          <SliderUtil data={randomMovies} />
        </div>

        <div className="w-100 lg-w-100rem mb-8">
          <h1  class="text-5xl my-4 font-extrabold">Top Movies</h1>
          <SliderUtil data={topMovies} />
        </div>

        <div className="w-100 lg-w-100rem mb-8">
          <h1  class="text-5xl my-4 font-extrabold">Choose Movie</h1>
          <SliderUtil data={filteredMovies} />
        </div>
      </section>
    </div>
  );
};

export default MoviesContainerPage;
