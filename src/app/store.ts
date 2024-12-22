import { configureStore } from "@reduxjs/toolkit";
import backlogReducer from "../features/backlogList";

export const store = configureStore({
  reducer: {
    backlog: backlogReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
