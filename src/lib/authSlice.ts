'use client';

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

// LogIn
export const handleLogin = createAsyncThunk(
  "auth/login",
  async (
    formData: { email: string; password: string },
    thunkAPI
  ) => {
    try {
      const res = await axios.post(
        "https://linked-posts.routemisr.com/users/signin",
        formData
      );
      return res.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Login failed"
      );
    }
  }
);

// Register
export const handleRegister = createAsyncThunk(
  "auth/register",
  async (
    formData: {
      name: string;
      email: string;
      password: string;
      rePassword: string;
      dateOfBirth: string;
      gender: string;
    },
    thunkAPI
  ) => {
    try {
      const res = await axios.post(
        "https://linked-posts.routemisr.com/users/signup",
        formData
      );
      return res.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Registration failed"
      );
    }
  }
);

// ✅ الحالة الابتدائية
const initialState: {
  token: string | null;
  userData: any;
  isError: boolean;
  isLoading: boolean;
  error: string | null;
} = {
  token: typeof window !== 'undefined' ? localStorage.getItem("token") : null,
  userData: null,
  isLoading: false,
  isError: false,
  error: null,
};

// ✅ Slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearData: (state) => {
      state.token = null;
      state.userData = null;
      state.isError = false;
      state.error = null;
      if (typeof window !== 'undefined') {
        localStorage.removeItem("token");
      }
    },
  },
  extraReducers: (builder) => {
    // ===== LOGIN =====
    builder.addCase(handleLogin.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(handleLogin.fulfilled, (state, action) => {
      state.token = action.payload.token;
      if (typeof window !== 'undefined') {

        localStorage.setItem("token", action.payload.token);
        Cookies.set("token", action.payload.token, {
      expires: 1, // 1  Day
      secure: true,
      sameSite: "strict"
    });

      }
      state.isLoading = false;
      state.isError = false;
      state.error = null;
    });
    builder.addCase(handleLogin.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.payload as string;
    });

    // ===== REGISTER =====
    builder.addCase(handleRegister.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(handleRegister.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.error = null;
    });
    builder.addCase(handleRegister.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.payload as string;
    });
  },
});

export const { clearData } = authSlice.actions;
export const authReducer = authSlice.reducer;
