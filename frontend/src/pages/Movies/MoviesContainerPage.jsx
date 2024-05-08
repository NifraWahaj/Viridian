import { useState } from "react";
import {
  useGetNewMoviesQuery,
  useGetTopMoviesQuery,
  useGetRandomMoviesQuery,
} from "../../redux/api/movies";
import { useFetchGenresQuery } from "../../redux/api/genre";
import SliderUtil from "../../component/SliderUtil";
import banner from "../../assets/banner.jpg";


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

    <div  style={{ marginLeft:'3rem',marginRight:'3rem'}}>
      
      
      
    <div className="d-flex flex-column lg-flex-row lg-justify-between items-center"
    >
       <div className="position-relative mb-3 d-flex align-items-center justify-content-center bg-cover" 
        style={{ height: "40rem", backgroundImage: `url(${banner})`, width: '100vw' , marginTop:'-11rem'}}> 
        <div style={{ marginTop: "5rem", color:'#f2f2f2', zIndex:'1', textAlign: 'center'}}>
          <h1 style={{ fontWeight: 'bolder', fontSize:'10rem'}}> VIRIDIAN </h1>
          <h2 > Explore, Rate, and Discover the Best Films </h2>
        </div>
        <div style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, background: 'linear-gradient(to bottom, #333333 0%, #000000 100%)', opacity: 0.6 }}></div>
        </div>
      
      <section className="d-flex flex-column justify-center items-center w-100 lg-w-auto">
        <div className="w-100 lg-w-100rem mb-8 ">
        <h1 className="text-4xl my-4 font-bold" style={{ color: '#38715f' }}>Choose For You</h1>
          <SliderUtil data={randomMovies} />
        </div>

        
        <div className="w-100 lg-w-100rem mb-8">
          <h1  className="text-4xl my-4 font-bold" style={{ color: '#38715f' }}>Top Movies</h1>
          <SliderUtil data={topMovies} />
        </div>

      
      </section>
    </div>
    </div>
  );
};

export default MoviesContainerPage;
