import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import Modal from "./Modal";
import { MdDarkMode } from "react-icons/md";
import { IoMdSunny } from "react-icons/io";
import { BsCalendar2CheckFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { compose } from "@reduxjs/toolkit";
import Loader from "./Loader";
const ToDoList = ({ setUserLoggedIn }) => {
	const url = process.env.REACT_APP_SERVER_URL;
	const [allEvents, setAllEvents] = useState([]);
	const [inputText, setInputText] = useState("");
	const [editValue, setEditValue] = useState({});
	const [deleteValue, setDeleteValue] = useState({});
	const [showEditModal, setShowEditModal] = useState(false);
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [showDeleteAllModal, setDeleteAllModal] = useState(false);
	const [darkMode, setDarkMode] = useState(false);
	const [completeEvents, setCompleteEvents] = useState([]);
	const completedItems = useRef([]);
	const [completeLoader, setCompleteLoader] = useState(false);
	const [deleteLoader, setDeleteLoader] = useState(false);
	const { email, name, id } = useSelector(
		(state) => state.userReducer.user || {}
	);
	const events = useSelector((state) => state.eventLists || []);
	const dispatch = useDispatch();
	console.log(id);

	const handleInputSubmit = async () => {
		if (inputText === "") {
			return toast.error("Please Enter the Field First");
		}
		const response = await fetch(`${url}/createevent`, {
			method: "POST",
			body: JSON.stringify({
				title: inputText,
				creationDate: new Date(),
				id: Date.now(),
				completion: false,
				email: email,
			}),
			headers: {
				"Content-Type": "application/json",
			},
		});
		const data = await response.json();
		console.log(data);
		if (data.success) {
			dispatch({ type: "addEvent", payload: data.event });
		}
		setInputText("");
	};

	const handleEditClick = (event) => {
		console.log(event);
		setEditValue(event);
		setShowEditModal(true);
	};
	const editModalChangeHandler = (e) => {
		setEditValue((prevValue) => ({ ...prevValue, title: e.target.value }));
	};
	const submitEditModalHandler = async () => {
		console.log(editValue);

		const response = await fetch(`${url}/editEvent`, {
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ _id: editValue._id, title: editValue.title }),
			method: "POST",
		});
		const { success, message } = await response.json();
		if (success) {
			dispatch({ type: "editEvent", payload: editValue });
		}
		setShowEditModal(false);
	};
	const handleDeleteClick = (event) => {
		console.log(event);

		setDeleteValue(event);
		setShowDeleteModal(true);
	};
	const deleteModalHandler = async () => {
		const response = await fetch(`${url}/deleteEvent`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ _id: deleteValue._id }),
		});
		const { success, message } = await response.json();
		if (success) {
			toast.success(message);
			dispatch({ type: "removeEvent", payload: { _id: deleteValue._id } });
		}
		console.log("delete modal wala is workinggggg");
		console.log(deleteValue);
		const deleteEventId = deleteValue.id;
		const newlyEvents = allEvents.filter((event) => {
			return event.id !== deleteEventId;
		});
		setAllEvents(newlyEvents);
		setShowDeleteModal(false);
	};
	const deleteAllModalHandler = async () => {
		setDeleteLoader(true);
		const response = await fetch(`${url}/deleteAll`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ _id: id }),
		});
		const { message, success } = await response.json();
		if (success) {
			toast.success(message);
			dispatch({ type: "deleteAll" });
		}
		setDeleteLoader(false);
		setDeleteAllModal(false);
	};
	const changeHandlerCompleteEvents = (event) => {
		setCompleteEvents((prevValue) => {
			const eventExist = prevValue.find((e) => e.id === event.id);
			if (eventExist) {
				return prevValue.filter((e) => e.id !== event.id);
			} else {
				return [...prevValue, event];
			}
		});
	};
	const modifyCompletedEvents = async () => {
		console.log("below is the compleeeee");
		setCompleteLoader(true);
		console.log(completeEvents);
		const response = await fetch(`${url}/updateCompletion`, {
			headers: {
				"Content-Type": "application/json",
			},
			method: "POST",
			body: JSON.stringify({ events: completeEvents }),
		});
		const { success, message, results } = await response.json();
		console.log(results);
		if (success) {
			toast.success(message);
			dispatch({ type: "completeEvent", payload: results });
		}
		setAllEvents((data) => {
			return data.map((item) => {
				const isExist = completeEvents.some((data) => data.id === item.id);
				if (isExist) {
					return { ...item, completion: true };
				}
				return item;
			});
		});
		setCompleteLoader(false);
	};
	console.log(completeEvents);

	useEffect(() => {}, [events]);
	return (
		<div
			className={`${
				darkMode ? "darkBackground " : "background"
			} dark:bg-slate-500 bg- h-screen w-full flex justify-center items-center ${
				darkMode ? "dark" : null
			}  duration-1000`}
		>
			<div className="bg-white rounded-xl w-8/12 h-auto flex flex-col items-center dark:bg-slate-800 dark:text-white duration-1000 z-10">
				<div className=" p-3 text-2xl font-bold my-5">To-Do</div>
				<div className=" absolute self-start mt-3 ml-4 p-2 text-3xl ">
					{/* <select className=" bg-inherit cursor-pointer border-none outline-none">
						<option className="cursor-pointer" value="">
							All
						</option>
						<option className="cursor-pointer" value="">
							Completed
						</option>
					</select> */}
					<h1 className=" capitalize">{name ? name : "Unkown"}</h1>
				</div>
				<div
					className="self-end absolute p-2 flex"
					onClick={() => {
						setDarkMode((prevValue) => !prevValue);
					}}
				>
					{darkMode ? (
						<IoMdSunny
							style={{ fontSize: "45px", color: "yellow" }}
							className=" cursor-pointer"
						/>
					) : (
						<MdDarkMode
							style={{ fontSize: "45px", color: "#1b1a1a" }}
							className=" cursor-pointer"
						/>
					)}
					<button
						className=" ring-1 ring-red-500 text-red-500 rounded-lg p-2 capitalize mx-3 hover:text-white hover:bg-red-500 duration-300"
						onClick={() => setUserLoggedIn(false)}
					>
						Logout
					</button>
				</div>
				{/* input section  */}
				<div className=" border-2 hover:border-blue-800 duration-300 w-5/6 h-12 flex justify-between rounded-xl my-8">
					<input
						type="text"
						// ref={inputValue}
						value={inputText}
						onChange={(e) => {
							setInputText(e.target.value);
						}}
						onKeyDown={(e) => {
							e.key === "Enter" && handleInputSubmit(e);
						}}
						className=" w-full border-none rounded-l-lg outline-none dark:bg-white pl-5 dark:text-black"
						placeholder="Add New To Do..."
					/>
					<button
						className=" bg-blue-600 px-8 text-white font-bold rounded-r-lg hover:bg-blue-800"
						onClick={handleInputSubmit}
					>
						Add
					</button>
				</div>
				<div className="w-full max-h-48 overflow-y-scroll text-center">
					{events.length !== 0 ? (
						events.map((event, index) => {
							return (
								<>
									<div
										className="grid grid-cols-10 w-full  justify-items-center py-3 dark:hover:bg-slate-400 hover:bg-slate-200 duration-300 items-center border-b"
										key={index}
									>
										<div className="col-span-1 flex flex-col items-center font-serif">
											<span>
												{moment(event.creationDate).format("hh:mm A")}
											</span>

											<span>
												{moment(event.creationDate).format("DD-MM-YYYY")}
											</span>
										</div>
										<input
											type="checkbox"
											onClick={() => changeHandlerCompleteEvents(event)}
											className="border-2 cursor-pointer border-black mx-4 col-span-1"
										/>
										<div className=" font-sans col-span-5 text-2xl overflow-x-hidden break-all place-self-start">
											{event.title.toLowerCase()}
										</div>
										<div className="grid grid-flow-col col-span-3 gap-4">
											{event.completion && (
												<div className="flex flex-col col-span-1 items-center justify-center align-middle">
													<BsCalendar2CheckFill
														style={{ fontSize: "45px", color: "green" }}
														className=" cursor-pointer"
													/>
													<p className=" text-[10px]">Completed</p>
												</div>
											)}
											<button
												className="bg-blue-600 py-3 px-4  col-span-1 rounded-lg text-white font-bold hover:bg-blue-800"
												onClick={() => handleEditClick(event)}
											>
												Edit
											</button>
											<button
												className="bg-red-600 rounded-lg py-3 px-2 mr-2 col-span-1 text-white font-bold hover:bg-red-800"
												onClick={() => handleDeleteClick(event)}
											>
												Remove
											</button>
										</div>
									</div>
								</>
							);
						})
					) : (
						<span className=" text-center text-xl text-yellow-500 underline ">
							You Have Not Assigned any Task
						</span>
					)}
				</div>
				<hr className=" border w-5/6 mx-4 mt-4" />
				<div className="flex justify-between w-full text-gray-400 px-4 py-8 items-center">
					<span>Total Items {events.length}</span>
					<button
						className={`ring-1 p-2 px-4 ring-gray-300 hover:ring-gray-500 duration-300 rounded-lg ${
							completeEvents.length !== 0 && "bg-green-500 text-white"
						}`}
						onClick={modifyCompletedEvents}
					>
						{completeLoader ? <Loader /> : "Complete"}
					</button>
					<button
						className="cursor-pointer border p-3 hover:border-red-600 rounded-lg  hover:bg-red-600 hover:text-white duration-500"
						onClick={() => setDeleteAllModal((prevValue) => !prevValue)}
					>
						Delete All
					</button>
				</div>
			</div>
			{showEditModal && (
				<Modal setShowModal={setShowEditModal}>
					<div className="flex flex-col items-center w-96">
						<div className="text-2xl p-3 font-semibold mb-4 ">
							Edit Your Task here{" "}
						</div>
						<input
							// ref={editInputValue}
							value={editValue.title}
							onChange={editModalChangeHandler}
							onKeyDown={(e) => {
								e.key === "Enter" && submitEditModalHandler(e);
							}}
							type="text"
							className=" w-full border-2 bg-slate-50 p-4 rounded-lg dark:text-black"
							placeholder="Remodify your tast"
						/>
						<button
							className="bg-blue-700 p-3 rounded-xl text-white font-bold mt-8 px-12 hover:bg-blue-900 duration-300"
							onClick={submitEditModalHandler}
						>
							Submit
						</button>
					</div>
				</Modal>
			)}
			{showDeleteModal && (
				<Modal setShowModal={setShowDeleteModal}>
					<div className="flex flex-col items-center">
						<h1 className="text-xl p-4 text-red-600 font-semibold">
							Are You Sure You wants to Remove Below Event
						</h1>
						<h1 className=" text-xl">{deleteValue.title}</h1>
						<button
							className="bg-red-600 hover:bg-red-700 text-white font-semibold p-2 px-16 rounded-lg mt-8"
							onClick={deleteModalHandler}
						>
							Yes
						</button>
					</div>
				</Modal>
			)}
			{showDeleteAllModal && (
				<Modal setShowModal={setDeleteAllModal}>
					<div className="flex flex-col items-center">
						<h1 className="text-2xl p-4 text-red-600 font-semibold">
							Are You Sure You wants to Delete All Events You Created !
						</h1>
						<button
							className="bg-red-600 hover:bg-red-700 text-white font-semibold p-2 px-28 rounded-lg mt-8"
							onClick={deleteAllModalHandler}
						>
							{deleteLoader ? <Loader /> : "Yes"}
						</button>
					</div>
				</Modal>
			)}
		</div>
	);
};

export default ToDoList;
