import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface CountryState {
  name: string;
}

const initialState: CountryState = {
  name: "myanmar",
}

export const countrySlice = createSlice({
  name: 'country',
  initialState,
  reducers: {
   
    changeCountry: (state, action: PayloadAction<string>) => {
      state.name = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { changeCountry } = countrySlice.actions

export default countrySlice.reducer 