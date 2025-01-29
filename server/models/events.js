import mongoose, { Types } from "mongoose";
const { Schema, model, models } = mongoose;

const createEventsSchema = new Schema({
	title: {
		type: String,
	},
	creationDate: {
		type: String,
	},
	id: {
		type: String,
	},
	completion: {
		type: Boolean,
	},
	email: {
		type: Types.ObjectId,
		ref: "User",
	},
});
export const Events = models.Event || model("Event", createEventsSchema);
