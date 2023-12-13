import React, { useState, useEffect } from 'react'
import "./LoginSignupModal.css"

const LoginModal = ({ navigate }) => {
    const [isRightPanelActive, setIsRightPanelActive] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState('');

// This is to meet QE - it is React's way of setting a page title as you can't just add <title></title> to JSX
// As this is a modal and will pop up on the home page, this may not be needed? But also I'm sure you could use conditional rendering to also change the page title
useEffect(() => {
        document.title = 'Login or Sign Up';
    }, []);

//This will change the modal pane to the Sign up side
const handleSignUpClick = () => {
    setIsRightPanelActive(true);};

//This will change the modal pane to the Login side
const handleSignInClick = () => {
    setIsRightPanelActive(false);
};

//This sends the email and password state to the backend route for login to verify the user
const handleSubmit = async (event) => {
    event.preventDefault();

    let response = await fetch( '/login', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
    },
        body: JSON.stringify({ email: email, password: password })
    });
    if (response.status === 200) {
      // GOOD NEWS.
        console.log("token");
        let data = await response.json();
        window.localStorage.setItem("token", data.token);
        navigate('/test');
    } else {
      // BAD NEWS.
        navigate('/');
        console.log(email, password)
    }
}

const handleEmailChange = (event) => {
    setEmail(event.target.value)
}

const handlePasswordChange = (event) => {
    setPassword(event.target.value)
}

    return (
    <>
    <div className={`container ${isRightPanelActive ? 'right-panel-active' : ''}`} id="container">
        <div className="form-container sign-up-container">
            <form action="#">
            <h1>Create Account</h1>
            <input id="first-name" type="text" placeholder="First Name" />
            <input id="last-name" type="text" placeholder="Last Name" />
            <input id="user-name" type="text" placeholder="Username" />
            <input id="sign-up-email" type="email" placeholder="Email" />
            <input id="sign-up-password" type="password" placeholder="Password" />
            <button id="sign-up-submit" type="submit">Sign Up</button>
            </form>
        </div>

        <div className="form-container sign-in-container">
            <form onSubmit={handleSubmit}>
            <h1>Login</h1>
            <input id="login-email" type="email" placeholder="Email" value={ email } onChange={handleEmailChange} />
            <input id="login-password" type="password" placeholder="Password" value={ password } onChange={handlePasswordChange} />
            {/* {errorMessage && (
            <div className="error-message">
                <p>{errorMessage}</p>
            </div>
            )} */}
            <button id="login-submit" type="submit">Submit</button>
            </form>
        </div>

        <div className="overlay-container">
            <div className="overlay">
            <div className="overlay-panel overlay-left">
                <h1>Already have an account?</h1>
                <p>Click below to enter your details</p>
                <button id="go-to-login-form" className="ghost" onClick={handleSignInClick}>Go to Login</button>
            </div>

            <div className="overlay-panel overlay-right">
                <h1>Haven't signed up yet?</h1>
                <p>Click below to join us</p>
                <button id="go-to-signup-form" className="ghost" onClick={handleSignUpClick}>Sign Up</button>
            </div>
        </div>
        </div>
        </div>
    </>
);
};

export default LoginModal;
