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
    <div className="flex flex-col lg:flex-row lg:justify-between items-center">
    
      <section className="flex flex-col justify-center items-center w-full lg:w-auto">
        <div className="w-full lg:w-[100rem] mb-8 ">
          <h1 className="mb-5">Choose For You</h1>
          <SliderUtil data={randomMovies} />
        </div>

        <div className="w-full lg:w-[100rem] mb-8">
          <h1 className="mb-5">Top Movies</h1>
          <SliderUtil data={topMovies} />
        </div>

        <div className="w-full lg:w-[100rem] mb-8">
          <h1 className="mb-5">Choose Movie</h1>
          <SliderUtil data={filteredMovies} />
        </div>
      </section>
    </div>
  );
};

export default MoviesContainerPage;
