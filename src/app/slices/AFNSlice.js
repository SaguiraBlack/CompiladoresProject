import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: {},
}

export const AFNSlice = createSlice({
  name: 'AFNlist',
  initialState,
  reducers: {
    addAFN: (state, action) => {
		if(state.value[action.payload.name]==null){
			state.value[action.payload.name]= action.payload.afn;
		}else{
			state.value[action.payload.name+'_copy']= action.payload.afn;
		}
    },
    deleteAFN: (state, action) => {
		delete state.value[action.payload];
    }
  },
})

// Action creators are generated for each case reducer function
export const { addAFN, deleteAFN} = AFNSlice.actions

export default AFNSlice.reducer