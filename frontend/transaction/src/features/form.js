import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import sendTransaction from "../services/sendTransaction";
import getTransaction from "../services/getTransaction";

/**
 * Обещание при создании новой транзакции
 * **/
export const fetchForm = createAsyncThunk(
    'form/fetchForm',
    async (data) => {
        return await sendTransaction(data)
            .then(response => {
                if (response.status) {
                    return Promise.resolve();
                }
            })
            .catch(e => {
                return Promise.reject(e);
            });
    }
)

/**
 * Обещание при редактировании транзакции
 * **/
export const fetchEdit = createAsyncThunk(
    'form/fetchEdit',
    async (id) => {
        return await getTransaction(id)
            .then(response => {
                if (response.status) {
                    return Promise.resolve(response.response);
                }
            })
            .catch(e => {
                return Promise.reject(e);
            });
    }
)

export const formSlice = createSlice({
    name: 'form',
    initialState: {
        form: {
            id: 0,
            name: "",
            price: "",
            description:""
        },
        isLoading: false,
        isError: false,
        isUpdated: false,
        isReadonly: false,
    },
    reducers: {
        id: (state, action) => {
            state.form.id = action.payload;
        },
        name: (state, action) => {
            state.form.name = action.payload;
        },
        price: (state, action) => {
            state.form.price = action.payload;
        },
        description: (state, action) => {
            state.form.description = action.payload;
        },
        clear: (state) => {
            state.form.name = "";
            state.form.price = "";
            state.form.description = "";
        },
        isLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        isUpdated: (state, action) => {
            state.isUpdated = action.payload;
        },
        isError: (state, action) => {
            state.isError = action.payload;
        },
        isReadonly: (state, action) => {
            state.isReadonly = action.payload;
        },
    },
    extraReducers: (builder) => {
        /**
         * Сценарции отправки формы
         * **/
        builder.addCase(fetchForm.fulfilled, state => {
            state.isLoading = false;
            state.isError = false;
            state.isReadonly = false;
            state.form.id = 0;
            state.form.name = "";
            state.form.price = "";
            state.form.description = "";
            state.isUpdated = !state.isUpdated;
        });
        builder.addCase(fetchForm.pending, state => {
            state.isLoading = true;
            state.isReadonly = true;
        });
        builder.addCase(fetchForm.rejected, state => {
            state.isLoading = false;
            state.isReadonly = false;
            state.form.id = 0;
            state.form.name = "";
            state.form.price = "";
            state.form.description = "";
            state.isUpdated = !state.isUpdated;
        });

        /**
         * Сценарции редактирования
         * **/
        builder.addCase(fetchEdit.fulfilled, (state, action) => {
            state.form.id = action.payload.id;
            state.form.name = action.payload.name;
            state.form.price = action.payload.price;
            state.form.description = action.payload.content;
        });
    }
})

export const { name, price, description } = formSlice.actions;
export default formSlice.reducer;