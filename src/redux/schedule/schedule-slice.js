import { createSlice } from '@reduxjs/toolkit';
import { fetchSchedule, addScheduleItem, deleteScheduleItem, deleteMultipleScheduleItems } from './schedule-operations';

const initialState = {
  schedule: [],
  isLoading: false,
};

const scheduleSlice = createSlice({
  name: 'schedule',
  initialState, 
  extraReducers: {
    [fetchSchedule.fulfilled]: (store, {payload}) => {
      if(payload.length > 0) {
        store.schedule = [...payload]
      }
    },
    [addScheduleItem.fulfilled]: (store, {payload}) => {
     store.schedule.push(payload)
    },
    [deleteScheduleItem.fulfilled]: (store, {payload}) => {
      store.schedule = store.schedule.filter(el=> el._id !== payload._id)
    },
    [deleteMultipleScheduleItems.fulfilled]: (store, {payload}) => {
      store.schedule = store.schedule.filter(el=> el.name !== payload.name)
    }
  }
});

export default scheduleSlice.reducer;
