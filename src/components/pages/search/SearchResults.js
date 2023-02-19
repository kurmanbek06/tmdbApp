import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import axios from "axios";
import {Apikey} from "../../apikey";
import MovieCard from "../movie-card/Movie-card";
import {useContext} from "react";
import {LanguageContext} from "../../context";
import Loader from "../../loader";

const SearchResults = () => {

    const {movie_name} = useParams()
    const [results, setResults] = useState([])
    const [pages, setPages] = useState(0)
    const [current, setCurrent] = useState(1)
    const [loading, setLoading] = useState(true)
    const {language} = useContext(LanguageContext)



    const getResults = async (name, apikey, page) => {
        const api = await axios(`https://api.themoviedb.org/3/search/movie?api_key=${apikey}&query=${name}&page=${page}&language=${language}`)

        const {data} = await api
        setTimeout(() => {
            setResults(data.results)
            setPages(data.total_pages)
            setLoading(false)
        }, 1500)
    }

    const nextPage = () => {
        setCurrent(current + 1)
    }

    const prevPage = () => {
        setCurrent(current - 1)
    }

    let buttons = ""



    useEffect(() => {
        getResults(movie_name, Apikey, current)
    }, [current, movie_name, language])
    return (
        <div className="container">
            <div className="row">
                {
                    // results.map(movie => <MovieCard key={movie.id} movie={movie}/>)
                    loading ? <Loader/> : results.map(movie => <MovieCard key={movie.id} movie={movie}/>)
                }
            </div>

            <div className="d-flex justify-content-between align-items-center m-5">
                <button
                    onClick={prevPage}
                    style={{
                        visibility: current === 1 ? "hidden" : "visible"
                    }}
                    className="btn btn-danger">Prev</button>
                <button
                    onClick={nextPage}
                    style={{
                        visibility: current === pages ? "hidden" : "visible"
                    }}
                    className="btn btn-primary">Next</button>
            </div>
        </div>
    );
};

export default SearchResults;