import React, { useState, useEffect } from "react";
import { FaShoppingCart, FaUser, FaSearch, FaHeart, FaMoon, FaSun } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Dropdown } from "bootstrap";
import Login from "../Pages/Login/Login"; // Import the Login modal component

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        document.body.classList.toggle("dark-mode");
    };

    return (
        <>
            <nav className={`navbar navbar-expand-lg fixed-top ${isScrolled ? "navbar-scrolled" : ""}`}>
                <div className="container">
                    <a className="navbar-brand" href="#">
                        <span className="gradient-text">D.N.STORE</span>
                    </a>

                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav mx-auto text-center">
                            <li className="nav-item">
                                <a className="nav-link" href="#">Home</a>
                            </li>
                            <li className="nav-item dropdown">
                                <button className="nav-link dropdown-toggle" id="shopDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                                    Shop
                                </button>
                                <ul className="dropdown-menu" aria-labelledby="shopDropdown">
                                    <li><a className="dropdown-item" href="#">Naruto Series</a></li>
                                    <li><a className="dropdown-item" href="#">One Piece Gear 5</a></li>
                                    <li><a className="dropdown-item" href="#">Attack on Titan</a></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><a className="dropdown-item" href="#">All Products</a></li>
                                </ul>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">New Arrivals</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Limited Edition</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Contact</a>
                            </li>
                        </ul>

                        <div className="d-flex align-items-center">
                            <div className="search-box">
                                <button className="btn-search"><FaSearch /></button>
                                <input type="text" className="input-search" placeholder="Search anime t-shirt" />
                            </div>

                            <a href="#" className="nav-icon"><FaHeart /></a>
                            <a href="#" className="nav-icon position-relative">
                                <FaShoppingCart />
                            </a>

                            {/* Trigger Modal */}
                            <a href="#" className="nav-icon" data-bs-toggle="modal" data-bs-target="#loginModal">
                                <FaUser />
                            </a>

                            {/* Dark Mode Toggle */}
                            <button className="btn btn-toggle-dark" onClick={toggleDarkMode}>
                                {darkMode ? <FaSun className="nav-icon" /> : <FaMoon className="nav-icon" />}
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Include Login Modal Component */}
            <Login />
        </>
    );
};

export default Header;
