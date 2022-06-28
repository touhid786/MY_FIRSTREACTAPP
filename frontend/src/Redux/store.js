import { configureStore } from "@reduxjs/toolkit";
import { activateReducer } from "./Reducers/ActivateReducer";
import { authReducer } from "./Reducers/AuthReducer";





const store = configureStore({
  reducer:{auth:authReducer,activate:activateReducer}
})

export default store;   