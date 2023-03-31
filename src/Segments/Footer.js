import React from 'react'
import Button from '@mui/material/Button';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

export default function Footer({closeModal, onSave, schemaList, segmentName, isLoading}) {
  return (
    <footer className={schemaList.length < 5 ? 'footer':''}>
    <Button className='onSave'disabled={!schemaList.length || !segmentName} variant="contained" onClick={onSave}>Save the Segment</Button>
    <Button className='cancel' onClick={closeModal}>Cancel</Button>
    <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </footer>
  )
}
