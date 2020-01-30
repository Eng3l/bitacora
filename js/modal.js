import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';

const useStyles = makeStyles(theme => ({
  paper: {
    position: 'absolute',
    width: 460,
    backgroundColor: theme.palette.background.paper,
    // border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function SimpleModal(props) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
//   const [modalStyle] = React.useState(getModalStyle);

  const handleClose = () => {
    props.setOpen(false);
  };

  return (
    <div>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={props.open}
        onClose={handleClose}
      >
        <div style={{top:'20%', left:'25%'}}  className={classes.paper}>
          {/* <h2 id="simple-modal-title">Text in a modal</h2> */}
          <p id="simple-modal-description">
              <center>
            <img
              className="img-modal"
              src={'static/img/' + props.folder + '/' + props.img}
            />
            </center>
          </p>
          
        </div>
      </Modal>
    </div>
  );
}
