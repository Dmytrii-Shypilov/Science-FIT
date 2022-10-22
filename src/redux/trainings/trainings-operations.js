import { createAsyncThunk } from '@reduxjs/toolkit';
import { requestAPI } from '../../components/services/requestAPI';

export const fetchTrainings = createAsyncThunk(
  'trainings/fetch',
  async (token, { rejectWithValue }) => {
    try {
      const trainings = await requestAPI.fetchTrainings(token);
      return trainings;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const addTraining = createAsyncThunk(
  'trainings/add',
  async (training, {getState, rejectWithValue }) => {
    try {
      const {user} = getState()
      const addedTraining = await requestAPI.addTraining(training, user.token)
      return addedTraining;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteTraining = createAsyncThunk(
  'trainings/delete',
  async (id, {getState, rejectWithValue }) => {
    try {
      const {user} = getState()
      const deletedOne = await requestAPI.deleteTraining(id, user.token); 
      return deletedOne;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
