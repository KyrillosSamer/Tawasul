'use client';

import * as React from 'react';
import { styled } from '@mui/material/styles';
import {
  Card, CardHeader, CardMedia, CardContent, CardActions,
  Avatar, IconButton, Typography, Box
} from '@mui/material';
import { red } from '@mui/material/colors';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import CommentIcon from '@mui/icons-material/Comment';
import { postData } from '@/app/interfaces/postData';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import img from '@/imgComm/IMG_20230621_163004.jpg';
import CreateComment from '../CreateComment/CreateComment';

interface ExpandMoreProps extends React.ComponentProps<typeof IconButton> {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme }) => ({
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function Post({ postdata, allComments = false }: { postdata: postData, allComments?: boolean }) {
  const router = useRouter();

const handleProfile = (user: { _id: string; name: string; photo: string }) => {
  const query = `?name=${encodeURIComponent(user.name)}&photo=${encodeURIComponent(user.photo)}&id=${user._id}`;
  router.push(`/profile/${user._id}${query}`);
};


  const handleSinglePost = (id: string) => {
    router.push(`/post/${id}`);
  };

  
  return (
    <Card
        sx={{
          my: 4,
          maxWidth: '600px',
          mx: 'auto',
          borderRadius: 4,
          boxShadow: 3,
          backgroundColor: '#ffffff',
        }}
      >

      <CardHeader
          
        avatar={
          <Avatar sx={{ bgcolor: red[500], cursor: "pointer", overflow: 'hidden' }} aria-label="recipe"
            onClick={() => handleProfile(postdata.user)}>
            <Image
              src={postdata?.user?.photo || img}
              alt={postdata.user.name}
              width={40}
              height={40}
              style={{ borderRadius: '50%' }}
            />
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={
          <Typography
            onClick={() => handleProfile(postdata.user)}

            sx={{
              fontWeight: 'bold',
              cursor: "pointer",
              width: "fit-content",
              backgroundColor: "#029f9a70"
            }}
          >
            {postdata.user.name}
          </Typography>
        }
        subheader={
          <Typography variant="body2" color="text.secondary">
            {postdata.createdAt}
          </Typography>
        }
      />

      {postdata.image &&
        <CardMedia
          component="img"
          image={postdata.image}
          alt="Post Image"
          sx={{ height: 300, width: '100%', objectFit: 'cover' }}
        />
      }

      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {postdata.body}
        </Typography>
      </CardContent>

      <CardActions disableSpacing sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
        <IconButton aria-label="like">
          <ThumbUpIcon />
        </IconButton>

        <IconButton aria-label="comment" onClick={() => handleSinglePost(postdata._id)}>
          <CommentIcon />
        </IconButton>

        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>

      {/* one comm only */}
      {postdata?.comments.length > 0 && !allComments &&
        <Box key={postdata.comments[0]._id}>
          <CardHeader
            avatar={
              <Avatar
                sx={{ bgcolor: red[500], cursor: "pointer", overflow: 'hidden' }}
                aria-label="recipe"
                onClick={() => handleProfile(postdata.comments[0].commentCreator._id)}
              >
                <Image
                  src={img}
                  alt={"aa"}
                  width={40}
                  height={40}
                  style={{ borderRadius: '50%' }}
                />
              </Avatar>
            }
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            }
            title={
              <Typography
                onClick={() => handleProfile(postdata.comments[0].commentCreator._id)}
                sx={{
                  fontWeight: 'bold',
                  cursor: "pointer",
                  width: "fit-content",
                  backgroundColor: "#029f9a70"
                }}
              >
                {postdata.comments[0].commentCreator.name}
              </Typography>
            }
            subheader={
              <Typography variant="body2" color="text.secondary">
                {new Date(postdata.comments[0].createdAt).toLocaleString()}
              </Typography>
            }
          />
          <Box sx={{ px: 2, pb: 2 }}>
            <Typography variant="body2" color="text.primary">
              {postdata.comments[0].content}
            </Typography>

  

      {/* Add a new comm*/}
      <Box mt={2}>
        <CreateComment postId={postdata._id} />
      </Box>
          </Box>
        </Box>
      }

      {/* allComments  */}
      {postdata?.comments.length > 0 && allComments &&
        postdata.comments.map((comment) => (
          <Box key={comment._id}>
            <CardHeader
              avatar={
                <Avatar
                  sx={{ bgcolor: red[500], cursor: "pointer", overflow: 'hidden' }}
                  aria-label="recipe"
                  onClick={() => handleProfile(comment.commentCreator._id)}
                >
                  <Image
                    src={img}
                    alt={"aa"}
                    width={40}
                    height={40}
                    style={{ borderRadius: '50%' }}
                  />
                </Avatar>
              }
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
              title={
                <Typography
                  onClick={() => handleProfile(comment.commentCreator._id)}
                  sx={{
                    fontWeight: 'bold',
                    cursor: "pointer",
                    width: "fit-content",
                    backgroundColor: "#029f9a70"
                  }}
                >
                  {comment.commentCreator.name}
                </Typography>
              }
              subheader={
                <Typography variant="body2" color="text.secondary">
                  {new Date(comment.createdAt).toLocaleString()}
                </Typography>
              }
            />
            <Box sx={{ px: 2, pb: 2 }}>
              <Typography variant="body2" color="text.primary">
                {comment.content}
              </Typography>
            </Box>
          </Box>
        ))
      }

    </Card>
  );
}
