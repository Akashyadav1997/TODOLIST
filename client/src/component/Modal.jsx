import React from "react";

const Modal = ({ setShowModal, children }) => {
	const handleModalClick = (e) => {
		e.stopPropagation(); // Prevent the click event from propagating to the parent div
	};
	return (
		<>
			<div
				className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
				onClick={() => setShowModal(false)}
			>
				<div
					className="bg-white dark:bg-gray-800 dark:text-white p-8 rounded-lg flex flex-col items-center  "
					onClick={handleModalClick}
				>
					{children}
					<hr
						style={{
							width: "100%",
							height: "1px",
							backgroundColor: "black",
							border: "none",
							marginTop: "2rem",
						}}
					/>
					<button
						className=" p-1 mt-6 w-2/6 bg-white text-gray-600 ring-1 ring-gray-800 rounded-lg font-semibold hover:text-white hover:bg-gray-700 duration-300 cursor-pointer "
						onClick={() => setShowModal(false)}
					>
						Close
					</button>
				</div>
			</div>
		</>
	);
};

export default Modal;
