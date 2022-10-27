import {  createAsyncThunk } from "@reduxjs/toolkit";
import { requestAPI } from "../../services/requestAPI";

export const fetchExercises = createAsyncThunk(
    "exercises/fetch",
    async (data, {rejectWithValue}) => {
        try {
            const exercises = await requestAPI.fetchExercises()
            return exercises
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)


