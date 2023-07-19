import { createSlice } from '@reduxjs/toolkit';

// Initial state
const initialState = {
  isAdmin: false,
};

// Slice
const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    setAdminStatus: (state, action) => {
      state.isAdmin = action.payload;
    },
  },
});

// Actions
export const { setAdminStatus } = adminSlice.actions;

// Selectors
export const selectAdminStatus = (state) => state.admin.isAdmin;

// Reducer
export default adminSlice.reducer;
