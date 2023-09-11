import { createSlice } from "@reduxjs/toolkit";

const expenseSlice = createSlice({
  name: "expense",
  initialState: {
    reload: false,
    isAdding: false,
    selectedYear: "2023",
    expensesList: [],
  },
  reducers: {
    reload(state) {
      state.reload = !state.reload;
    },
    isAdding(state) {
      state.isAdding = !state.isAdding;
    },
    setYear(state, action) {
      state.selectedYear = action.payload;
    },
    showExpenses(state, action) {
      state.expensesList = action.payload.list.filter((expense) => {
        return expense.date.getFullYear().toString() === state.selectedYear;
      });
    },
  },
});

export const expenseActions = expenseSlice.actions;

export default expenseSlice;
