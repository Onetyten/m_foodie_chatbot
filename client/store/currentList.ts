import {createSlice} from '@reduxjs/toolkit'
import type {FoodType} from '../types/type'

const initialState:{list:FoodType[]} = {
    list:[]
}

const currentListSlice = createSlice({
    name:'foodlist',
    initialState,
    reducers:{
        setList:(state,action)=>{
            state.list = action.payload
        },
        clearList:(state)=>{
            state.list = []
        }
    }
})
 
export const {setList,clearList} = currentListSlice.actions
export default currentListSlice.reducer