import React, {useContext, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import axios from "axios";
import {Apikey} from "../../apikey";
import MovieCast from "./cast/Movie-cast";
import MovieVideos from "./movie-videos/Movie-videos";
import {LanguageContext} from "../../context";




const MoviePage = () => {
    const {movieId} = useParams()
    const [details, setDetails] = useState({})
    const [cast, setCast] = useState([])

    const {language} = useContext(LanguageContext)

    const {overview, poster_path, runtime, backdrop_path, release_date, title} = details

    const time = `${Math.floor(runtime / 60)} h ${runtime % 60} min`

    const getDetails = async (id, apikey) => {
        try {
            const api = await axios(`https://api.themoviedb.org/3/movie/${id}?api_key=${apikey}&language=${language}`)
            const {data} = await api
            setDetails(data)
        } catch (e){
            console.log(e)
        }
    }

    const getCast = async (id, apikey) => {
        try {
            const api = await axios(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apikey}&language=${language}`)
            const {data} = await api
            setCast(data.cast)
        } catch (e){
            console.log(e)
        }
    }


    useEffect(() => {
        getDetails(movieId, Apikey)
        getCast(movieId, Apikey)
    }, [language])


    return (
        <div>
            <div className="py-5" style={{
                background: `url("https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces${backdrop_path}") no-repeat right/cover`
            }}>
                <div className="container">

                    <div className="row">
                        <div className="col-4">
                            <img src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2${poster_path}`} alt=""/>
                        </div>
                        <div className="col-6 text-left" style={{
                            color: "white"
                        }}>
                            <h1>{title}</h1>
                            <p>{release_date}</p>
                            <p>{time}</p>
                            <p>{overview}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div style={{
                background: "black"
            }}>
                <div className="cast container" style={{
                }}>
                    <MovieCast cast={cast}/>
                </div>
            </div>
            <div>
                <div className="container">
                    <MovieVideos movieId={movieId}/>
                </div>
            </div>
        </div>
    );
};

export default MoviePage;