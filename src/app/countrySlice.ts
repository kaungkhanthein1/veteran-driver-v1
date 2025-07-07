import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CountryState {
  selectedCountry: any | null;
  selectedLanguage: any | null;
}

const initialState: CountryState = {
  selectedCountry: null,
  selectedLanguage: null,
};

export const countrySlice = createSlice({
  name: "country",
  initialState,
  reducers: {
    setCountry: (state, action: PayloadAction<any>) => {
      state.selectedCountry = action.payload;
    },
    setLanguage: (state, action: PayloadAction<any>) => {
      state.selectedLanguage = action.payload;
    },
    changeCountry: (state, action: PayloadAction<string>) => {
      state.selectedCountry = { name: action.payload };
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCountry, setLanguage, changeCountry } = countrySlice.actions;

export default countrySlice.reducer;
