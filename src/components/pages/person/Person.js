import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import axios from "axios";
import {Apikey} from "../../apikey";
import {useContext} from "react";
import {LanguageContext} from "../../context";


const Person = () => {
    const {personId} = useParams()

    const [person, setPerson] = useState([])

    const {language} = useContext(LanguageContext)

    const {biography, birthday, name, place_of_birth, profile_path} = person

    const getData = async (id, apikey) => {
        try {
            const api = await axios(`https://api.themoviedb.org/3/person/${id}?api_key=${apikey}&language=${language}`)
            const {data} = await api
            setPerson(data)
        } catch (e){
            console.log(e)
        }
    }


    useEffect(() => {
        getData(personId, Apikey)
    }, [language])
    return (
        <div className="container">
            <div style={{
                display: "flex",
                margin: "10px"
            }}>
                <div style={{
                    marginRight: "15px"
                }}>
                    <img src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2/${profile_path}`} alt=""/>
                    <h4>{place_of_birth}</h4>
                    <h4>birthday: {birthday}</h4>
                </div>
                <div>
                    <h1>{name}</h1>
                    <p>{biography}</p>
                </div>
            </div>


        </div>
    );
};

export default Person;