
import React from 'react';
import ReactDOM from 'react-dom';

import Slider from '@material-ui/core/Slider'
import LinearProgress from '@material-ui/core/LinearProgress'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import Button from '@material-ui/core/Button'
import FirstPage from '@material-ui/icons/FirstPage';
import FastRewind from '@material-ui/icons/FastRewind';
import FastForward from '@material-ui/icons/FastForward';
import LastPage from '@material-ui/icons/LastPage';

export default
class Player extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            key: false,
            value: 0
        }

        this.onSliderChanged = this.onSliderChanged.bind(this)
        this.onFirst         = this.onFirst.bind(this)
        this.onPrev          = this.onPrev.bind(this)
        this.onNext          = this.onNext.bind(this)
        this.onLast          = this.onLast.bind(this)
    }

    onSliderChanged(e, v) {
        this.props.td.setCurrentTimeIndex(v)
        this.props.setFeature(null)
        this.setState({value: v})
    }

    onFirst() {
        this.props.td.setCurrentTimeIndex(0)
        this.setState({value: 0})
        this.props.setFeature(null)
    }

    onPrev() {
        const v = this.props.td.getCurrentTimeIndex() - 1
        if (v >= 0) {
            this.props.td.setCurrentTimeIndex(v)
            this.setState({value: v})
            this.props.setFeature(null)
        }
    }

    onNext() {
        const v = this.props.td.getCurrentTimeIndex() + 1
        if (v < this.props.td.getAvailableTimes().length) {
            this.props.td.setCurrentTimeIndex(v)
            this.setState({value: v})
            this.props.setFeature(null)
        }
    }

    onLast() {
        const v = this.props.td.getAvailableTimes().length - 1
        this.props.td.setCurrentTimeIndex(v)
        this.setState({value: v})
        this.props.setFeature(null)
    }

    render() {
        let max=0;
        if (this.props.td) {
            max   = this.props.td.getAvailableTimes().length - 1
            // value = this.props.td.getCurrentTimeIndex();
        }
        return (
            <div className='slider-control'>
                <ButtonGroup size='small' variant='contained'>
                    <Button onClick={this.onFirst}>
                        <FirstPage/>
                    </Button>
                    <Button onClick={this.onPrev}>
                        <FastRewind/>
                    </Button>
                    <Button onClick={this.onNext}>
                        <FastForward/>
                    </Button>
                    <Button onClick={this.onLast}>
                        <LastPage/>
                    </Button>
                </ButtonGroup>
                <Slider min={0} max={max} step={1} marks={true}
                    value={this.state.value} onChange={this.onSliderChanged}
                />
                {/* <LinearProgress
                    variant='determinate'
                    value={this.state.value / max * 100}
                /> */}
            </div>
        )
    }

}