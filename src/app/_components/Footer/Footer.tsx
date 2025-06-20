'use client';

import React from 'react';
import { Box, Typography, Container } from '@mui/material';

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#029f9a',
        color: 'white',
        py: 3,
        mt: 5,
      }}
    >
      <Container maxWidth="lg" sx={{ textAlign: 'center' }}>
        <Typography variant="body1" fontWeight="bold">
          &copy; {new Date().getFullYear()} Tawasul. All rights reserved.
        </Typography>
        <Typography variant="body2" color="rgba(255,255,255,0.8)" mt={1}>
          Built with ❤️ using Next.js and MUI
        </Typography>
      </Container>
    </Box>
  );
}
