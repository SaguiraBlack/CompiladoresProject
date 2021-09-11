import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './slices/counterSlice';
import AFNReducer from './slices/AFNSlice';

export const store = configureStore({  
	reducer: {
		counter: counterReducer,
		AFNlist: AFNReducer
	},
})