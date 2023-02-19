import React from 'react';
import Slider from "react-slick"
import ProfileImg from "../../../../assets/images/profile.jpg"
import {Link} from "react-router-dom";



const MovieCast = ({cast}) => {
    let settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 7,
        slidesToScroll: 4,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };
    return (
        <Slider {...settings}>
            {
                cast.map(el => (
                        <div className="actor">
                            <Link to={`/person/person-info/${el.id}`}>
                                {el.profile_path ? <img src={`https://www.themoviedb.org/t/p/w138_and_h175_face/${el.profile_path}`} alt=""/> :
                                    <img src={ProfileImg} alt="" style={{
                                        width: "143px",
                                        height: "175px"
                                    }}/>}
                            </Link>
                            <p>{el.name}</p>
                        </div>
                ))
            }
        </Slider>
    );
};

export default MovieCast;