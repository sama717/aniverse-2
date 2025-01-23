import { Link, useNavigate } from 'react-router-dom';
import '../css/nav.css';

function Navigation({ isLoggedIn, handleLogout, userInfo }) {
    const navigate = useNavigate();

    const handleUserIconClick = () => {
        navigate('/user'); 
    };

    const handleCartClick = () => {
        navigate('/cart');
    };

    const handleFavoritesClick = () => {
        navigate('/fav');
    };

    return (
        <nav className="navigation navbar navbar-expand-lg">
            <div className="container mt-3">
                <div className="left-nav">
                    <Link className="navbar-brand" to="/"><img src="../src/assets/ANIVERSE-logo.png" alt="Logo" /></Link>
                </div>
                <div className="toggler-nav">
                    <button className="navbar-toggler mb-3 toggle-button" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span><i className="fa-solid fa-circle-chevron-down"></i></span>
                    </button>
                </div>
                <div className="right-nav collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mb-2 mb-lg-0">
                        <li className="nav-item"><Link className="nav-a" to="/">Home</Link></li>
                        <li className="nav-item"><Link className="nav-a" to="/store">Store</Link></li>
                        <li className="nav-item"><Link className="nav-a" to="/watch">Watch</Link></li>

                        {/* Cart Icon */}
                        <li className="nav-item">
                            <button className="btn icon-btn" onClick={handleCartClick} title="Cart">
                                <i className="fa-solid fa-cart-shopping" style={{ fontSize: '1.5rem', color: 'black' }}></i>
                            </button>
                        </li>

                        {/* Favorites Icon */}
                        <li className="nav-item">
                            <button className="btn icon-btn" onClick={handleFavoritesClick} title="Favorites">
                                <i className="fa-solid fa-heart" style={{ fontSize: '1.5rem', color: 'black' }}></i>
                            </button>
                        </li>

                        {!isLoggedIn ? (
                            <li className="nav-item">
                                <Link className="login-btn" to="/login">
                                    <button className="btn btn-dark rounded-pill ms-3 px-4 fs-6">LOGIN</button>
                                </Link>
                            </li>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <button className="btn btn-dark rounded-pill ms-5 px-4 fs-6" onClick={handleUserIconClick}>
                                        <i className="fa-solid fa-user" />
                                    </button>
                                </li>
                                <li className="nav-item">
                                    <button className="btn btn-dark rounded-pill ms-2 px-3" onClick={handleLogout}>
                                        Logout
                                    </button>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navigation;
