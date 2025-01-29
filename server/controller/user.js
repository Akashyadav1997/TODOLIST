import bcrypt from "bcrypt";
import fs from "fs";

import { cloudinaryUpload } from "../utils/cloudinary.js";
import { User } from "../Models/user.js";
import { Events } from "../models/events.js";

export const createUser = async (req, res, next) => {
	try {
		console.log("below is the create user data");
		const { username, password, email } = req.body;
		console.log(username, password, email);
		const isExist = await User.find({ email: email });
		console.log("below is is eXist");

		console.log(isExist);

		if (isExist.length !== 0) {
			return res.status(400).json({
				message:
					"A user with that email has already registered. Please use a different email.",
				success: false,
			});
		}
		// const file = req.file;
		// console.log(file);
		const hashedPassword = await bcrypt.hash(password, 8);
		console.log(hashedPassword);
		// const cloudinaryResult = await cloudinaryUpload(file);
		// console.log("below is cloudinary result");
		// console.log(cloudinaryResult);

		// const avatar = {
		// 	public_id: cloudinaryResult[0].public_id,
		// 	url: cloudinaryResult[0].url,
		// };
		const user = await User.create({
			username: username,
			password: hashedPassword,
			email: email,
			// avatar,
		});
		console.log("belwo is created user");
		console.log(user);
		if (!user)
			res
				.status(400)
				.json({ success: false, message: "could not create user" });
		res
			.status(200)
			.json({ success: true, message: "user created", user: user });
	} catch (error) {
		return res
			.status(200)
			.json({ message: "error while signing up", success: false });
	}
};

export const loginUser = async (req, res, next) => {
	try {
		const { email, password } = req.body;
		console.log(email, password);

		const user = await User.findOne({ email: email });
		if (!user) {
			return res
				.status(400)
				.json({ message: "User not found", success: false });
		}

		console.log("User found by email");

		const passwordMatched = await bcrypt.compare(password, user.password);
		console.log("Password match:", passwordMatched);

		if (!passwordMatched) {
			return res
				.status(400)
				.json({ message: "Incorrect password", success: false });
		}
		const events = await Events.find({ email: user._id });
		console.log(user);
		return res.status(200).json({
			message: "Login Successful",
			success: true,
			user: { email: user.email, id: user._id, name: user.username },
			events: events,
		});
	} catch (error) {
		console.error("Login error:", error);
		return res
			.status(500)
			.json({ message: "Internal server error", success: false });
	}
};

export const createEvent = async (req, res, next) => {
	try {
		const { title, creationDate, id, completion, email } = req.body;
		console.log("below are the events");

		console.log(req.body);

		// Find the user by email to get the ObjectId
		const user = await User.findOne({ email });
		if (!user) {
			return res
				.status(400)
				.json({ message: "User not found", success: false });
		}

		const newEvent = new Events({
			title,
			creationDate,
			id: id.toString(), // Convert to string as per the schema
			completion,
			email: user._id, // Use the user's ObjectId
		});

		await newEvent.save();

		return res.status(201).json({
			message: "Event created successfully",
			success: true,
			event: newEvent,
		});
	} catch (error) {
		console.error("Error creating event:", error);
		return res
			.status(500)
			.json({ message: "Internal server error", success: false });
	}
};

export const editEventHandler = async (req, res, next) => {
	try {
		const { _id, title } = req.body;
		console.log(req.body);

		// Find the event by _id and update it
		const updatedEvent = await Events.findByIdAndUpdate(
			_id,
			{ title: title },
			{ new: true, runValidators: true }
		);

		if (!updatedEvent) {
			return res
				.status(404)
				.json({ success: false, message: "Event not found" });
		}

		res.status(200).json({
			success: true,
			message: "Event updated successfully",
			event: updatedEvent,
		});
	} catch (error) {
		console.error("Error updating event:", error);
		res.status(500).json({ success: false, message: "Internal server error" });
	}
};
export const updateCompletion = async (req, res, next) => {
	try {
		const { events } = req.body;
		console.log(events);

		if (!Array.isArray(events) || events.length === 0) {
			return res.status(400).json({
				success: false,
				message: "Invalid input: events must be a non-empty array",
			});
		}
		// Use Promise.all to update each event asynchronously
		const updateResults = await Promise.all(
			events.map((event) =>
				Events.findByIdAndUpdate(
					event._id,
					{ completion: true }, // Force set completion to true
					{ new: true }
				)
			)
		);

		res.status(200).json({
			success: true,
			message: `Updated ${updateResults.length} events`,
			results: updateResults,
		});
	} catch (error) {
		next(error);
	}
};
export const deleteEvent = async (req, res, next) => {
	try {
		const { _id } = req.body;
		if (!_id) {
			return res
				.status(400)
				.json({ message: "Event ID is required", success: false });
		}
		const result = await Events.deleteOne({ _id });
		if (result.deletedCount === 0) {
			return res
				.status(404)
				.json({ message: "Event not found", success: false });
		}
		return res
			.status(200)
			.json({ message: "Event deleted successfully", success: true });
	} catch (error) {
		console.error("Error deleting event:", error);
		return res
			.status(500)
			.json({ message: "Internal server error", success: false });
	}
};
export const deleteAll = async (req, res, next) => {
	try {
		const { _id } = req.body;

		if (!_id) {
			return res
				.status(400)
				.json({ success: false, message: "userID is required" });
		}
		const result = await Events.deleteMany({ email: _id });

		res.status(200).json({
			success: true,
			message: `${result.deletedCount} events deleted successfully`,
		});
	} catch (error) {
		console.error("Error deleting events:", error);
		next(error);
	}
};
