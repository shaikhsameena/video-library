import {createSlice}  from "@reduxjs/toolkit";
const initialState ={
  videos:[], 
  videoscount:0
}

const videoSlice=createSlice({
   name:'videos',
    initialState,
   reducers:{
    addToSaveList:(state:any,action)=>{
       state.videos.push(action.payload);
       state.videoscount=state.videos.length; 
    }
   } 
});
export const{addToSaveList}=videoSlice.actions;
export default videoSlice.reducer;