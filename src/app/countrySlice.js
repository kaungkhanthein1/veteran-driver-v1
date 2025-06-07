import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  name: "myanmar",
}

export const countrySlice = createSlice({
  name: 'country',
  initialState,
  reducers: {
   
    changeCountry: (state, action) => {
      state.name = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { changeCountry } = countrySlice.actions

export default countrySlice.reducer