import React, {useContext} from "react";
import "./Header.css"
import {Link, NavLink, useNavigate} from "react-router-dom"
import {useState} from "react";
import {LanguageContext} from "../context";


const Header = ({changeBg}) => {
    const [mode ,setMode] = useState(JSON.parse(localStorage.getItem(`mode`)) || false)
    const {language, setLanguage} = useContext(LanguageContext)
    const [search, setSearch] = useState("")
    const navigate = useNavigate()




    const clickBg = (mode) => {
        setMode(!mode)
        changeBg(!mode)
    }

    const handleSearch = (e) => {
        setSearch(e.target.value)
    }

    const goToResults = () => {
        if (search.trim()){
            navigate(`/movies/search/${search}`)
        }
    }

    return (
        <div className="container">
            <nav className="navbar navbar-expand-lg py-4 navbar-light bg-light">
                <Link to="/" className="nav-link">MOVIE TV</Link>


                <div className="collapse navbar-collapse d-flex align-items-center justify-content-between" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto d-flex align-items-center justify-content-between">
                        <li className="nav-item">
                            <NavLink to="/" className="nav-link">Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/top-rated" className="nav-link">Top rated</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/now-playing" className="nav-link">Now Playing</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/upcoming" className="nav-link">Upcoming</NavLink>
                        </li>

                        <button className={mode ? "btn btn-primary mx-3" : "btn btn-dark mx-3"} onClick={() => clickBg(mode)}>
                            {mode ? "light mode" : "dark mode"}
                        </button>

                        <select name="" id="" onChange={(e) => setLanguage(e.target.value)}>
                            <option value="ru-RU" selected>Русский</option>
                            <option value="en-US">English</option>
                            <option value="tr-TR">turkce</option>
                        </select>

                    </ul>
                    <div className="form-inline my-2 my-lg-0 d-flex">
                        <input
                            onChange={handleSearch}
                            className="form-control mr-sm-2 mx-2" type="search" placeholder="Search" aria-label="Search"/>
                        <button
                            onClick={goToResults}
                            className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                    </div>
                </div>
            </nav>
        </div>
    )
}


export default Header
