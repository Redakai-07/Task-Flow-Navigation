import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'users',
  initialState: {
    registeredUsers: [],
    isLoggedIn: false,
    currentUser: null,
    generatedOTP: null,
    mobileNumber: null,
    otpVerified: false,
    completedSteps: [] // Track completed steps
  },
  reducers: {
    addUser: (state, action) => {
      // Check if user already exists
      const existingUser = state.registeredUsers.find(
        user => user.username === action.payload.username
      );
      
      if (!existingUser) {
        state.registeredUsers.push(action.payload);
      }
    },
    loginUser: (state, action) => {
      const { username, password } = action.payload;
      const user = state.registeredUsers.find(
        user => user.username === username && user.password === password
      );
      
      if (user) {
        state.isLoggedIn = true;
        state.currentUser = user;
      }
    },
    logoutUser: (state) => {
      state.isLoggedIn = false;
      state.currentUser = null;
    },
    clearUsers: (state) => {
      state.registeredUsers = [];
      state.isLoggedIn = false;
      state.currentUser = null;
      state.generatedOTP = null;
      state.mobileNumber = null;
      state.otpVerified = false;
      state.completedSteps = [];
    },
    generateOTP: (state, action) => {
      const mobileNumber = action.payload;
      // Generate a 6-digit OTP
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      state.generatedOTP = otp;
      state.mobileNumber = mobileNumber;
      state.otpVerified = false;
    },
    verifyOTP: (state, action) => {
      const enteredOTP = action.payload;
      if (state.generatedOTP === enteredOTP) {
        state.otpVerified = true;
      }
    },
    clearOTP: (state) => {
      state.generatedOTP = null;
      state.mobileNumber = null;
      state.otpVerified = false;
    },
    completeStep: (state, action) => {
      const stepIndex = action.payload;
      if (!state.completedSteps.includes(stepIndex)) {
        state.completedSteps.push(stepIndex);
      }
    },
    resetStep: (state, action) => {
      const stepIndex = action.payload;
      state.completedSteps = state.completedSteps.filter(step => step !== stepIndex);
    },
    clearAllSteps: (state) => {
      state.completedSteps = [];
    }
  }
});

export const { addUser, loginUser, logoutUser, clearUsers, generateOTP, verifyOTP, clearOTP, completeStep, resetStep, clearAllSteps } = userSlice.actions;
export default userSlice.reducer;
