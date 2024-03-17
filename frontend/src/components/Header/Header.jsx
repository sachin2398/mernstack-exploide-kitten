import React from 'react';
import { Box, Typography } from '@material-ui/core';

const Header = () => {
  return (
    <Box
      boxShadow="0 1px 5px 1px rgba(0,0,0,0.25)"
      mb={4}
      px={{ xs: 2, md: 5 }}
      py={2}
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      bgcolor="#1e1e1e" 
      color="#ff6f00" 
    >
      <Typography component="h1" variant="h4" style={{ fontFamily: 'Arial, sans-serif', fontWeight: 'bold' }}>
        Kitten Universe
      </Typography>
      <Typography variant="subtitle1" style={{ fontFamily: 'Arial, sans-serif' }}>
        A World of Feline Adventure!
      </Typography>
    </Box>
  );
};

export default Header;
