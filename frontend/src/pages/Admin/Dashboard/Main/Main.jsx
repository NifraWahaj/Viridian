import React from "react";
import SecondaryCard from "./SecondaryCard";
import VideoCard from "./VideoCard";
import { useGetTopMoviesQuery, useGetAllMoviesQuery } from "../../../../redux/api/movies";
import { useGetUsersQuery } from "../../../../redux/api/users";
import Sidebar from "../Sidebar/Sidebar";

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
      
 
    <div>
      
      <section className="d-flex justify-content-around" style={{}}>
        
        <div className=" mt-5 " >
          <div className="d-flex">
            <SecondaryCard
              pill="Users"
              content={visitors?.length}
            />
            <SecondaryCard
              pill="Reviews"
              content={sumOfCommentsLength}
            />
            <SecondaryCard
              pill="Movies"
              content={allMovies?.length}
            />
          </div>
          <div className="d-flex justify-content-between w-90 text-dark mt-4 font-weight-bold">
            <h4>Top Content</h4>
            <h4>Reviews</h4>
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
    </div>
  );
};

export default Main;
