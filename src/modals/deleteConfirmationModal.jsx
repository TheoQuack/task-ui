import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import PropTypes from 'prop-types';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  color: 'black',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


    
export default function DeleteConfirmationModal(props) {
  const { deleteFunc } = props
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  const closeAndDelete = () => {
    deleteFunc();
    handleClose();
  }

  return (
  <div>
      <IconButton onClick={handleOpen}>
            <DeleteIcon />
        </IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Are you sure you want to Delete?
          </Typography>
          <Button onClick={closeAndDelete}>Yes</Button>
          <Button onClick={handleClose}>Cancel</Button>
        </Box>
      </Modal>
    </div>
  );
}

DeleteConfirmationModal.propTypes = {
  deleteFunc: PropTypes.func.isRequired
};
