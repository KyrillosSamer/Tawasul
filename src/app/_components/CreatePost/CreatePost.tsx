'use client';

import React, { useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Stack, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import SendIcon from '@mui/icons-material/Send';
import axios from 'axios';
import toast from 'react-hot-toast';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export default function CreatePost({ onPostCreated }: { onPostCreated: () => void }) {
  const postBodyInput = useRef(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [postBody, setpostBody] = useState('');
  const [postImg, setpostImg] = useState<File | null>(null);
  const [imgSrc, setimgSrc] = useState('');

  function handlePostBody(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setpostBody(e.target.value);
  }

  function handlePostImg(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setpostImg(file);
      const srcImage = URL.createObjectURL(file);
      setimgSrc(srcImage);
    }
  }

  function createPost() {
    const token = localStorage.getItem('token');

    if (!token) {
      toast.error('You must be logged in to create a post');
      return;
    }

    const formData = new FormData();
    formData.append('body', postBody);
    if (postImg) {
      formData.append('image', postImg);
    }

    axios
      .post('https://linked-posts.routemisr.com/posts', formData, {
        headers: {
          token,
        },
      })
      .then((res) => {
        toast.success('Post created');
        setpostBody('');
        setpostImg(null);
        setimgSrc('');
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
        onPostCreated();
      })
      .catch((error) => {
        toast.error(error.response?.data?.message || 'Error creating post');
        console.error('Create post error:', error.response?.data || error.message);
      });
  }

  return (
    <Paper
      elevation={4}
      sx={{
        width: '100%',
        p: 5,
        my: 3,
        borderRadius: 4,
        boxShadow: 4,
        backgroundColor: '#f9f9f9',
      }}
    >
      <Typography variant="h5" sx={{ mb: 3, color: '#222', fontWeight: 'bold' }}>
        Create a New Post
      </Typography>

      <Stack spacing={3}>
        <TextField
          value={postBody}
          inputRef={postBodyInput}
          onChange={handlePostBody}
          label="What's on your mind?"
          multiline
          rows={4}
          fullWidth
          variant="outlined"
        />

        {imgSrc && (
          <Box sx={{ textAlign: 'center' }}>
            <img
              src={imgSrc}
              alt="Preview"
              style={{
                maxWidth: '100%',
                height: 'auto',
                borderRadius: 8,
                border: '1px solid #ccc',
              }}
            />
          </Box>
        )}

        <Stack spacing={2} direction="row" justifyContent="space-between">
          <Button
            component="label"
            variant="contained"
            fullWidth
            startIcon={<CloudUploadIcon />}
            sx={{
              backgroundColor: '#fe0058',
              borderRadius: 2,
              fontWeight: 'bold',
              '&:hover': { backgroundColor: '#d4004b' },
            }}
          >
            Upload Image
            <VisuallyHiddenInput type="file" onChange={handlePostImg} ref={fileInputRef} />
          </Button>

          <Button
            onClick={createPost}
            variant="contained"
            fullWidth
            endIcon={<SendIcon />}
            sx={{
              backgroundColor: '#fe0058',
              borderRadius: 2,
              fontWeight: 'bold',
              '&:hover': { backgroundColor: '#d4004b' },
            }}
          >
            Submit
          </Button>
        </Stack>
      </Stack>
    </Paper>
  );
}
