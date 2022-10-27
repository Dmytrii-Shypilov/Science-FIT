import { createSlice } from '@reduxjs/toolkit';
import {
  registerUser,
  logOutUser,
  getCurrentUser,
  logInUser,
} from './user-operations';

const initialState = {
  email: null,
  token: null,
  isLoading: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  extraReducers: {
    [registerUser.pending]: (store, { payload }) => {
      store.isLoading = true
    },
    [registerUser.fulfilled]: (store, { payload }) => {
      store.email = payload.email;
      store.token = payload.token;
      store.isLoading = false
    },
    [logOutUser.fulfilled]: (store, { payload }) => {
      store.email = null;
      store.token = null;
    },
    [getCurrentUser.fulfilled]: (store, { payload }) => {
      store.email = payload.email;
      store.token = payload.token;
    },
    [logInUser.pending]: (store, { payload }) => {
      store.isLoading = true
  },
    [logInUser.fulfilled]: (store, { payload }) => {
        store.email = payload.email;
        store.token = payload.token;
        store.isLoading = false
    },
  },
});

export default userSlice.reducer;
