const { createSlice } = require("@reduxjs/toolkit");

const eventSlice = createSlice({
	initialState: 0,
	name: "eventsLength",
	reducers: {
		increament: (state) => state + 1,
		decreament: (state) => state - 1,
	},
});

export const { incremented, decremented } = eventSlice.actions;
export default eventSlice.reducer;

