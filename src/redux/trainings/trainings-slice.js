import { createSlice } from '@reduxjs/toolkit'
import { fetchTrainings, addTraining, deleteTraining } from './trainings-operations';

const initialState = {
    trainings: []
};

const trainingsSlice = createSlice({
  name: 'trainings',
  initialState,

  extraReducers: {
    [fetchTrainings.fulfilled]: (store, {payload}) => {
      store.trainings = [...payload]
    },
    [addTraining.fulfilled]: (store, {payload}) => {
      store.trainings.push(payload)
    },
    [deleteTraining.fulfilled]: (store, {payload}) => {
      const filteredList = store.trainings.filter(el=> el._id !== payload._id)
      store.trainings = [...filteredList]
    }
  },
});

export default trainingsSlice.reducer;
