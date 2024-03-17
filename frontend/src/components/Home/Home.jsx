import React, { useState } from 'react';
import { Box, Button, Typography } from '@material-ui/core';
import Modal from '../Modal/Modal';
import homeimg from "../assets/homeimg.jpg"
import UserModal from '../UserModal/UserModel';

const Home = () => {
  const [open, setOpen] = useState(false);

  return (
    <Box
      bgcolor="#1e1e1e" // Dark background color
      minHeight="100vh"
      color="#d8d8d8" // Unique text color
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      textAlign="center"
      padding="16px"
    >
      <Box
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '16px',
        }}
      >
        <Typography component="h1" variant="h2" style={{ marginBottom: '16px', fontFamily: 'Arial, sans-serif', fontWeight: 'bold', color: '#ff6f00' }}>
  Welcome to the Kitten Universe!
  <br />
  Unleash the Feline Fury!
</Typography>

        <Button
          variant="contained"
          size="large"
          onClick={() => setOpen(true)}
          style={{
            marginBottom: '16px',
            backgroundColor: '#ff4500',
            color: 'white',
            padding: '10px 20px',
            borderRadius: '25px',
            boxShadow: '0 4px 6px rgba(0,0,0,.2)',
            transition: 'background-color 0.3s ease',
            fontFamily: 'Arial, sans-serif',
            fontWeight: 'bold',
            fontSize: '1.2rem',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Play Now
        </Button>
        <img
          src={homeimg}
          alt='Exploding Kitten Logo'
          style={{
            maxWidth: '100%',
            maxHeight: '50vh',
            objectFit: 'contain',
            border: 'solid 2px #ff6f00',
            borderRadius: '10px',
            boxShadow: '0 8px 16px rgba(0,0,0,.2)',
          }}
        />
      </Box>

      <Modal open={open} handleClose={() => setOpen(false)}>
        <UserModal />
      </Modal>
    </Box>
  );
};

export default Home;
