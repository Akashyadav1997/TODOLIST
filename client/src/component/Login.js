import React, { useState } from "react";
import Loader from "./Loader";
import { toast } from "react-toastify";
import axios from "axios";
import { useDispatch } from "react-redux";
const Login = ({ setShowSignUp, setUserLoggedIn }) => {
	console.log("below is server url");
	console.log(process.env.REACT_APP_SERVER_URL);
	const url = process.env.REACT_APP_SERVER_URL;
	const [userDetails, setUserDetails] = useState({
		email: "",
		password: "",
	});
	const dispatch = useDispatch();
	const [showLoader, setShowLoader] = useState(false);
	const loginHandler = async () => {
		if (userDetails.email === "" || userDetails.password === "") {
			toast.error("Please Enter Your Credentials Properly");
			return;
		}
		setShowLoader(true);
		const data = await fetch(`${url}/loginuser`, {
			method: "POST",
			body: JSON.stringify({
				email: userDetails.email,
				password: userDetails.password,
			}),
			headers: {
				"Content-Type": "application/json",
			},
		});
		const response = await data.json();
		if (!response.success) {
			setShowLoader(false);
			return toast.error(response.message);
		}
		console.log(response);
		if (response.success) {
			toast.success(response.messsge);
			dispatch({ type: "updateUserDetails", payload: { user: response.user } });
			dispatch({ type: "updateEventList", payload: response.events });
		}
		// console.log(message);
		setShowLoader(false);
		setUserLoggedIn(true);
	};
	const handleChange = (e) => {
		console.log(e.target.value);
		setUserDetails((preValue) => ({
			...preValue,
			[e.target.name]: e.target.value,
		}));
	};
	return (
		<div className="background h-screen w-full flex justify-center items-center">
			<div className=" bg-white w-4/12 h-3/6 z-10 rounded-xl flex flex-col items-center">
				<h1 className=" text-4xl mt-4">ToDoList</h1>
				<input
					type="email"
					name="email"
					placeholder="Please Enter Your Email"
					className="mt-6 w-4/6 ring-1 ring-gray-400 p-2 rounded"
					value={userDetails.email}
					onChange={handleChange}
				/>
				<input
					type="password"
					name="password"
					value={userDetails.password}
					className="mt-6 w-4/6 ring-1 ring-gray-400 p-2 rounded"
					placeholder="Please enter your passoword"
					onChange={handleChange}
				/>
				{/* <Loader/> */}
				<button
					className="w-4/6 rounded-lg bg-blue-500 text-white mt-6 p-3  hover:bg-blue-700 duration-300 flex justify-center"
					onClick={loginHandler}
					disabled={showLoader}
				>
					{showLoader ? <Loader /> : "Login"}
				</button>
				<span className="mt-3">OR</span>
				<p
					className=" mt-6 cursor-pointer text-lg text-blue-600 hover:text-xl duration-300"
					onClick={() => setShowSignUp(true)}
				>
					Sign Up
				</p>
			</div>
		</div>
	);
};

export default Login;
