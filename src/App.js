import './App.css';
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import {Routes, Route} from "react-router-dom";
import Popular from "./components/pages/popular/Popular";
import TopRated from "./components/pages/top-rated/Top-rated";
import NowPlaying from "./components/pages/now-playing/Now-playing";
import Upcoming from "./components/pages/upcoming/Upcoming";
import MoviePage from "./components/pages/movie-page/Movie-page";
import Person from "./components/pages/person/Person";
import {useState} from "react";
import SearchResults from "./components/pages/search/SearchResults";



function App() {
    const [mode ,setMode] = useState(JSON.parse(localStorage.getItem(`mode`)) || false)

    const changeBg = (mode) => {
        setMode(mode)
        localStorage.setItem("mode", JSON.stringify(mode) )
    }

  return (
    <div className="" style={{
        background: mode ? "darkgrey": ""
    }}>
        <Header changeBg={changeBg}/>
        <Routes>
            <Route path="/" element={<Popular/>}/>
            <Route path="/top-rated" element={<TopRated/>}/>
            <Route path="/now-playing" element={<NowPlaying/>}/>
            <Route path="/upcoming" element={<Upcoming/>}/>
            <Route path="/movies/movie-info/:movieId" element={<MoviePage/>}/>
            <Route path="/person/person-info/:personId" element={<Person/>}/>
            <Route path="/movies/search/:movie_name" element={<SearchResults/>}/>
        </Routes>
        <Footer/>
    </div>
  );
}

export default App;
