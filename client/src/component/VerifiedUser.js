import React, { useState } from "react";
import Auth from "./Auth";
import ToDoList from "./ToDoList";

const VerifiedUser = () => {
	const [userLoggedIn, setUserLoggedIn] = useState(false);
	console.log(userLoggedIn);

	return userLoggedIn ? (
		<ToDoList setUserLoggedIn={setUserLoggedIn} />
	) : (
		<Auth setUserLoggedIn={setUserLoggedIn} />
	);
};

export default VerifiedUser;
