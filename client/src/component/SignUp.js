import React, { useEffect, useRef, useState } from "react";
import Uppy from "@uppy/core";
import { Dashboard, DashboardModal } from "@uppy/react";
import ImageEditor from "@uppy/image-editor";
import Webcam from "@uppy/webcam";
import ScreenCapture from "@uppy/screen-capture";
import user from "../Imgaes/user.png";
import "@uppy/core/dist/style.min.css";
import "@uppy/dashboard/dist/style.min.css";
import "@uppy/image-editor/dist/style.min.css";
import "@uppy/screen-capture/dist/style.min.css";
import "@uppy/webcam/dist/style.min.css";

const SignUp = ({ setShowSignUp }) => {
	const [uppy, setUppy] = useState(null);
	const [isOpen, setIsOpen] = useState(false);
	const updatedProfilePicture = useRef(null);
	// useEffect(() => {
	// 	const uppyInstance = new Uppy({
	// 		restrictions: {
	// 			maxNumberOfFiles: 1,
	// 			allowedFileTypes: [".jpg", ".jpeg", ".png"],
	// 			maxFileSize: 3 * 1024 * 1024,
	// 		},
	// 	});
	// 	uppyInstance.use(Dashboard, {
	// 		id: "Dashboard",
	// 		target: "#uppy-modal",
	// 	});

	// 	uppyInstance.use(Webcam, {
	// 		id: "Webcam",
	// 		target: Dashboard,
	// 	});

	// 	uppyInstance.use(ScreenCapture, {
	// 		id: "ScreenCapture",
	// 		target: Dashboard,
	// 	});

	// 	uppyInstance.use(ImageEditor, {
	// 		id: "ImageEditor ",
	// 		target: Dashboard,
	// 		quality: 0.8,
	// 		cropperOptions: {
	// 			aspectRatio: 1,
	// 		},
	// 	});
	// 	setUppy(uppyInstance);
	// }, []);
	useEffect(() => {
		const uppyInstance = new Uppy({
			restrictions: {
				maxNumberOfFiles: 1,
				allowedFileTypes: [".jpg", ".jpeg", ".png"],
				maxFileSize: 3 * 1024 * 1024,
			},
			autoOpenFileEditor: true,
		});

		uppyInstance.use(Webcam);
		uppyInstance.use(ScreenCapture);
		uppyInstance.use(ImageEditor, {
			quality: 0.8,
			cropperOptions: {
				aspectRatio: 1,
			},
			actions: {
				revert: true,
				rotate: true,
				granularRotate: true,
				flip: true,
				zoomIn: true,
				zoomOut: true,
				cropSquare: true,
				cropWidescreen: false,
				cropWidescreenVertical: false,
			},
		});
		uppyInstance.on("file-editor:complete", (updatedFile) => {
			console.log("below is the updaded file");
			console.log(updatedFile);
			updatedProfilePicture.current = URL.createObjectURL(updatedFile.data);
			setIsOpen(false);
		});
		setUppy(uppyInstance);

		// return () => uppyInstance.close();
	}, []);
	console.log(updatedProfilePicture);

	return (
		<div className="background h-screen flex items-center justify-center">
			<div className=" w-4/12 h-4/6 bg-white z-10 rounded-lg flex items-center flex-col">
				{uppy && (
					<DashboardModal
						uppy={uppy}
						open={isOpen}
						onRequestClose={() => setIsOpen(false)}
						plugins={["Webcam", "ScreenCapture", "ImageEditor"]}
						hideUploadButton={true}
						autoOpen={"imageEditor"}
						className="mt-5"
					/>
				)}
				<img
					src={
						updatedProfilePicture.current !== null
							? updatedProfilePicture.current
							: user
					}
					alt="User"
					className=" h-2/6 rounded-full bg-gray-300 cursor-pointer hover:bg-gray-500 duration-300"
					onClick={() => setIsOpen(true)}
				/>
				<input
					type="email"
					placeholder="Enter your email "
					className="mt-6 w-4/6 ring-1 ring-gray-400 p-2 rounded"
				/>
				<input
					type="password"
					placeholder="Enter your password "
					className="mt-6 w-4/6 ring-1 ring-gray-400 p-2 rounded"
				/>
				<button className="w-4/6 rounded-lg bg-blue-500 text-white mt-6 p-3 hover:bg-blue-700 duration-300">
					Create User
				</button>
				<span className="mt-2">OR</span>
				<p
					className="text-lg text-blue-600 hover:text-xl duration-300 cursor-pointer mt-3"
					onClick={() => setShowSignUp(false)}
				>
					Login
				</p>
			</div>
		</div>
	);
};

export default SignUp;
