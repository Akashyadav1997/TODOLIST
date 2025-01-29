import React, { useState } from "react";
import SignUp from "./SignUp";
import Login from "./Login";
const Auth = ({ setUserLoggedIn }) => {
	const [showSignup, setShowSignUp] = useState(false);
	return showSignup ? (
		<SignUp setShowSignUp={setShowSignUp} setUserLoggedIn={setUserLoggedIn} />
	) : (
		<Login setShowSignUp={setShowSignUp} setUserLoggedIn={setUserLoggedIn} />
	);
};

export default Auth;
