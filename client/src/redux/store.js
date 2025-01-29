import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./slices/events";
import { eventList } from "./slices/eventList";

export const store = configureStore({
	reducer: {
		userReducer: userReducer,
		eventLists: eventList,
	},
});
