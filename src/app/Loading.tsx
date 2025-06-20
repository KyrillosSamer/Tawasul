import * as React from 'react';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';

export default function Loading() {
  return (
    <Box
      sx={{
        width: '100%',
        height: '100vh', 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Stack spacing={2} direction="row">
        <CircularProgress sx={{color:"#fe0058"}} />
        <Typography variant="h6" sx={{ mb: 2, color: '#fe0058', fontWeight: 'bold' }}>
        Loading, please wait...
      </Typography>
    
      </Stack>
    </Box>
  );
}
