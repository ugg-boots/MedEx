import { configureStore } from '@reduxjs/toolkit';
import reducers from './slices/index';

const store = configureStore({
	reducer: reducers,
});

export default store;
