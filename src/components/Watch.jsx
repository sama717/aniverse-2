import React, { useState } from 'react';
import '../css/watch.css';

function Watch() {
    const [selectedAnime, setSelectedAnime] = useState('Chainsaw Man'); 

    const trailers = {
        'Chainsaw Man': 'https://www.youtube.com/embed/q15CRdE5Bv0?si=C_EQ2b5sdGvJDqko',
        'Demon Slayer': 'https://www.youtube.com/embed/wyiZWYMilgk?si=yJdb0PJWEIMNumi4',
        'Jujutsu Kaisen': 'https://www.youtube.com/embed/muSr2NVs1oM?si=Qpq3Ghycwqh1bBnn',
        'One Piece': 'https://www.youtube.com/embed/MCb13lbVGE0?si=8oNb88WQnNlmaRLK',
    };

    const handleAnimeClick = (anime, event) => {  
        event.preventDefault(); 
        setSelectedAnime(anime); 
    };

    return (
        <div className="watch container-fluid">
            <h1>WATCH</h1>
            <div className="animes">
                        <ul>
                            <li className="chainsaw" onClick={(event) => handleAnimeClick('Chainsaw Man', event)}><a href="">Chainsaw Man</a></li>
                            <li className="demon-slayer" onClick={(event) => handleAnimeClick('Demon Slayer', event)}>
                                <a href="">Demon Slayer</a>
                            </li>
                            <li className="jjk" onClick={(event) => handleAnimeClick('Jujutsu Kaisen', event)} ><a href="">Jujutsu Kaisen</a></li>
                            <li className="one-piece" onClick={(event) => handleAnimeClick('One Piece', event)}> <a href="">One Piece</a></li>
                        </ul>
                    </div>
            <div className="block">
                    <div className='vid-frame'>
                        <iframe
                            width="560"
                            height="315"
                            src={trailers[selectedAnime]}
                            title={`${selectedAnime} Trailer`}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen>
                        </iframe>
                    </div>
                <div className='platforms'>
                    <i className="fa-brands fa-youtube"></i>
                    <i className="fa-brands fa-safari"></i>
                    <i className="fa-brands fa-chrome"></i>
                    <i className="fa-brands fa-firefox"></i>
                    <i className="fa-brands fa-edge"></i>
                </div>
            </div>
        </div>
    );
}

export default Watch;