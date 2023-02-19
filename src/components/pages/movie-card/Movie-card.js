import React from 'react';
import {Link} from "react-router-dom";


const MovieCard = ({movie}) => {
    return (
        <div className="col-3">
            <Link to={`/movies/movie-info/${movie.id}`}>
                <img src={`https://www.themoviedb.org/t/p/w220_and_h330_face${movie.poster_path}`} alt=""/>
            </Link>
            <h5>{movie.title}</h5>
        </div>
    );
};

export default MovieCard;