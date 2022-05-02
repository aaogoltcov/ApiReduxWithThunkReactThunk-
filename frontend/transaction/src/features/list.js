import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import getTransactions from "../services/getTransactions";
import deleteTransaction from "../services/deleteTransaction";

/**
 * Обещание при запросе списка транзакций
 * **/
export const fetchList = createAsyncThunk(
    'list/fetchList',
    async () => {
       return await getTransactions()
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

/**
 * Обещние при удалении транзакции
 * **/
export const deleteItem = createAsyncThunk(
    'list/deleteItem',
    async (id) => {
        return await deleteTransaction(id)
            .then(response => {
                if (response.status) {
                    return Promise.resolve();
                }
            })
            .catch(e => {
                return Promise.reject(e);
            })
    }
)

export const listSlice = createSlice({
    name: 'list',
    initialState: {
        list: [{
            id: "",
            name: "",
            price: "",
            description:"",
            isLoading: false,
            isError: false,
        }],
        isLoading: true,
        isError: false,
        toUpdate: false,
        toFreeze: false,
    },
    reducers: {
        list: (state, action) => {
            state.list = action.payload;
        },
        isLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        isError: (state, action) => {
            state.isError = action.payload;
        },
        toUpdate: (state, action) => {
            state.toUpdate = action.payload;
        },
        toFreeze: (state, action) => {
            state.toFreeze = action.payload;
        },
    },
    extraReducers: (builder) => {
        /**
         * Сценарции получения списка транзакций
         * **/
        builder.addCase(fetchList.fulfilled, (state, action) => {
            state.list = action.payload;
            state.isLoading = false;
            state.isError = false;
            state.toFreeze = false;
        });
        builder.addCase(fetchList.pending, state => {
            state.isLoading = true;
            state.toFreeze = true;
        });
        builder.addCase(fetchList.rejected, state => {
            state.isLoading = true;
            state.isError = true;
            state.toFreeze = true;
            state.toUpdate = !state.toUpdate;
        });

        /**
         * Сценарции удаления транзакции
         * **/
        builder.addCase(deleteItem.fulfilled, state => {
            state.isLoading = false;
            state.toFreeze = false;
            state.toUpdate = !state.toUpdate;
        });
        builder.addCase(deleteItem.pending, state => {
            state.toFreeze = true;
        });
        builder.addCase(deleteItem.rejected, state => {
            state.toUpdate = !state.toUpdate;
        });
    }
})

export const { list } = listSlice.actions;
export default listSlice.reducer;