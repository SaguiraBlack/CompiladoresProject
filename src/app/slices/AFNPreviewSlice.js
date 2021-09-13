import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  index: -1,
  show: false
}

export const AFNPreviewSlice = createSlice({
  name: 'AFNPreview',
  initialState,
  reducers: {
    changeIndex: (state, action) => {
      state.index = action.payload;
    },
    resetIndex: () => {
      return {index:-1}
    },
    showPreview: ()=>({show: true}),
    hidePreview: ()=>({show: false})
  },
})

// Action creators are generated for each case reducer function
export const { changeIndex, resetIndex, showPreview, hidePreview} = AFNPreviewSlice.actions

export default AFNPreviewSlice.reducer