import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import "./LoginSignupModal.css"
import baseUrl from '../../../util/baseUrl';

const LoginModal = () => {
    const [isRightPanelActive, setIsRightPanelActive] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setfirstName] = useState("");
    const [lastName, setlastName] = useState("");
    const [username, setuserName] = useState("");
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate()

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
const handleLoginSubmit = async (event) => {
    event.preventDefault();

    let response = await fetch(`${baseUrl}/api/auth/login`, {
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
        setErrorMessage("Email or Password incorrect, please try again")
    }
}

const handleSignUpSubmit = async (event) => {
    event.preventDefault();

    // Step 1: Sign Up
    let signUpResponse = await fetch(`${baseUrl}/api/auth/signup`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
    },
        body: JSON.stringify({ firstName: firstName, lastName: lastName, email: email, password: password, username: username })
    });

    // Step 2: Log In
    if (signUpResponse.status === 200) {
        // GOOD NEWS.
        let loginResponse = await fetch(`${baseUrl}/api/auth/login`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
        },
            body: JSON.stringify({ email: email, password: password })
        });
        if (loginResponse.status === 200) {
            // GOOD NEWS.
            console.log("Login successful");
            let data = await loginResponse.json();
            window.localStorage.setItem("token", data.token);
            navigate('/test');
        } else {
            // BAD NEWS.
            setErrorMessage("Login failed, please try again")
            console.log(errorMessage);
        }
    } else {
        setErrorMessage("An error has occured, please try again")
    }
}


const handleEmailChange = (event) => {
    setEmail(event.target.value)
}

const handlePasswordChange = (event) => {
    setPassword(event.target.value)
}

const handleFirstNameChange = (event) => {
    setfirstName(event.target.value)
}

const handleLastNameChange = (event) => {
    setlastName(event.target.value)
}

const handleUserNameChange = (event) => {
    setuserName(event.target.value)
}

    return (
    <div className="allmodalcontent" >
    {/* This is the sign up form */}
    <div className={`container ${isRightPanelActive ? 'right-panel-active' : ''}`} id="container">
        <div className="form-container-sign-up-container">
            <form className="modalform" onSubmit={handleSignUpSubmit}>
            <h1 className="modalformheader">Create Account</h1>
            <input className="modalinput" id="first-name" type="text" placeholder="First Name" value={ firstName } onChange={handleFirstNameChange} />
            <input className="modalinput" id="last-name" type="text" placeholder="Last Name" value={ lastName } onChange={handleLastNameChange} />
            <input className="modalinput" id="user-name" type="text" placeholder="Username" value={ username } onChange={handleUserNameChange} />
            <input className="modalinput" id="sign-up-email" type="email" placeholder="Email" value={ email } onChange={handleEmailChange} />
            <input className="modalinput" id="sign-up-password" type="password" placeholder="Password" value={ password } onChange={handlePasswordChange} />
            <button className="btn" id="sign-up-submit" type="submit">Sign Up</button>
            </form>
        </div>

        {/* This is the login form */}
        <div className="form-container sign-in-container">
            <form className="modalform" onSubmit={handleLoginSubmit}>
            <h1 className="modalformheader">Login</h1>
            <input className="modalinput" id="login-email" type="email" placeholder="Email" value={ email } onChange={handleEmailChange} />
            <input className="modalinput" id="login-password" type="password" placeholder="Password" value={ password } onChange={handlePasswordChange} />
            {errorMessage && (
            <div className="error-message">

                <p className='modalp' >{errorMessage}</p>
            </div>
            )}

            <button className="btn" id="login-submit" type="submit">Submit</button>
            </form>
        </div>

        {/* These are the two containers used to create the effect of switching between panels */}
        <div className="overlay-container">
            <div className="overlay">
            <div className="overlay-panel overlay-left">
                <h1 className="modalformheader">Already have an account?</h1>
                <p className='modalp'>Click below to enter your details</p>
                <button id="go-to-login-form" className="ghost" onClick={handleSignInClick}>Go to Login</button>
            </div>

            <div className="overlay-panel overlay-right">
                <h1 className="modalformheader">Haven't signed up yet?</h1>
                <p className='modalp'>Click below to join us</p>
                <button id="go-to-signup-form" className="ghost" onClick={handleSignUpClick}>Sign Up</button>
            </div>
        </div>
        </div>
        </div>
    </div>
);
};

export default LoginModal;
