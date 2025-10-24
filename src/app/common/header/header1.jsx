import { NavLink } from "react-router-dom";
import { publicUser } from "../../../globals/route-names";
import { useState, useEffect } from "react";

function Header1({ _config }) {
    const [menuActive, setMenuActive] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState({ 
        name: '', 
        email: '',
        phone: '',
        role: ''
    });
    const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

    useEffect(() => {
        // Check if user is logged in
        const token = localStorage.getItem('token');
        const userData = localStorage.getItem('user');
        
        if (token && userData) {
            setIsLoggedIn(true);
            const parsedUser = JSON.parse(userData);
            setUser(parsedUser);
        }
        
        // Initialize Bootstrap tooltips
        if (typeof window !== 'undefined') {
            const bootstrap = require('bootstrap');
            const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
            tooltipTriggerList.map(function (tooltipTriggerEl) {
                return new bootstrap.Tooltip(tooltipTriggerEl);
            });
        }
    }, []);

    function handleNavigationClick() {
        setMenuActive(!menuActive);
    }

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setIsLoggedIn(false);
        setUser({ name: '', email: '', phone: '', role: '' });
        setProfileDropdownOpen(false);
        window.location.href = '/';
    };

    const toggleProfileDropdown = () => {
        setProfileDropdownOpen(!profileDropdownOpen);
    };

    // Handle Sign Up modal
    const handleSignUpClick = (e) => {
        e.preventDefault();
        if (typeof window !== 'undefined') {
            const bootstrap = require('bootstrap');
            const signUpModal = new bootstrap.Modal(document.getElementById('sign_up_popup'));
            signUpModal.show();
        }
    };

    return (
        <>
            <header className={"site-header " + _config.style + " mobile-sider-drawer-menu " + (menuActive ? "active" : "")}>
                <div className="sticky-header main-bar-wraper navbar-expand-lg">
                    <div className="main-bar">
                        <div className="container-fluid clearfix header-top-container">
                            <div className="logo-header">
                                <div className="logo-header-inner logo-header-one">
                                    <NavLink to={publicUser.HOME3} className='logo-flex'>
                                        <img src="assets/images/Eduno logo.png" className="logo-img" alt="EduNomad Logo"/>
                                        <h3 className='nav-text-ed1'>EduNomad Connect</h3>
                                        <h3 className='nav-text-ed'>EduNomad Connect</h3>
                                    </NavLink>
                                </div>
                            </div>

                            {/* NAV Toggle Button - Mobile Only */}
                            <button id="mobile-side-drawer"
                                data-target=".header-nav"
                                data-toggle="collapse"
                                type="button"
                                className="navbar-toggler collapsed mobile-hamburger-btn"
                                onClick={handleNavigationClick}
                            >
                                <span className="sr-only">Toggle navigation</span>
                                <span className="icon-bar icon-bar-first" />
                                <span className="icon-bar icon-bar-two" />
                                <span className="icon-bar icon-bar-three" />
                            </button>

                            {/* MAIN Nav - Desktop */}
                            <div className="nav-animation header-nav navbar-collapse collapse d-flex justify-content-center desktop-nav-menu">
                                <ul className="nav navbar-nav">
                                    <li className="has-mega-menu"><a href="/">Home</a></li>
                                    <li className="has-mega-menu"><a href="/about-us">About Us</a></li>
                                    
                                    {/* Conditional rendering based on role and login status */}
                                    {isLoggedIn ? (
                                        <>
                                            {/* Show Post Job for school/parent roles */}
                                            {(user.role === 'school' || user.role === 'parent') && (
                                                <li className="has-mega-menu"><a href="/inst-portal">Post Job</a></li>
                                            )}
                                            
                                            {/* Show Apply Job for teacher/tutor roles */}
                                            {(user.role === 'teacher' || user.role === 'tutor') && (
                                                <li className="has-mega-menu"><a href="/apply-job">Apply Job</a></li>
                                            )}
                                        </>
                                    ) : (
                                        // Show Post Job and Apply Job links for non-logged-in users that open modal
                                        <>
                                            <li className="has-mega-menu">
                                                <a href="#" onClick={handleSignUpClick} style={{ cursor: 'pointer' }}>
                                                    Post Job
                                                </a>
                                            </li>
                                            <li className="has-mega-menu">
                                                <a href="#" onClick={handleSignUpClick} style={{ cursor: 'pointer' }}>
                                                    Apply Job
                                                </a>
                                            </li>
                                        </>
                                    )}
                                    
                                    <li className="has-mega-menu"><a href="/contact-us">Contact Us</a></li>
                                </ul>
                            </div>

                            {/* Header Right Section - Desktop Only */}
                            <div className="extra-nav header-2-nav desktop-auth-section">
                                {isLoggedIn ? (
                                    <div className="extra-cell">
                                        <div className="header-nav-btn-section">
                                            <div className="user-profile-dropdown">
                                                <div className="dropdown">
                                                    <button 
                                                        className="btn dropdown-toggle user-dropdown-btn" 
                                                        type="button" 
                                                        id="userDropdown"
                                                        onClick={toggleProfileDropdown}
                                                    >
                                                        <img 
                                                            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || user.username)}&background=3b5d50&color=fff`} 
                                                            alt="User" 
                                                            className="user-avatar"
                                                        />
                                                        <span className="user-name">{user.name || user.username}</span>
                                                    </button>
                                                    {profileDropdownOpen && (
                                                        <div className="dropdown-menu show" aria-labelledby="userDropdown">
                                                            <div className="dropdown-header">
                                                                <h6>User Profile</h6>
                                                            </div>
                                                            <div className="dropdown-body">
                                                                <div className="user-info-item">
                                                                    <i className="fas fa-user"></i>
                                                                    <span>{user.username}</span>
                                                                </div>
                                                                <div className="user-info-item">
                                                                    <i className="fas fa-envelope"></i>
                                                                    <span>{user.email}</span>
                                                                </div>
                                                                {user.phone && (
                                                                    <div className="user-info-item">
                                                                        <i className="fas fa-phone"></i>
                                                                        <span>{user.phone}</span>
                                                                    </div>
                                                                )}
                                                                <div className="user-info-item">
                                                                    <i className="fas fa-user-tag"></i>
                                                                    <span>{user.role}</span>
                                                                </div>
                                                            </div>
                                                            <div className="dropdown-footer">
                                                                <button onClick={handleLogout} className="logout-btn">
                                                                    <i className="fas fa-sign-out-alt"></i> Logout
                                                                </button>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="extra-cell">
                                        <div className="header-nav-btn-section">
                                            <div className="twm-nav-btn-left">
                                                <a 
                                                    className="twm-nav-sign-up" 
                                                    href="#" 
                                                    onClick={handleSignUpClick}
                                                    role="button"
                                                >
                                                    <i className="feather-log-in"></i> Sign Up
                                                </a>
                                            </div>
                                            <div className="twm-nav-btn-right">
                                                <NavLink to="/login" className="twm-nav-post-a-job">
                                                    <i className="feather-log-in"></i> Sign In
                                                </NavLink>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Mobile Navigation Menu - Shows when hamburger is clicked */}
                        {menuActive && (
                            <div className="mobile-menu-container">
                                {/* Mobile Navigation Items */}
                                <div className="mobile-nav-wrapper">
                                    <ul className="mobile-nav-items">
                                        <li className="mobile-nav-item"><a href="/" onClick={() => setMenuActive(false)}>Home</a></li>
                                        <li className="mobile-nav-item"><a href="/about-us" onClick={() => setMenuActive(false)}>About Us</a></li>
                                        
                                        {/* Conditional rendering based on role and login status */}
                                        {isLoggedIn ? (
                                            <>
                                                {/* Show Post Job for school/parent roles */}
                                                {(user.role === 'school' || user.role === 'parent') && (
                                                    <li className="mobile-nav-item"><a href="/inst-portal" onClick={() => setMenuActive(false)}>Post Job</a></li>
                                                )}
                                                
                                                {/* Show Apply Job for teacher/tutor roles */}
                                                {(user.role === 'teacher' || user.role === 'tutor') && (
                                                    <li className="mobile-nav-item"><a href="/apply-job" onClick={() => setMenuActive(false)}>Apply Job</a></li>
                                                )}
                                            </>
                                        ) : (
                                            // Show Post Job and Apply Job links for non-logged-in users
                                            <>
                                                <li className="mobile-nav-item">
                                                    <a href="#" onClick={(e) => { e.preventDefault(); handleSignUpClick(e); setMenuActive(false); }}>
                                                        Post Job
                                                    </a>
                                                </li>
                                                <li className="mobile-nav-item">
                                                    <a href="#" onClick={(e) => { e.preventDefault(); handleSignUpClick(e); setMenuActive(false); }}>
                                                        Apply Job
                                                    </a>
                                                </li>
                                            </>
                                        )}
                                        
                                        <li className="mobile-nav-item"><a href="/contact-us" onClick={() => setMenuActive(false)}>Contact Us</a></li>
                                    </ul>
                                </div>

                                {/* Mobile Auth Section - Shows below navigation */}
                                <div className="mobile-auth-container">
                                    {isLoggedIn ? (
                                        <div className="mobile-user-profile-section">
                                            <div className="mobile-user-header-card">
                                                <img 
                                                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || user.username)}&background=3b5d50&color=fff`} 
                                                    alt="User" 
                                                    className="mobile-avatar"
                                                />
                                                <div className="mobile-user-basic-info">
                                                    <p className="mobile-user-display-name">{user.name || user.username}</p>
                                                    <p className="mobile-user-display-role">{user.role}</p>
                                                </div>
                                            </div>

                                            <div className="mobile-user-details-card">
                                                <div className="mobile-detail-row">
                                                    <i className="fas fa-envelope"></i>
                                                    <span>{user.email}</span>
                                                </div>
                                                {user.phone && (
                                                    <div className="mobile-detail-row">
                                                        <i className="fas fa-phone"></i>
                                                        <span>{user.phone}</span>
                                                    </div>
                                                )}
                                            </div>

                                            <button onClick={handleLogout} className="mobile-logout-button">
                                                <i className="fas fa-sign-out-alt"></i> Logout
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="mobile-auth-buttons-section">
                                            <a 
                                                className="mobile-signup-button" 
                                                href="#" 
                                                onClick={(e) => { handleSignUpClick(e); setMenuActive(false); }}
                                                role="button"
                                            >
                                                <i className="feather-log-in"></i> Sign Up
                                            </a>
                                            <NavLink 
                                                to="/login" 
                                                className="mobile-signin-button"
                                                onClick={() => setMenuActive(false)}
                                            >
                                                <i className="feather-log-in"></i> Sign In
                                            </NavLink>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </header>

            <style jsx>{`
                /* ===== DESKTOP STYLES (UNCHANGED) ===== */
                
                .header-top-container {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    position: relative;
                }

                .logo-header {
                    flex: 0 0 auto;
                    z-index: 10;
                }

                .logo-header-inner {
                    display: flex;
                    align-items: center;
                }

                .logo-flex {
                    display: flex;
                    align-items: center;
                    text-decoration: none;
                }

                .logo-img {
                    height: 40px;
                    width: auto;
                    margin-right: 10px;
                }

                .nav-text-ed {
                    margin: 0;
                    font-size: 18px;
                    font-weight: 600;
                    color: #2c3e50;
                }
                .nav-text-ed1 {
                 background: linear-gradient(90deg, #00C9FF 0%, #92FE9D 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text; /* for Firefox support */
  font-weight: 700;
                 display: none;
                    margin: 0;
                    font-size: 18px;
                    font-weight: 600;
                     color: #2c3e50;
                       white-space: nowrap;
 
                   
                }
                    //    tesing....

                /* Desktop Navigation Menu */
                .desktop-nav-menu {
                    display: flex !important;
                    flex: 1;
                    justify-content: center;
                }

                .desktop-nav-menu .nav {
                    display: flex;
                    list-style: none;
                    margin: 0;
                    padding: 0;
                }

                .desktop-nav-menu .nav li {
                    border: none;
                    margin-right: 30px;
                }

                .desktop-nav-menu .nav li a {
                    padding: 0;
                    display: inline;
                    color: #2c3e50;
                    text-decoration: none;
                    font-weight: 500;
                    transition: all 0.3s;
                }

                .desktop-nav-menu .nav li a:hover {
                    color: #01E9E9;
                }

                /* Desktop Auth Section */
                .desktop-auth-section {
                    display: flex !important;
                    align-items: center;
                    justify-content: flex-end;
                    flex: 0 0 auto;
                }

                /* User Profile Dropdown - Desktop */
                .user-profile-dropdown {
                    position: relative;
                }
                
                .user-dropdown-btn {
                    background: none;
                    border: none;
                    display: flex;
                    align-items: center;
                    color: #2c3e50;
                    font-weight: 500;
                    cursor: pointer;
                    padding: 5px 10px;
                    border-radius: 5px;
                    transition: all 0.3s;
                }
                
                .user-dropdown-btn:hover {
                    background-color: #f8f9fa;
                }
                
                .user-avatar {
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    margin-right: 10px;
                    object-fit: cover;
                    border: 2px solid #3b5d50;
                }
                
                .user-name {
                    font-size: 14px;
                }

                /* Dropdown Menu */
                .dropdown-menu {
                    width: 300px;
                    padding: 0;
                    border-radius: 8px;
                    overflow: hidden;
                    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
                    border: none;
                    position: absolute;
                    right: 0;
                    top: 100%;
                    z-index: 1000;
                    background: white;
                    margin-top: 10px;
                }
                
                .dropdown-header {
                    background-color: #01E9E9;
                    color: white;
                    padding: 15px;
                }
                
                .dropdown-header h6 {
                    margin: 0;
                    font-weight: 600;
                }
                
                .dropdown-body {
                    padding: 15px;
                }
                
                .user-info-item {
                    display: flex;
                    align-items: center;
                    margin-bottom: 10px;
                    font-size: 14px;
                    color: #495057;
                }
                
                .user-info-item i {
                    width: 20px;
                    margin-right: 10px;
                    color: #BC84CA;
                }
                
                .user-info-item span {
                    word-break: break-word;
                }
                
                .dropdown-footer {
                    padding: 15px;
                    border-top: 1px solid #dee2e6;
                    text-align: center;
                }
                
                .logout-btn {
                    background-color: #dc3545;
                    color: white;
                    border: none;
                    padding: 8px 15px;
                    border-radius: 5px;
                    transition: all 0.3s;
                    cursor: pointer;
                    font-weight: 500;
                }
                
                .logout-btn:hover {
                    background-color: #c82333;
                }

                /* Sign Up/Sign In Buttons - Desktop */
                .twm-nav-sign-up,
                .twm-nav-post-a-job {
                    text-decoration: none;
                    padding: 8px 16px;
                    border-radius: 5px;
                    margin-left: 10px;
                    transition: all 0.3s;
                    display: inline-flex;
                    align-items: center;
                    gap: 5px;
                    font-weight: 500;
                }

                .twm-nav-sign-up {
                    color: white;
                    background-color: #01E9E9;
                }

                .twm-nav-sign-up:hover {
                    background-color: #00d0d0;
                    text-decoration: none;
                }

                .twm-nav-post-a-job {
                    color: white;
                    background-color: #3b5d50;
                }

                .twm-nav-post-a-job:hover {
                    background-color: #2d4838;
                    text-decoration: none;
                }

                /* ===== MOBILE STYLES ===== */

                /* Mobile Hamburger Button */
                .mobile-hamburger-btn {
                    display: none;
                    border: none;
                    padding: 5px;
                    margin: 0 10px;
                    background: none;
                    cursor: pointer;
                }

                .icon-bar {
                    display: block;
                    width: 22px;
                    height: 2px;
                    background-color: #2c3e50;
                    margin: 4px 0;
                    transition: 0.3s;
                }

                /* Mobile Menu Container */
                .mobile-menu-container {
                    display: none;
                    width: 100%;
                    background-color: #f8f9fa;
                    border-top: 2px solid #dee2e6;
                    animation: slideDown 0.3s ease-out;
                }

                @keyframes slideDown {
                    from {
                        opacity: 0;
                        transform: translateY(-10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                /* Mobile Navigation Wrapper */
                .mobile-nav-wrapper {
                    padding: 0;
                    border-bottom: 2px solid #dee2e6;
                }

                .mobile-nav-items {
                    list-style: none;
                    margin: 0;
                    padding: 0;
                    display: flex;
                    flex-direction: column;
                }

                .mobile-nav-item {
                    border-bottom: 1px solid #e0e0e0;
                }

                .mobile-nav-item:last-child {
                    border-bottom: none;
                }

                .mobile-nav-item a {
                    display: block;
                    padding: 14px 20px;
                    color: #2c3e50;
                    text-decoration: none;
                    font-weight: 500;
                    transition: all 0.3s ease;
                    font-size: 15px;
                }

                .mobile-nav-item a:active,
                .mobile-nav-item a:visited {
                    color: #2c3e50;
                }

                .mobile-nav-item a:hover {
                    background-color: #e9ecef;
                    color: #01E9E9;
                    padding-left: 24px;
                }

                /* Mobile Auth Container */
                .mobile-auth-container {
                    padding: 20px;
                    background-color: #f8f9fa;
                }

                /* Mobile User Profile Section */
                .mobile-user-profile-section {
                    background-color: white;
                    border-radius: 8px;
                    padding: 15px;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                }

                .mobile-user-header-card {
                    display: flex;
                    align-items: center;
                    margin-bottom: 15px;
                    gap: 12px;
                }

                .mobile-avatar {
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    border: 2px solid #3b5d50;
                    object-fit: cover;
                    flex-shrink: 0;
                }

                .mobile-user-basic-info {
                    flex: 1;
                    min-width: 0;
                }

                .mobile-user-display-name {
                    margin: 0;
                    font-weight: 600;
                    color: #2c3e50;
                    font-size: 15px;
                    word-break: break-word;
                }

                .mobile-user-display-role {
                    margin: 5px 0 0 0;
                    font-size: 12px;
                    color: #6c757d;
                    text-transform: capitalize;
                }

                .mobile-user-details-card {
                    background-color: #f8f9fa;
                    border-radius: 5px;
                    padding: 12px;
                    margin-bottom: 15px;
                }

                .mobile-detail-row {
                    display: flex;
                    align-items: center;
                    font-size: 13px;
                    color: #495057;
                    margin-bottom: 8px;
                    gap: 10px;
                    word-break: break-word;
                }

                .mobile-detail-row:last-child {
                    margin-bottom: 0;
                }

                .mobile-detail-row i {
                    width: 16px;
                    color: #BC84CA;
                    flex-shrink: 0;
                    text-align: center;
                }

                .mobile-logout-button {
                    width: 100%;
                    padding: 12px 16px;
                    background-color: #dc3545;
                    color: white;
                    border: none;
                    border-radius: 5px;
                    font-weight: 500;
                    cursor: pointer;
                    transition: all 0.3s;
                    font-size: 14px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                }

                .mobile-logout-button:active {
                    background-color: #bd2130;
                }

                .mobile-logout-button:hover {
                    background-color: #c82333;
                }

                /* Mobile Auth Buttons Section */
                .mobile-auth-buttons-section {
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                }

                .mobile-signup-button,
                .mobile-signin-button {
                    display: block;
                    padding: 13px 16px;
                    border-radius: 5px;
                    text-align: center;
                    text-decoration: none;
                    font-weight: 500;
                    transition: all 0.3s;
                    border: none;
                    cursor: pointer;
                    font-size: 14px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                }

                .mobile-signup-button {
                    background-color: #01E9E9;
                    color: white;
                }

                .mobile-signup-button:active {
                    background-color: #00c7c7;
                }

                .mobile-signup-button:hover {
                    background-color: #00d0d0;
                    text-decoration: none;
                }

                .mobile-signin-button {
                    background-color: #3b5d50;
                    color: white;
                }

                .mobile-signin-button:active {
                    background-color: #2a4235;
                }

                .mobile-signin-button:hover {
                    background-color: #2d4838;
                    text-decoration: none;
                }

                /* ===== RESPONSIVE MEDIA QUERIES ===== */

                /* Tablet & Mobile - Show mobile menu (max-width: 992px) */
                @media (max-width: 992px) {
                    .mobile-hamburger-btn {
                        display: block;
                    }

                    .desktop-nav-menu {
                        display: none !important;
                    }

                    .desktop-auth-section {
                        display: none !important;
                    }

                    .mobile-menu-container {
                        display: block;
                    }

                    .logo-img {
                        height: 35px;
                    }
                }
@media (max-width: 768px) {
  .nav-text-ed1 {
    display: block;
  }
}
                /* Mobile - Medium (max-width: 768px) */
                
                @media (max-width: 768px) {
                    .nav-text-ed {
                        display: none;
                    }

                    .logo-img {
                        height: 32px;
                        margin-right: 0;
                    }

                    .mobile-nav-item a {
                        padding: 12px 18px;
                        font-size: 14px;
                    }

                    .mobile-auth-container {
                        padding: 15px;
                    }

                    .mobile-user-header-card {
                        margin-bottom: 12px;
                    }

                    .mobile-avatar {
                        width: 48px;
                        height: 48px;
                    }

                    .mobile-user-display-name {
                        font-size: 14px;
                    }

                    .mobile-detail-row {
                        font-size: 12px;
                    }

                    .mobile-signup-button,
                    .mobile-signin-button {
                        padding: 11px 14px;
                        font-size: 13px;
                    }

                    .mobile-logout-button {
                        padding: 11px 14px;
                        font-size: 13px;
                    }
                }

                /* Mobile - Small (max-width: 576px) */
                @media (max-width: 576px) {
                    .header-top-container {
                        padding: 0 10px;
                    }

                    .logo-img {
                        height: 30px;
                    }

                    .mobile-hamburger-btn {
                        margin: 0 5px;
                    }

                    .mobile-nav-item a {
                        padding: 10px 16px;
                        font-size: 13px;
                    }

                    .mobile-auth-container {
                        padding: 12px;
                    }

                    .mobile-user-profile-section {
                        padding: 12px;
                    }

                    .mobile-user-header-card {
                        margin-bottom: 10px;
                    }

                    .mobile-avatar {
                        width: 45px;
                        height: 45px;
                    }

                    .mobile-user-display-name {
                        font-size: 13px;
                    }

                    .mobile-user-display-role {
                        font-size: 11px;
                    }

                    .mobile-user-details-card {
                        padding: 10px;
                        margin-bottom: 12px;
                    }

                    .mobile-detail-row {
                        font-size: 11px;
                        margin-bottom: 6px;
                        gap: 8px;
                    }

                    .mobile-detail-row i {
                        width: 14px;
                    }

                    .mobile-signup-button,
                    .mobile-signin-button {
                        padding: 10px 12px;
                        font-size: 12px;
                        gap: 6px;
                    }

                    .mobile-logout-button {
                        padding: 10px 12px;
                        font-size: 12px;
                        gap: 6px;
                    }

                    .mobile-auth-buttons-section {
                        gap: 10px;
                    }
                }

                /* Mobile - Extra Small (max-width: 380px) */
                @media (max-width: 380px) {
                    .header-top-container {
                        padding: 0 8px;
                    }

                    .logo-img {
                        height: 28px;
                    }

                    .mobile-hamburger-btn {
                        margin: 0 3px;
                        padding: 3px;
                    }

                    .icon-bar {
                        width: 20px;
                        height: 1.5px;
                        margin: 3px 0;
                    }

                    .mobile-nav-item a {
                        padding: 9px 14px;
                        font-size: 12px;
                    }

                    .mobile-auth-container {
                        padding: 10px;
                    }

                    .mobile-user-profile-section {
                        padding: 10px;
                    }

                    .mobile-user-header-card {
                        margin-bottom: 8px;
                    }

                    .mobile-avatar {
                        width: 42px;
                        height: 42px;
                    }

                    .mobile-user-display-name {
                        font-size: 12px;
                    }

                    .mobile-user-details-card {
                        padding: 8px;
                        margin-bottom: 10px;
                    }

                    .mobile-detail-row {
                        font-size: 10px;
                        margin-bottom: 5px;
                        gap: 6px;
                    }

                    .mobile-signup-button,
                    .mobile-signin-button {
                        padding: 9px 10px;
                        font-size: 11px;
                        gap: 5px;
                    }

                    .mobile-logout-button {
                        padding: 9px 10px;
                        font-size: 11px;
                    }

                    .mobile-auth-buttons-section {
                        gap: 8px;
                    }
                }

                /* Desktop - Hide mobile elements (min-width: 993px) */
                @media (min-width: 993px) {
                    .mobile-hamburger-btn {
                        display: none;
                    }

                    .mobile-menu-container {
                        display: none !important;
                    }

                    .desktop-nav-menu {
                        display: flex !important;
                    }

                    .desktop-auth-section {
                        display: flex !important;
                    }

                    .logo-img {
                        height: 40px;
                    }

                    .nav-text-ed {
                        display: block;
                    }
                }
            `}</style>

            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" />
        </>
    )
}

export default Header1;
