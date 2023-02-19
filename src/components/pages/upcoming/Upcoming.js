import React from 'react';
import {useEffect, useState} from "react";
import axios from "axios";
import {Apikey} from "../../apikey";
import MovieCard from "../movie-card/Movie-card";
import {useContext} from "react";
import {LanguageContext} from "../../context";
import Loader from "../../loader";

const Upcoming = () => {
    const [upcoming, setUpcoming] = useState([])
    const [loading, setLoading] = useState(true)
    const {language} = useContext(LanguageContext)

    const getMovies = async () => {
        const api = await axios(`https://api.themoviedb.org/3/movie/upcoming?api_key=${Apikey}&language=${language}&page=1`)
        // const result = await api.data
        const {results} = await api.data
        setTimeout(() => {
            setUpcoming(results)
            setLoading(false)
        }, 1500)
    }


    useEffect(() => {
    getMovies()
    }, [language])

    console.log(upcoming)



    return (
        <div className="container">
            <div className="row">
                {
                    loading ? <Loader/> : upcoming.map(movie => <MovieCard key={movie.id} movie={movie}/>)
                }
            </div>
        </div>
    );
};

export default Upcoming;