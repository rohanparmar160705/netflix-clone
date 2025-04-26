import React, { useRef, useState } from "react";
import netflixLogo from "../images/netflix-logo.png";
import "./LoginScreen.css";
import SignUpOrSignInScreen from "./SignUpOrSignInScreen";

function LoginScreen() {
  const [domLoaded, setDomLoaded] = useState(false);
  const [goToSignUpOrSignInScreen, setGoToSignUpOrSignInScreen] =
    useState(false);
  const [goToSignInScreen, setGoToSignInScreen] = useState(false);
  const [signUpEmailOfGetStarted, setSignUpEmailOfGetStarted] = useState(null);
  const [signUpFromGetStarted, setSignUpFromGetStarted] = useState(false);
  const [signUpProcessOngoing, setSignUpProcessOngoing] = useState(true);

  const emailRefOfGetStarted = useRef(null);

  const handleEmailRefOfGetStarted = () => {
    setSignUpEmailOfGetStarted(emailRefOfGetStarted.current.value);
  };

  const handleSignUpOrSignInFromGetStarted = (
    state,
    goToSignInScreenState = false,
    signUpProcessState = true
  ) => {
    setSignUpFromGetStarted(state);
    setGoToSignUpOrSignInScreen(true);
    setGoToSignInScreen(goToSignInScreenState);
    handleSetSignUpProcessOngoing(signUpProcessState);
  };

  const handleSetSignUpProcessOngoing = (state) => {
    setSignUpProcessOngoing(state);
  };

  // eslint-disable-next-line no-unused-vars
  const hadnleDomLoad = (e) => {
    setDomLoaded(true);
  };
  window.addEventListener("DOMContentLoaded", hadnleDomLoad);
  return (
    <div className="loginScreen">
      <div className="loginScreen__background">
        <img className="loginScreen__logo" src={netflixLogo} alt="" />
        <button
          onClick={() =>
            handleSignUpOrSignInFromGetStarted(false, true, false)
          }
          className="loginScreen__button"
        >
          Sign In
        </button>

        <div className="loginScreen__gradient"></div>
      </div>
      <div className="loginScreen__body">
        {goToSignUpOrSignInScreen ? (
          <SignUpOrSignInScreen
            signUpEmailOfGetStarted={signUpEmailOfGetStarted}
            goToSignInScreen={goToSignInScreen}
            signUpFromGetStarted={signUpFromGetStarted}
            handleSignUpOrSignInFromGetStarted={
              handleSignUpOrSignInFromGetStarted
            }
            handleSetSignUpProcessOngoing={handleSetSignUpProcessOngoing}
            signUpProcessOngoing={signUpProcessOngoing}
          />
        ) : (
          <>
            <h1 className={`${domLoaded && "loginScreen__animation"}`}>
              Unlimited films, TV programmes and more.
            </h1>
            <h2 className={`${domLoaded && "loginScreen__animation"}`}>
              Watch anywhere. Cancel at any time.
            </h2>
            <h3 className={`${domLoaded && "loginScreen__animation"}`}>
              Ready to watch? Enter your email to create or restart your
              membership.
            </h3>
            <div
              className={`loginScreen__input ${
                domLoaded && "loginScreen__animation"
              }`}
            >
              <form>
                <input
                  onChange={handleEmailRefOfGetStarted}
                  type="email"
                  ref={emailRefOfGetStarted}
                  placeholder="Email Address"
                />
                <button
                  onClick={() =>
                    handleSignUpOrSignInFromGetStarted(true, false, true)
                  }
                  className="loginScreen__getStarted"
                >
                  Get Started
                </button>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default LoginScreen;
