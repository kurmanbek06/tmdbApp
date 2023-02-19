import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Apikey} from "../../../apikey";
import Slider from "react-slick";
import {useContext} from "react";
import {LanguageContext} from "../../../context";







const MovieVideos = ({movieId}) => {
    const [videos, setVideos] = useState([])

    const {language} = useContext(LanguageContext)

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3
    };


    const getVideos = async (id, apikey) => {
        const api = await axios(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${apikey}&language=${language}`)
        const {data} = await api
        setVideos(data.results)
    }


    useEffect(() => {
        getVideos(movieId, Apikey)
    }, [language])
    return (
        <div>
            <Slider {...settings}>
                {
                    videos.map(el => (
                        <div className="m-4">
                            <iframe width="320" height="220" src={`https://www.youtube.com/embed/${el.key}`}
                                    title="YouTube video player" frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen/>
                        </div>
                    ))
                }
            </Slider>
        </div>
    );
};

export default MovieVideos;