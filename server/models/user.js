import mongoose from "mongoose";
const { Schema, model, models } = mongoose;

const userSchema = new Schema({
	username: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	avatar: {
		public_id: {
			type: String,
			// required: true,
		},
		url: {
			type: String,
			// required: true,
		},
	},
});
export const User = models.User || model("User", userSchema);
