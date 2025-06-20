'use client';
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { updateComment } from "@/lib/commentSlice";
import { Comment } from "@/app/interfaces/postData";
import { dispatchType  } from "@/lib/store";

interface EditCommentDialogProps {
  open: boolean;
  onClose: () => void;
  comment: Comment | null;
}

export default function EditCommentDialog({
  open,
  onClose,
  comment,
}: EditCommentDialogProps) {
  const dispatch = useDispatch<dispatchType >();
  const [content, setContent] = useState("");

  useEffect(() => {
    if (comment) {
      setContent(comment.content);
    }
  }, [comment]);

  const handleUpdate = () => {
    if (comment && content.trim()) {
      dispatch(updateComment({ commentId: comment._id, content }))
        .unwrap()
        .then(() => {
          onClose(); // Close dialog on success
        });
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Edit Comment</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Comment"
          type="text"
          fullWidth
          multiline
          rows={3}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleUpdate} variant="contained">Update</Button>
      </DialogActions>
    </Dialog>
  );
}
