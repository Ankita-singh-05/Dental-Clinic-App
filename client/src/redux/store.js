import { configureStore } from "@reduxjs/toolkit";
import { alertSlice } from "./features/alertSlice";
import {userSlice} from './features/userSlice';
import adminReducer from './features/adminSlice';


export default configureStore({
    reducer: {
        alerts: alertSlice.reducer,
        users: userSlice.reducer,
        admin: adminReducer
    },
});