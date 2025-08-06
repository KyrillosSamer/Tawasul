'use client';

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSinglePost } from '@/lib/postSlice';
import { dispatchType, stateType } from '@/lib/store';
import Post from '@/app/_components/Post/Post';
import Loading from '@/app/Loading';
import Container from '@mui/material/Container';

interface PostPageProps {
  params: { id: string };
}

export default function PostPage({ params }: PostPageProps) {
  const dispatch = useDispatch<dispatchType>();
  const { singlePost, isLoading } = useSelector((state: stateType) => state.post);

  useEffect(() => {
    if (params?.id) {
      dispatch(getSinglePost(params.id));
    }
  }, [params?.id, dispatch]);

  if (isLoading) {
    return <Loading />;
  }

  if (!singlePost) {
    return (
      <p style={{ textAlign: 'center', padding: '2rem' }}>
        Post not found
      </p>
    );
  }

  return (
    <Container maxWidth="lg">
      <Post postdata={singlePost} allComments />
    </Container>
  );
}
