import { createSlice } from "@reduxjs/toolkit";
import { fetchExercises } from "./exercises-operations";


const initialState = {
    exercises: [],
}


const exercisesSlice = createSlice({
    name: "exercises",
    initialState,
    extraReducers: {
        [fetchExercises.fulfilled] : (store, {payload}) => {
            store.exercises = [...payload]
        }
    }
})

export default exercisesSlice.reducer