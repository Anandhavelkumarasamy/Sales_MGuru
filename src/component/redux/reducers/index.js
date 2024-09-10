import { combineReducers } from "redux";
import loginReducer from './Logintoken'

export const RootReducer = combineReducers({
    authLogin:loginReducer,
})