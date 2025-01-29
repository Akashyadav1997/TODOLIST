import { createReducer } from "@reduxjs/toolkit";

const initialValue = [];
export const eventList = createReducer(initialValue, (builder) => {
	builder.addCase("updateEventList", (state, action) => {
		return (state = action.payload);
	});
	builder.addCase("editEvent", (state, action) => {
		return state.map((event) =>
			event.id === action.payload.id ? { ...event, ...action.payload } : event
		);
	});
	builder.addCase("addEvent", (state, action) => {
		return [...state, action.payload];
	});
	builder.addCase("removeEvent", (state, action) => {
		return state.filter((event) => action.payload._id !== event._id);
	});
	builder.addCase("completeEvent", (state, action) => {
		const updatedEvents = action.payload; // The updated events array received from the server

		return state.map((event) => {
			const updatedEvent = updatedEvents.find(
				(updated) => updated._id === event._id // Find if this event was updated
			);
			return updatedEvent ? { ...event, ...updatedEvent } : event; // Merge updates if found
		});
	});
	builder.addCase("deleteAll", (state, action) => {
		return (state = []);
	});
});
