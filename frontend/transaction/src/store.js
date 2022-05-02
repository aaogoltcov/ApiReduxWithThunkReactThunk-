import { configureStore } from '@reduxjs/toolkit';
import formReducer from './features/form';
import listReducer from './features/list';

export default configureStore({
    reducer: {
        form: formReducer,
        list: listReducer,
    },
})