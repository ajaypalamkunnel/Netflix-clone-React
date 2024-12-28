import React, { useEffect, useRef, useState } from "react";
import "./TitleCard.css";
import cards_data from "../../assets/cards/Cards_data";
import { Link } from "react-router-dom";

const TitleCard = ({title,category}) => {

  const [apiData,setApiData] = useState([]);
  const cardsRef = useRef();

  

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5Nzc4NDY1OWFjYzM3ZDgyNzAxMWI3N2RhZGUxOGEzMSIsIm5iZiI6MTczNTI5ODQ4Mi45NjMsInN1YiI6IjY3NmU4ZGIyY2ZlNjI2NDRkZjEyYjY4NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.il0X8KHNOQVHTNxvpdM6cp5WI-LR14dTbxuIfEKNLmI'
    }
  };
  
  

  const handleWheel = (event) => {
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
  };

  useEffect(() => {

    fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
    .then(res => res.json())
    .then(res => setApiData(res.results))
    .catch(err => console.error(err));


    cardsRef.current.addEventListener("wheel", handleWheel);
  }, []);
  return (
    <div className="title-cards">
      <h2>{title?title: "Popular on Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        
        {apiData.map((card, index) => {
          return (
            <Link to={`/player/${card.id}`} className="card" key={index}>
              <img src={ `https://image.tmdb.org/t/p/w500`+card.backdrop_path} alt="" />
              <p>{card.original_title}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default TitleCard;
