import { configureStore } from "@reduxjs/toolkit";
import {authSlice} from "./Reducers/authSlice"
import {activateSlice} from "./Reducers/activateSlice"

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    activate: activateSlice.reducer,
  }
  // reducer: { auth: authReducer, activate: activateReducer },
});

export default store;
