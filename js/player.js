
import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';

import Slider from '@material-ui/core/Slider'
// import LinearProgress from '@material-ui/core/LinearProgress'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import Button from '@material-ui/core/Button'
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import FastRewind from '@material-ui/icons/FastRewind';
import FastForward from '@material-ui/icons/FastForward';
import SkipNextIcon from '@material-ui/icons/SkipNext';

export default
function Player(props) {

    const [value, setValue] = useState(0);
    const [max, setMax]     = useState(0);
    const [td, setTd]       = useState(null);

    useEffect(() => {
        if (props.td) {
            setTimeout(() => {
                setTd(props.td)
                setMax(props.td.getAvailableTimes().length - 1)
            }, 1000)
        }
    }, [props.td])

    function onSliderChanged(e, v) {
        td.setCurrentTimeIndex(v)
        props.setFeature(null)
        setValue(v)
    }

    function onFirst() {
        td.setCurrentTimeIndex(0)
        setValue(0)
        props.setFeature(null)
    }

    function onPrev() {
        const v = td.getCurrentTimeIndex() - 1
        if (v >= 0) {
            td.setCurrentTimeIndex(v)
            setValue(v)
            props.setFeature(null)
        }
    }

    function onNext() {
        const v = td.getCurrentTimeIndex() + 1
        if (v <= max) {
            td.setCurrentTimeIndex(v)
            setValue(v)
            props.setFeature(null)
        }
    }

    function onLast() {
        const v = max
        td.setCurrentTimeIndex(v)
        setValue(v)
        props.setFeature(null)
    }

    return (
        <div className='slider-control'>
            <ButtonGroup size='small' variant='contained'>
                <Button onClick={onFirst}>
                    <SkipPreviousIcon/>
                </Button>
                <Button onClick={onPrev}>
                    <FastRewind/>
                </Button>
                <Button onClick={onNext}>
                    <FastForward/>
                </Button>
                <Button onClick={onLast}>
                    <SkipNextIcon/>
                </Button>
            </ButtonGroup>
            <Slider min={0} max={max} step={1} marks={true}
                value={value} onChange={onSliderChanged}
            />
            {/* <LinearProgress
                variant='determinate'
                value={this.state.value / max * 100}
            /> */}
        </div>
    )

}