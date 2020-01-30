
import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';

import Paper from '@material-ui/core/Paper'
import 'typeface-roboto';
import Typography from '@material-ui/core/Typography';

import Player from './player'
import SingleLineGridList from './grid'

function MainApp() {
    
    const [map, setMap] = useState(null);
    const [td, setTd] = useState(null);
    const [feature, setFeature] = useState(null);

    useEffect(() => {
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

        setMap(map)
        setTd(map.timeDimension)

        fetch('/api/v1/events')
            .then(res => res.json())
            .then(res => {
                const layer = L.timeDimension.layer.timeGeoJson(L.geoJson(res, {
                    pointToLayer: function (ft, latLng) {
                        const m= L.marker(latLng)
                        m.on('click', (event) => setFeature(event.target.feature))
                        return m;
                    }
                }));
                map.timeDimension.setAvailableTimes(layer._availableTimes, 'union');
                layer.addTo(map)
            })
    }, [])

    return (
        <div className="app">
            {feature && (
                <Paper className='feature-info'>
                    <Typography variant="h5" gutterBottom>
                        {feature.properties.label}
                    </Typography>
                    {/* <SingleLineGridList/> */}
                </Paper>
            )}
            <div className="app" id="map">
            </div>
            {feature && (
                <div className='feature-pictures'>
                    <Paper>
                        <SingleLineGridList
                         folder={feature.properties.folder}
                         imgs={feature.properties.imgs}/>
                    </Paper>
                </div>
            )}
            <Player
              td={td}
              setFeature={setFeature}
              />
        </div>
    )

}

ReactDOM.render(<MainApp/>, document.getElementById('app'));