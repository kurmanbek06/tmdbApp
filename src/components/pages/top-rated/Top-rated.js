import React from 'react';
import {Apikey} from "../../apikey";
import axios from "axios";
import {useEffect, useState} from "react";
import MovieCard from "../movie-card/Movie-card";
import {useContext} from "react";
import {LanguageContext} from "../../context";
import Loader from "../../loader";



const TopRated = () => {
    const [topRated, setTopRated] = useState([])
    const [loading, setLoading] = useState(true)
    const {language} = useContext(LanguageContext)

    const getMovies = async () => {
        const api = await axios(`https://api.themoviedb.org/3/movie/top_rated?api_key=${Apikey}&language=${language}&page=1`)
        // const result = await api.data
        const {results} = await api.data
        setTimeout(() => {
            setTopRated(results)
            setLoading(false)
        }, 1500)
    }


    useEffect(() => {
        getMovies()
    }, [language])

    console.log(topRated)
    return (
        <div className="container">
            <div className="row">
                {
                    // topRated.map(movie => <MovieCard key={movie.id} movie={movie}/>)
                    loading ? <Loader/> : topRated.map(movie => <MovieCard key={movie.id} movie={movie}/>)
                }
            </div>
        </div>
    );
};

export default TopRated;