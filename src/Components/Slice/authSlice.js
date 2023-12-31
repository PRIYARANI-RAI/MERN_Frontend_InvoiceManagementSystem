import {createSlice} from '@reduxjs/toolkit'


export const loginSlice = createSlice ({

    name:'login',
    initialState:{
        isLoggedIn:false,
        data: {}
    },

    reducers:{
        userlogin(state,payload) {
            console.log(payload.payload)
            state.isLoggedIn = true;
            state.data = payload.payload.data;
            console.log(state.isLoggedIn)
           
        },
        
        userlogout(state) {
            state.isLoggedIn = false;
            state.data = {}
        },
    }
})

export const {userlogin,userlogout} = loginSlice.actions;
export default loginSlice.reducer;