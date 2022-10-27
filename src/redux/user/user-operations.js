import { createAsyncThunk } from '@reduxjs/toolkit';
import { requestAPI } from '../../services/requestAPI';


export const registerUser = createAsyncThunk(
  'users/signUp',
  async (data, { rejectWithValue }) => {
    try {
      const user = await requestAPI.signUpUser(data);
      return user;
      
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const logOutUser = createAsyncThunk(
  'user/signOut',
  async(token, {rejectWithValue}) => {
    try {
      const result = await requestAPI.signOutUser(token)
      return result
    } catch (error) {
      return rejectWithValue(error)
    } 
  }
)

export const getCurrentUser = createAsyncThunk(
  'users/current',
  async(token, {rejectWithValue}) => {
    try {
      const user = await requestAPI.fetchCurrentUser(token)
      return user
     
    } catch (error) {
      console.log(error)
      return rejectWithValue(error)
    }
  }
)

export const logInUser = createAsyncThunk(
  "users/signIn",
  async(body, {rejectWithValue}) => {
    try {
      const user = await requestAPI.sigInUser(body)
      return user
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)
