import { createAsyncThunk } from "@reduxjs/toolkit";
import { requestAPI } from "../../services/requestAPI";

export const fetchSchedule = createAsyncThunk(
    'schedule/fetch',
    async (period, {getState, rejectWithValue}) => {
        try {
            const {user} = getState()
            const schedule = await requestAPI.fetchSchedule(period, user.token)
            return schedule
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)


export const addScheduleItem = createAsyncThunk(
    'schedule/add',
    async (item, {getState, rejectWithValue}) => {
        try {
            const {user} = getState()
            const addedItem = await requestAPI.addScheduleItem(item, user.token)
            return addedItem
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

export const deleteScheduleItem = createAsyncThunk(
    'schedules/delete',
    async (id, {getState, rejectWithValue}) => {
        try {
        const {user} = getState()
           const deletedOne = await requestAPI.deleteScheduleItem(id, user.token) 
           return deletedOne
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

export const deleteMultipleScheduleItems = createAsyncThunk(
    'schedules/delete/multiple',
    async (name, {getState, rejectWithValue}) => {
        try {
            const {user} = getState()
            const deletedOne = await requestAPI.deleteMultipleScheduleItems(name, user.token)
            return deletedOne
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)