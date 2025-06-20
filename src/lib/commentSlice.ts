import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {
  CommentPayload,
  UpdateCommentPayload,
  CommentState,
} from "@/app/interfaces/postData"; 

// ---------- Create Comment ----------
export const createComment = createAsyncThunk(
  "comment/create",
  async ({ postId, content }: CommentPayload, thunkAPI) => {
    try {
      const token =
        typeof window !== "undefined" ? localStorage.getItem("token") : null;

      const response = await axios.post(
        "https://linked-posts.routemisr.com/comments",
        { post: postId, content },
        { headers: { token } }
      );

      return response.data.comment;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to create comment"
      );
    }
  }
);

// ---------- Update Comment ----------
export const updateComment = createAsyncThunk(
  "comment/update",
  async ({ id, content }: UpdateCommentPayload, thunkAPI) => {
    try {
      const token =
        typeof window !== "undefined" ? localStorage.getItem("token") : null;

      const response = await axios.put(
        `https://linked-posts.routemisr.com/comments/${id}`,
        { content },
        { headers: { token } }
      );

      return response.data.comment;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to update comment"
      );
    }
  }
);

// ---------- Initial State ----------
const initialState: CommentState = {
  isCreating: false,
};

// ---------- Slice ----------
const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    resetCommentState: (state) => {
      state.isCreating = false;
      state.success = false;
      state.isUpdating = false;
      state.updateSuccess = false;
      state.error = undefined;
    },
  },
  extraReducers: (builder) => {
    // Create Comment
    builder.addCase(createComment.pending, (state) => {
      state.isCreating = true;
      state.success = false;
    });
    builder.addCase(createComment.fulfilled, (state) => {
      state.isCreating = false;
      state.success = true;
    });
    builder.addCase(createComment.rejected, (state, action) => {
      state.isCreating = false;
      state.success = false;
      state.error = action.payload as string;
    });

    // Update Comment
    builder.addCase(updateComment.pending, (state) => {
      state.isUpdating = true;
      state.updateSuccess = false;
    });
    builder.addCase(updateComment.fulfilled, (state) => {
      state.isUpdating = false;
      state.updateSuccess = true;
    });
    builder.addCase(updateComment.rejected, (state, action) => {
      state.isUpdating = false;
      state.updateSuccess = false;
      state.error = action.payload as string;
    });
  },
});

// ---------- Exports ----------
export const { resetCommentState } = commentSlice.actions;
export const commentReducer = commentSlice.reducer;
