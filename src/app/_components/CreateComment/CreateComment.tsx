'use client';
import { IconButton, InputAdornment, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createComment, resetCommentState } from "@/lib/commentSlice";
import { dispatchType, stateType } from "@/lib/store";

interface Props {
  postId: string;
}

const CreateComment = ({ postId }: Props) => {
  const [content, setContent] = useState("");
  const dispatch = useDispatch<dispatchType>();
  const { isCreating, error, success } = useSelector((state: stateType) => state.comment);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    dispatch(createComment({ postId, content }));
    setContent("");
  };

  // Optional: clear success message after a few seconds
  useEffect(() => {
    if (success) {
      const timeout = setTimeout(() => {
        dispatch(resetCommentState());
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [success, dispatch]);

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        fullWidth
        label="Add a comment"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        disabled={isCreating}
        margin="normal"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton type="submit" disabled={isCreating || !content.trim()}>
                <SendIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      {success && <p style={{ color: "green", marginTop: 4 }}>Comment added successfully!</p>}
      {error && <p style={{ color: "red", marginTop: 4 }}>{error}</p>}
    </form>
  );
};

export default CreateComment;
