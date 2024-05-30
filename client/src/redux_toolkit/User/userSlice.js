import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    currentUser: null,
    loading: false,
    error: false,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signInStart: (state) => {
            state.loading = true;
        },
        signInSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = false;
        },
        signFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        updateUserStart: (state) => {
            state.loading = true;
        },
        updateUserSucces: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = false;
        },
        udpateUserFailiure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        deleteUserAccountStart: (state) => {
            state.loading = true;
        },
        deleteUserAccountSuccess: (state) => {
            state.currentUser = null;
            state.loading = false;
            state.error = false;
        },
        deleteUserAccountFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        signOut: (state) => {
            state.currentUser = null;
            state.loading = false;
            state.error = false;
        },
    },
});

export const {
  signInStart,
  signInSuccess,
  signFailure,
  updateUserStart,
  updateUserSucces,
  udpateUserFailiure,
  deleteUserAccountStart,
  deleteUserAccountSuccess,
  deleteUserAccountFailure,
  signOut,
} = userSlice.actions;


export default  userSlice.reducer;
// this reducers we call name we give which is user
// so we call it userRecucer
// toolkit give us action object for dispatch