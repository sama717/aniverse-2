import '../css/main.css'
import Carousel from 'react-bootstrap/Carousel';


function Main  () {
    return (
        <div className="main">
            <Carousel className='carousel' indicators={false} controls={false} fade >
            <Carousel.Item interval={4000}>
            <div className="car-1">
            <h1>CHAINSAW MAN</h1>
            <div className="img-container">
                <img src="../src/assets/chainsaw-man.png" alt="" />
            </div>
            </div>
            </Carousel.Item>
            <Carousel.Item interval={4000}>
            <div className="car-2">
            <h1>DEMON SLAYER</h1>
            <div className="img-container">
                <img src="../src/assets/demon-slayer.png" alt="" />
            </div>
            </div>
            </Carousel.Item>
            <Carousel.Item interval={4000}>
            <div className="car-3">
            <h1>JUJUTSU KAISEN</h1>
            <div className="img-container">
                <img src="../src/assets/jjk.png" alt="" />
            </div>
            </div>
            </Carousel.Item>
            <Carousel.Item interval={4000}>
            <div className="car-4">
            <h1>ONE PIECE</h1>
            <div className="img-container">
                <img src="../src/assets/one-piece.png" alt="" width={'800px'}/>
            </div>
            </div>
            </Carousel.Item>
            </Carousel>

            <div className="foot container-fluid">
                <div className='left-foot'>
                    <ul>
                        <li><a href="https://x.com"><i class="fa-brands fa-square-x-twitter"></i></a></li>
                        <li><a href="https://www.facebook.com"><i class="fa-brands fa-facebook"></i></a></li>
                        <li><a href="https://www.instagram.com"><i class="fa-brands fa-square-instagram"></i></a></li>
                        <li><a href="https://www.tiktok.com"><i class="fa-brands fa-tiktok"></i></a></li>
                    </ul>
                </div>
                <div className='right-foot'>
                    <p>Aniverse © 2022 . All rights reserved.</p>
                </div>
            </div>
        </div>
    )
}
export default Main