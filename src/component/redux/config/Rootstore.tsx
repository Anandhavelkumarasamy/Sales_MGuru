import { configureStore } from "@reduxjs/toolkit";
import { RootReducer } from "../reducers";

export const Rootstore=configureStore({reducer:RootReducer});