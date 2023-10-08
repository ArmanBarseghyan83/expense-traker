import { configureStore } from "@reduxjs/toolkit";
import expenseSlice from "./slice";

const store = configureStore({
  reducer: { expense: expenseSlice.reducer },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
});

export default store;
