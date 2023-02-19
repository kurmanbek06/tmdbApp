import React, {useContext, useEffect, useState} from 'react';
import {Apikey} from "../../apikey";
import axios from "axios";
import MovieCard from "../movie-card/Movie-card";
import {LanguageContext} from "../../context";
import Loader from "../../loader";



const Popular = () => {
    const [popular, setPopular] = useState([])
    const [loading, setLoading] = useState(true)

    const {language} = useContext(LanguageContext)

    const getMovies = async () => {
        const api = await axios(`https://api.themoviedb.org/3/movie/popular?api_key=${Apikey}&language=${language}&page=1`)
        // const result = await api.data
        const {results} = await api.data
        setTimeout(() => {
            setPopular(results)
            setLoading(false)
        }, 1500)
    }


    useEffect(() => {
     getMovies()
    }, [language])

    console.log(popular)
    return (
        <div className="container">
            <div className="row">
                {/*{*/}
                {/*    popular.length ? popular.map(movie => <MovieCard key={movie.id} movie={movie}/>) : <Loader/>*/}
                {/*}*/}

                {
                    loading ? <Loader/> : popular.map(movie => <MovieCard key={movie.id} movie={movie}/>)
                }
            </div>
        </div>
    );
};

export default Popular;