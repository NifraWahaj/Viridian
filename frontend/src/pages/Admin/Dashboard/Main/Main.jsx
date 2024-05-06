import React from "react";
import SecondaryCard from "./SecondaryCard";
import VideoCard from "./VideoCard";
import { useGetTopMoviesQuery, useGetAllMoviesQuery } from "../../../../redux/api/movies";
import { useGetUsersQuery } from "../../../../redux/api/users";
import "./Main.css"; // Import CSS file for custom styling
//DONE
const Main = () => {
  const { data: topMovies } = useGetTopMoviesQuery();
  const { data: visitors } = useGetUsersQuery();
  const { data: allMovies } = useGetAllMoviesQuery();

  const totalCommentsLength = allMovies?.map((m) => m.numReviews);
  const sumOfCommentsLength = totalCommentsLength?.reduce((acc, length) => acc + length, 0);


  return (

    <div>
      
      <section className="d-flex justify-content-around">
        <div className="increased-margin-left mt-5">
          <div className="d-flex">
            <SecondaryCard
              pill="Users"
              content={visitors?.length}
             // info="20.2k more than usual"
              gradient="bg-primary"
            />
            <SecondaryCard
              pill="Reviews"
              content={sumOfCommentsLength}
            //  info="742.8 more than usual"
              gradient="bg-warning"
            />
            <SecondaryCard
              pill="Movies"
              content={allMovies?.length}
            //  info="372+ more than usual"
              gradient="bg-success"
            />
          </div>
          <div className="d-flex justify-content-between w-90 text-dark mt-4 font-weight-bold">
            <p>Top Content</p>
            <p>Reviews</p>
          </div>

          {topMovies?.map((movie) => {
              let backendImageUrl = `http://localhost:3000/${movie.image}`;

              return (
                <VideoCard
                  key={movie._id}
                  image={backendImageUrl}
                  title={movie.name}
                  date={movie.year}
                  comments={movie.numReviews}
                />
              );
            })}

        </div>
      </section>
    </div>
  );
};

export default Main;
