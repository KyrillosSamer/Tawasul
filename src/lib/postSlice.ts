import axios from 'axios';
import { postData } from "@/app/interfaces/postData";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface PostState {
  AllPost: postData[] | null;
  singlePost: postData | null;
  isLoading: boolean;
  error?: string;
}

// ---
export const getAllPost = createAsyncThunk("post/allPost", async (limit?: number, thunkAPI) => {
  try {
    const token = typeof window !== 'undefined' ? localStorage.getItem("token") : null;
    const response = await axios.get(`https://linked-posts.routemisr.com/posts?limit=${limit ?? 50}`, {
      headers: { token }
    });
    return response.data.posts;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to fetch posts");
  }
});

export const getSinglePost = createAsyncThunk("post/singlePost", async (id?: string, thunkAPI) => {
  try {
    const token = typeof window !== 'undefined' ? localStorage.getItem("token") : null;
    const response = await axios.get(`https://linked-posts.routemisr.com/posts/${id}`, {
      headers: { token }
    });
    return response.data.post;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to fetch post");
  }
});

const initialState: PostState = {
  AllPost: null,
  singlePost: null,
  isLoading: false,
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // ====== Get All Posts ======
    builder.addCase(getAllPost.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllPost.fulfilled, (state, action) => {
      state.isLoading = false;
      state.AllPost = action.payload;
    });
    builder.addCase(getAllPost.rejected, (state, action) => {
      state.isLoading = false;
      state.AllPost = null;
      state.error = action.payload as string;
    });

    // ====== Get Single Post ======
    builder.addCase(getSinglePost.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getSinglePost.fulfilled, (state, action) => {
      state.isLoading = false;
      state.singlePost = action.payload;
    });
    builder.addCase(getSinglePost.rejected, (state, action) => {
      state.isLoading = false;
      state.singlePost = null;
      state.error = action.payload as string;
    });
  },
});

export const postReducer = postSlice.reducer;
