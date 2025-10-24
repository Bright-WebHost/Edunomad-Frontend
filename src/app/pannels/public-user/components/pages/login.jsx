import { NavLink, useNavigate } from "react-router-dom";
import JobZImage from "../../../../common/jobz-img";
import { canRoute, candidate, empRoute, employer, publicUser } from "../../../../../globals/route-names";
import { useState, useEffect } from "react";


function LoginPage() {
    const navigate = useNavigate();
    const [candidateEmail, setCandidateEmail] = useState('');
    const [employerEmail, setEmployerEmail] = useState('');
    const [candidatePassword, setCandidatePassword] = useState('');
    const [employerPassword, setEmployerPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState({ candidate: false, employer: false });
    const [showCandidatePassword, setShowCandidatePassword] = useState(false);
    const [showEmployerPassword, setShowEmployerPassword] = useState(false);
    const [isGoogleLoading, setIsGoogleLoading] = useState(false);
    const [showRolePopup, setShowRolePopup] = useState(false);
    const [selectedRole, setSelectedRole] = useState('parent'); // Default to 'parent'
    const [roleError, setRoleError] = useState('');


    // Handle Google OAuth message from popup
    useEffect(() => {
        const handleMessage = (event) => {
            // For security, you might want to check the origin
            // if (event.origin !== 'http://localhost:7001') return;


            if (event.data.type === 'GOOGLE_OAUTH_SUCCESS') {
                const { token, user, requiresRoleCompletion } = event.data;
                
                localStorage.setItem('token', token);
                localStorage.setItem('user', JSON.stringify(user));
                setIsGoogleLoading(false);


                if (requiresRoleCompletion) {
                    // Redirect to role completion page
                    navigate('/', { 
                        state: { 
                            userId: user.id,
                            email: user.email,
                            username: user.username 
                        } 
                    });
                } else {
                    // Regular login success
                    alert('Login successful!');
                    
                    // Redirect based on user role
                    if (user.role === 'school' || user.role === 'parent') {
                        navigate(canRoute(candidate.DASHBOARD));
                    } else if (user.role === 'teacher' || user.role === 'tutor') {
                        navigate(empRoute(employer.DASHBOARD));
                    } else {
                        navigate(publicUser.HOME1);
                    }
                }
            }


            if (event.data.type === 'GOOGLE_OAUTH_ERROR') {
                setError(event.data.message);
                setIsGoogleLoading(false);
            }
        };


        window.addEventListener('message', handleMessage);


        return () => {
            window.removeEventListener('message', handleMessage);
        };
    }, [navigate]);


    const handleGoogleLogin = () => {
        setShowRolePopup(true);
        setRoleError('');
        setSelectedRole('parent'); // Reset to default 'parent' when popup opens
    };


    const handleRoleSubmit = async () => {
        if (!selectedRole) {
            setRoleError('Please select a role');
            return;
        }

        setIsGoogleLoading(true);
        setError('');
        setShowRolePopup(false);

        try {
            // Open Google OAuth in new window with role parameter
            const width = 600;
            const height = 600;
            const left = (window.screen.width - width) / 2;
            const top = (window.screen.height - height) / 2;

            // Store selected role in sessionStorage to access after OAuth
            sessionStorage.setItem('selectedRole', selectedRole);

            const popup = window.open(
                `https://api.edunomad.org/api/auth/google?role=${selectedRole}`,
                'Google Login',
                `width=${width},height=${height},left=${left},top=${top}`
            );

            // Check if popup is closed without success
            const checkPopup = setInterval(() => {
                if (popup && popup.closed) {
                    clearInterval(checkPopup);
                    setIsGoogleLoading(false);
                    sessionStorage.removeItem('selectedRole');
                }
            }, 500);

        } catch (error) {
            console.error('Google login error:', error);
            setError('Google login failed. Please try again.');
            setIsGoogleLoading(false);
            sessionStorage.removeItem('selectedRole');
        }
    };


    const handleCancelRole = () => {
        setShowRolePopup(false);
        setSelectedRole('parent'); // Reset to default 'parent' when cancelled
        setRoleError('');
    };


    const handleCandidateLogin = async (event) => {
        event.preventDefault();
        setIsLoading({ ...isLoading, candidate: true });
        setError('');
        
        try {
            const response = await fetch('https://api.edunomad.org/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: candidateEmail,
                    password: candidatePassword
                })
            });


            const data = await response.json();
            
            if (response.ok) {
                // Store token and user data
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
                
                // Redirect based on user role
                if (data.user.role === 'school' || data.user.role === 'parent') {
                    navigate(canRoute(candidate.DASHBOARD));
                } else if (data.user.role === 'teacher' || data.user.role === 'tutor') {
                    navigate(empRoute(employer.DASHBOARD));
                } else {
                    // Default redirect for other roles
                    navigate(publicUser.HOME1);
                }
            } else {
                setError(data.message || 'Login failed');
            }
        } catch (error) {
            console.error('Login error:', error);
            setError('Cannot connect to server. Please try again later.');
        } finally {
            setIsLoading({ ...isLoading, candidate: false });
        }
    }


    const handleEmployerLogin = async (event) => {
        event.preventDefault();
        setIsLoading({ ...isLoading, employer: true });
        setError('');
        
        try {
            const response = await fetch('https://api.edunomad.org/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: employerEmail,
                    password: employerPassword
                })
            });


            const data = await response.json();
            
            if (response.ok) {
                // Store token and user data
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
                
                // Redirect based on user role
                if (data.user.role === 'school' || data.user.role === 'parent') {
                    navigate(canRoute(candidate.DASHBOARD));
                } else if (data.user.role === 'teacher' || data.user.role === 'tutor') {
                    navigate(empRoute(employer.DASHBOARD));
                } else {
                    // Default redirect for other roles
                    navigate(publicUser.HOME1);
                }
            } else {
                setError(data.message || 'Login failed');
            }
        } catch (error) {
            console.error('Login error:', error);
            setError('Cannot connect to server. Please try again later.');
        } finally {
            setIsLoading({ ...isLoading, employer: false });
        }
    }


    return (
        <>
            <div className="section-full site-bg-white">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-xl-8 col-lg-6 col-md-5 twm-log-reg-media-wrap">
                            <div className="twm-log-reg-media">
                                <div className="twm-l-media">
                                    <JobZImage src="images/login-bg.png" alt="" />
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4 col-lg-6 col-md-7">
                            <div className="twm-log-reg-form-wrap">
                                <div className="twm-log-reg-logo-head">
                                    <NavLink to={publicUser.HOME1}>
                                         <img src="assets/images/Eduno logo.png" className="logo-img"/>
                                        <h3 className='nav-text-ed'>EduNomad Connect</h3>
                                    </NavLink>
                                </div>
                                <div className="twm-log-reg-inner">
                                    <div className="twm-log-reg-head">
                                        <div className="twm-log-reg-logo">
                                            <span className="log-reg-form-title">Log In</span>
                                        </div>
                                    </div>
                                    {error && (
                                        <div className="alert alert-danger mt-3" role="alert">
                                            {error}
                                        </div>
                                    )}
                                    
                                    {/* Google Login Button */}
                                    <div className="mb-4">
                                        <button 
                                            type="button"
                                            className="btn btn-outline-danger w-100 py-2 d-flex align-items-center justify-content-center"
                                            onClick={handleGoogleLogin}
                                            disabled={isGoogleLoading}
                                        >
                                            {isGoogleLoading ? (
                                                <>
                                                    <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                                                    Connecting...
                                                </>
                                            ) : (
                                                <>
                                                    <img 
                                                        src="https://developers.google.com/identity/images/g-logo.png" 
                                                        alt="Google" 
                                                        style={{ width: '18px', height: '18px', marginRight: '10px' }}
                                                    />
                                                    Continue with Google
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Role Selection Popup */}
            {showRolePopup && (
                <div className="role-popup-overlay">
                    <div className="role-popup-container">
                        <div className="role-popup-header">
                            <h4>Select Your Role</h4>
                            <button 
                                className="role-popup-close"
                                onClick={handleCancelRole}
                            >
                                &times;
                            </button>
                        </div>
                        <div className="role-popup-body">
                            <p className="role-popup-description">
                                Please select your role to continue with Google login
                            </p>
                            
                            <div className="form-group">
                                <label htmlFor="roleSelect" className="form-label">
                                    Role <span className="text-danger">*</span>
                                </label>
                                <select 
                                    id="roleSelect"
                                    className="form-control form-select"
                                    value={selectedRole}
                                    onChange={(e) => {
                                        setSelectedRole(e.target.value);
                                        setRoleError('');
                                    }}
                                >
                                    <option value="parent">Parent</option>
                                    <option value="school">School</option>
                                    <option value="teacher">Teacher</option>
                                    <option value="tutor">Tutor</option>
                                </select>
                                {roleError && (
                                    <small className="text-danger mt-1 d-block">
                                        {roleError}
                                    </small>
                                )}
                            </div>
                        </div>
                        <div className="role-popup-footer">
                            <button 
                                className="btn btn-secondary me-2"
                                onClick={handleCancelRole}
                            >
                                Cancel
                            </button>
                            <button 
                                className="btn btn-primary"
                                onClick={handleRoleSubmit}
                            >
                                Continue
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <style>
                {`
                .password-input-container {
                    position: relative;
                }
                
                .password-toggle-icon {
                    position: absolute;
                    right: 15px;
                    top: 50%;
                    transform: translateY(-50%);
                    cursor: pointer;
                    color: #777;
                }
                
                .password-toggle-icon:hover {
                    color: #333;
                }

                .btn-outline-danger {
                    border-color: #db4437;
                    color: #db4437;
                }

                .btn-outline-danger:hover {
                    background-color: #db4437;
                    color: white;
                }

                /* Role Popup Styles */
                .role-popup-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background-color: rgba(0, 0, 0, 0.5);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 9999;
                }

                .role-popup-container {
                    background: white;
                    border-radius: 8px;
                    width: 90%;
                    max-width: 400px;
                    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
                    animation: slideIn 0.3s ease-out;
                }

                @keyframes slideIn {
                    from {
                        transform: translateY(-50px);
                        opacity: 0;
                    }
                    to {
                        transform: translateY(0);
                        opacity: 1;
                    }
                }

                .role-popup-header {
                    padding: 20px;
                    border-bottom: 1px solid #e0e0e0;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                .role-popup-header h4 {
                    margin: 0;
                    font-size: 20px;
                    font-weight: 600;
                    color: #333;
                }

                .role-popup-close {
                    background: none;
                    border: none;
                    font-size: 28px;
                    color: #999;
                    cursor: pointer;
                    padding: 0;
                    width: 30px;
                    height: 30px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 50%;
                    transition: all 0.2s;
                }

                .role-popup-close:hover {
                    background-color: #f5f5f5;
                    color: #333;
                }

                .role-popup-body {
                    padding: 20px;
                }

                .role-popup-description {
                    color: #666;
                    margin-bottom: 20px;
                    font-size: 14px;
                }

                .role-popup-body .form-label {
                    font-weight: 600;
                    color: #333;
                    margin-bottom: 8px;
                }

                .role-popup-body .form-select {
                    padding: 10px 12px;
                    font-size: 15px;
                    border: 1px solid #ddd;
                    border-radius: 5px;
                    cursor: pointer;
                    transition: border-color 0.2s;
                }

                .role-popup-body .form-select:focus {
                    border-color: #db4437;
                    outline: none;
                    box-shadow: 0 0 0 3px rgba(219, 68, 55, 0.1);
                }

                .role-popup-footer {
                    padding: 15px 20px;
                    border-top: 1px solid #e0e0e0;
                    display: flex;
                    justify-content: flex-end;
                    gap: 10px;
                }

                .role-popup-footer .btn {
                    padding: 8px 20px;
                    font-size: 14px;
                    border-radius: 5px;
                    font-weight: 500;
                    transition: all 0.2s;
                }

                .role-popup-footer .btn-secondary {
                    background-color: #6c757d;
                    border-color: #6c757d;
                    color: white;
                }

                .role-popup-footer .btn-secondary:hover {
                    background-color: #5a6268;
                    border-color: #545b62;
                }

                .role-popup-footer .btn-primary {
                    background-color: #db4437;
                    border-color: #db4437;
                    color: white;
                }

                .role-popup-footer .btn-primary:hover {
                    background-color: #c23321;
                    border-color: #b52e1f;
                }
                `}
            </style>
        </>
    )
}


export default LoginPage;
