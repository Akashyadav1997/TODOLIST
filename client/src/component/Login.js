import React, { useState } from "react";
import Loader from "./Loader";
import { toast } from "react-toastify";

const Login = ({ setShowSignUp, setUserLoggedIn }) => {
	const [userDetails, setUserDetails] = useState({
		email: "",
		password: "",
	});
	const loginHandler = () => {
		if (userDetails.email === "" || userDetails.password === "") {
			toast.error("Please Enter Your Credentials Properly");
			return;
		}
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
				>
					Login
					{/* <Loader/> */}
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
