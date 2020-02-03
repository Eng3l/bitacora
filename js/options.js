
import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
// import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';

import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import MapIcon from '@material-ui/icons/Map'

export default function OptionsModal(props) {

    const handleClose = () => {
        props.setOpen(false);
    };

    const handleClick = (map) => {
        console.log(map, props.baseMap, map == props.baseMap)
        props.setBase(map);
        props.setOpen(false);
    }

    return (
        <Dialog
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={props.open}
            onClose={handleClose}
        >
            <DialogTitle id="form-dialog-title">Base maps</DialogTitle>
            <List>
                {props.baseMaps.map(map => (
                    
                    <ListItem button onClick={() => handleClick(map)} key={map.label}
                      selected={map.url == props.baseMap.url}>
                        <ListItemAvatar>
                            <Avatar >
                                <MapIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={map.label} />
                    </ListItem>
                ))}
            </List>
            <DialogActions>
                <Button autoFocus onClick={handleClose} color="primary">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
}
