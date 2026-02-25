import {createSlice} from "@reduxjs/toolkit";

const conversation = createSlice ({
    name : "conversation",
    initialState : null ,
    reducers :{
        addconversation : (state , action ) => {
            return action.payload;
        },
        removeconversation: () => {
            return null  
        }
    }
})

export const { addconversation,removeconversation} = conversation.actions;
export default conversation.reducer;