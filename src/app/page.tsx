'use client';

import Grid from '@mui/material/Grid';
import { Paper, Box } from "@mui/material";
import Post from "./_components/Post/Post";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { dispatchType, stateType } from '@/lib/store';
import { getAllPost } from '@/lib/postSlice';
import { postData } from './interfaces/postData';
import Loading from './Loading';
import CreatePost from './_components/CreatePost/CreatePost';

export default function Home() {
  const { AllPost, isLoading } = useSelector((state: stateType) => state.post);
  const dispatch = useDispatch<dispatchType>();

  // 👇 نضيف ستايت محلي لانتظار التهيئة الأولى
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    dispatch(getAllPost()).then(() => {
      setInitialLoad(false); // 🟢 بعد ما تخلص اللودينج أول مرة
    });
  }, [dispatch]);

  // ❌ إياك تعرض أي شيء قبل انتهاء اللودينج الأول
  if (initialLoad || isLoading) {
    return <Loading />;
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: '#f5f5f5',
        p: 3,
      }}
    >
      <Grid container spacing={2} maxWidth="lg">
        <Grid item xs={12} md={3}></Grid>

        <Grid item xs={12} md={6}>
          <CreatePost onPostCreated={() => dispatch(getAllPost())} />

          <Paper sx={{ mt: 2, boxShadow: 'none', background: 'none' }}>
            {AllPost?.map((postObj: postData) => (
              <Post postdata={postObj} key={postObj._id} />
            ))}
          </Paper>
        </Grid>

        <Grid item xs={12} md={3}></Grid>
      </Grid>
    </Box>
  );
}
