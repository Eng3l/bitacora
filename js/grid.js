import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
// import IconButton from '@material-ui/core/IconButton';
// import StarBorderIcon from '@material-ui/icons/StarBorder';

import SimpleModal from './modal';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        flexWrap: 'nowrap',
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
        transform: 'translateZ(0)',
    },
    title: {
        color: theme.palette.primary.light,
    },
    titleBar: {
        background:
            'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
}));

export default
function SingleLineGridList(props) {
    const classes = useStyles();

    const [open, setOpen] = React.useState(false);
    const [pict, setPict] = React.useState(null);

    function handleClick(img) {
        setPict(img)
        setOpen(true)
    }

    return (
        <div className={classes.root}>
            <SimpleModal
              open={open}
              setOpen={setOpen}
              img={pict}
              folder={props.folder}
              />
            <GridList cellHeight={160} className={classes.gridList} cols={4.5}>
                {props.imgs.map(img => (
                    <GridListTile key={img}>
                        <img
                          src={'static/img/' + props.folder + '/' + img}
                          onClick={() => handleClick(img)}
                          />
                        <GridListTileBar
                            title={img}
                            // titlePosition="top"
                            classes={{
                                root: classes.titleBar,
                                title: classes.title,
                            }}
                        // actionIcon={
                        //   <IconButton aria-label={`star ${tile.title}`}>
                        //     <StarBorderIcon className={classes.title} />
                        //   </IconButton>
                        // }
                        />
                    </GridListTile>
                ))}
            </GridList>
        </div>
    );
}
