import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "firebase/auth";
import React, { useRef } from "react";
import { auth } from "../firebase";
import "./SignUpOrSignInScreen.css";

function SignUpOrSignInScreen({
  signUpEmailOfGetStarted,
  goToSignInScreen,
  signUpFromGetStarted,
  handleSignUpOrSignInFromGetStarted,
  handleSetSignUpProcessOngoing,
  signUpProcessOngoing,
}) {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const handleSignUp = (state, goToSignInScreenState = false) => {
    handleSignUpOrSignInFromGetStarted(false, goToSignInScreenState);
    handleSetSignUpProcessOngoing(state);
  };

  const formSubmit = (e) => {
    e.preventDefault();
    if (signUpProcessOngoing) {
      createUserWithEmailAndPassword(
        auth,
        emailRef.current.value,
        passwordRef.current.value
      )
        .then((authUser) => {
          console.log(authUser);
        })
        .catch((error) => {
          alert(error.message);
        });
    } else if (!signUpProcessOngoing) {
      signInWithEmailAndPassword(
        auth,
        emailRef.current.value,
        passwordRef.current.value
      )
        .then((authUser) => {
          console.log(authUser);
        })
        .catch((error) => {
          alert(error.message);
        });
    }
  };
  return (
    <div className="signupScreen signupScreen__animation">
      <form onSubmit={formSubmit}>
        <h1>
          {!goToSignInScreen ||
          signUpFromGetStarted ||
          signUpProcessOngoing
            ? "Sign Up"
            : "Sign In"}
        </h1>
        <input
          className="signupScreen__input"
          ref={emailRef}
          placeholder="Email"
          type="Email"
          defaultValue={signUpEmailOfGetStarted && signUpEmailOfGetStarted}
          required
        />
        <input
          className="signupScreen__input"
          ref={passwordRef}
          placeholder="Password"
          type="password"
          required
        />
        {!goToSignInScreen ||
        signUpFromGetStarted ||
        signUpProcessOngoing ? (
          <input
            className="signupScreen__submit"
            type="submit"
            value="Sign Up"
          />
        ) : (
          <input
            className="signupScreen__submit"
            type="submit"
            value="Sign In"
          />
        )}

        <h5>
          <span className="signupScreen__gray">
            {!goToSignInScreen ||
            signUpFromGetStarted ||
            signUpProcessOngoing
              ? "Already have an account?"
              : "New to Netflix?"}{" "}
          </span>
          {!goToSignInScreen ||
          signUpFromGetStarted ||
          signUpProcessOngoing ? (
            <span
              className="signupScreen__link"
              onClick={() => handleSignUp(false, true)}
            >
              Sign In.
            </span>
          ) : (
            <span
              className="signupScreen__link"
              onClick={() => handleSignUp(true)}
            >
              Sign Up now.
            </span>
          )}
        </h5>
      </form>
    </div>
  );
}

export default SignUpOrSignInScreen;
