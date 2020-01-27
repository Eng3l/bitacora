
import React from 'react';
import ReactDOM from 'react-dom';

import { SnackbarProvider } from 'notistack';
import Paper from '@material-ui/core/Paper'

import Player from './player'
// import Typography from '@material-ui/core/Typography'

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            feature: null,
            map: null,
            td: null,
            key: false
        };
        this.getEvents  = this.getEvents.bind(this)
        this.setFeature = this.setFeature.bind(this)
    }

    componentDidMount() {
        const map = L.map('map', {
            center: [22, -79],
            zoom: 7,
            zoomControl: false,
            attributionControl: false,
            timeDimensionControlOptions: {
                position: 'bottomright',
                loopButton: true,
                speedSlider: false,
                playerOptions: {
                    transitionTime: 1000,
                    buffer: 10,
                    loop: true,
                }
            },
            timeDimension: true,
            timeDimensionControl: false,
        })

        L.tileLayer('http://127.0.0.1:8081/osm/{z}/{x}/{y}.png').addTo(map);
        (new L.Control.Coords()).addTo(map);
        // console.log(this.map);
        this.getEvents();
        this.setState({
            map: map,
            td: map.timeDimension
        })
        console.log
    }

    setFeature(feature) {
        this.setState({feature: feature})
    }

    getEvents() {
        const setFeature = this.setFeature;
        fetch('/api/v1/events')
            .then(res => res.json())
            .then(res => {
                const layer = L.timeDimension.layer.timeGeoJson(L.geoJson(res, {
                    pointToLayer: function (feature, latLng) {
                        const m= L.marker(latLng)
                        m.on('click', event => {
                            setFeature(event.target.feature)
                        })
                        return m;
                    }
                }));
                this.state.map.timeDimension.setAvailableTimes(layer._availableTimes, 'union');
                layer.addTo(this.state.map)
                this.setState({key: !this.state.key})
            })
    }

    render() {
        let info = <div/>;
        if (this.state.feature) {
            console.log(this.state.feature)
            info = (
                <Paper className='feature-info'>
                    <h2>{this.state.feature.properties.label}</h2>
                </Paper>
            )
        }
        return (
            <div className="app">
                {info}
                <div className="app" id="map">

                </div>
                <Player
                  map={this.state.map}
                  td={this.state.td}
                  key={this.state.key}
                  setFeature={this.setFeature}
                  />
            </div>
        )
    }
}

const app = (
    <SnackbarProvider
      maxSnack={3}
      dense
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}>
        <App />
    </SnackbarProvider>
)

ReactDOM.render(app, document.getElementById('app'));