// 'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  Container,
  Typography,
  Avatar,
  Box,
  Paper,
  Button,
  Divider,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPost } from '@/lib/postSlice';
import { stateType, dispatchType } from '@/lib/store';
import Post from '@/app/_components/Post/Post';

export default function ProfilePage() {
  const searchParams = useSearchParams();
  const dispatch = useDispatch<dispatchType>();

  const name = searchParams.get('name') || 'No Name';
  const photo = searchParams.get('photo') || '/default.png';
  const userId = searchParams.get('id') || '';

  const allPosts = useSelector((state: stateType) => state.post.AllPost) || [];

  // get posts
  useEffect(() => {
    if (allPosts.length === 0) {
      dispatch(getAllPost());
    }
  }, [dispatch, allPosts]);

  const userPosts = Array.isArray(allPosts)
    ? allPosts.filter((post) => post?.user?._id === userId)
    : [];

  return (
    <Container maxWidth="md" sx={{ mt: 6 }}>
      <Paper elevation={4} sx={{ p: 4, borderRadius: 4 }}>
        {/* User photo and name */}
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
          <Avatar
            src={photo}
            alt={name}
            sx={{ width: 120, height: 120, boxShadow: 4 }}
          />
          <Typography variant="h5" fontWeight="bold">
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Welcome to the profile page
          </Typography>
        </Box>

        {/* Buttons */}
        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center', gap: 2 }}>
          <Button
            variant="contained"
            startIcon={<FavoriteIcon />}
            sx={{ backgroundColor: '#f00155', '&:hover': { backgroundColor: '#c90045' } }}
          >
            Follow
          </Button>

          <Button variant="outlined" color="secondary" startIcon={<ChatBubbleOutlineIcon />}>
            Message
          </Button>
        </Box>

        {/* Divider */}
        <Divider sx={{ my: 4 }} />

        {/* User posts */}
        {userPosts.length > 0 ? (
          userPosts.map((post) => <Post key={post._id} postdata={post} />)
        ) : (
          <Typography color="text.secondary" textAlign="center">
            This user has not posted anything yet.
          </Typography>
        )}
      </Paper>
    </Container>
  );
}
