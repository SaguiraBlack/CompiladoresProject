import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: [],
}

export const AFNSlice = createSlice({
  name: 'AFNlist',
  initialState,
  reducers: {
    addAFN: (state, action) => {
      state.value.push({
        name:action.payload.name,
        afn:action.payload.afn
      })
    },
    deleteAFN: (state, action) => {
      const index = state.value.indexOf(action.payload);
      if (index > -1) {
        state.value.splice(index, 1);
      }
    }
  },
})

// Action creators are generated for each case reducer function
export const { addAFN, deleteAFN} = AFNSlice.actions

export default AFNSlice.reducer