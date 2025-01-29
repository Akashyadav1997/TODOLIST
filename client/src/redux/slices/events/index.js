import { createReducer } from "@reduxjs/toolkit";

const initialValue = {};
export const userReducer = createReducer(initialValue, (builer) => {
	builer.addCase("updateUserDetails", (state, action) => {
		return (state = action.payload);
	});
});
