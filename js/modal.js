
import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function SimpleModal(props) {

    const handleClose = () => {
        props.setOpen(false);
    };

    return (
        <Dialog
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={props.open}
            maxWidth="lg"
            fullWidth={true}
            fullScreen={true}
            onClose={handleClose}
        >
            <DialogTitle id="form-dialog-title">{props.img}</DialogTitle>
            <DialogContent dividers >
                <img
                    className="img-modal"
                    src={'static/img/' + props.folder + '/' + props.img}
                />
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={handleClose} color="primary">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
}
