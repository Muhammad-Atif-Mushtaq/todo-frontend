import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "./slice/tasksSlice";

export const makeStore = configureStore({
  reducer: {
    tasks: tasksReducer,
  },
});

export type RootState = ReturnType<typeof makeStore.getState>;
export type AppDispatch = typeof makeStore.dispatch;
