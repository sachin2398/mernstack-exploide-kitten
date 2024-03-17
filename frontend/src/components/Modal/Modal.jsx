import React from 'react';
import { makeStyles, Fade, Backdrop, Modal } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: "#1e1e1e", // Dark background color to match the home page
    borderRadius: "20px",
    boxShadow: '0 8px 16px rgba(0,0,0,.2)',
    outline: 'none',
    minWidth: '300px',
    padding: theme.spacing(6),
    color: '#d8d8d8', // Text color to match the home page
  },
}));

const TransitionsModal = ({ open, handleClose, children }) => {
  const classes = useStyles();

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <div className={classes.paper}>{children}</div>
      </Fade>
    </Modal>
  );
};

export default TransitionsModal;
