import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = [
  {
    title: "",
    description: "",
    day: null,
    id: "",
  },
];

export const saveCalEventsSlice = createSlice({
  name: "saveCalEvents",
  initialState: { value: initialStateValue },
  reducers: {
    push: (state, action) => {
      state.value.push(action.payload);
    },
    update: (state, action) => {
      state.value = state.value.map((e) =>
        e.id === action.payload.id ? action.payload : e
      );
    },
    del: (state, action) => {
      state.value = state.value.filter((e) => e.id !== action.payload.id);
    },
  },
});

export default saveCalEventsSlice.reducer;
export const { push, update, del } = saveCalEventsSlice.actions;
