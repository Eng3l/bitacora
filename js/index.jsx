
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
    const [base, setBase] = useState(0);
    const [baseMaps, setBaseMaps] = useState([]);
    let   featx = null;
    const storage = window.localStorage;
    let   layer = null;

    const openFeature = (feat) => {
        if (feat == featx) {
            setFeature(null);
            featx = null;
        } else {
            setFeature(feat);
            featx = feat;
        }
    }

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
        });
        
        (new L.Control.Coords()).addTo(map);
        (new L.Control.Zoom({ position: 'topright' })).addTo(map);

        setMap(map)
        setTd(map.timeDimension)

        fetch('/api/v1/events')
            .then(res => res.json())
            .then(res => {
                const layer = L.timeDimension.layer.timeGeoJson(L.geoJson(res, {
                    pointToLayer: function (ft, latLng) {
                        const m= L.marker(latLng)
                        m.on('click', (event) => openFeature(event.target.feature))
                        return m;
                    }
                }));
                map.timeDimension.setAvailableTimes(layer._availableTimes, 'union');
                layer.addTo(map)
            })
        let baseMap = storage.getItem('base_map');
        if (baseMap != null) {
            baseMap = JSON.parse(baseMap);
            setBase(baseMap)
        }
    }, [])

    useEffect(() => {
        if (map != null) {
            fetch('/api/v1/maps')
                .then(res => res.json())
                .then(res => {
                    setBaseMaps(res)
                    if (!base && res.length) {
                        setBase(res[0])
                    }
                })
        }
    }, [map])

    useEffect(() => {
        if (base) {
            if (layer != null) {
                layer.removeFrom(map)
            }
            layer = L.tileLayer(base.url).addTo(map);
            storage.setItem('base_map', JSON.stringify(base));
        }
    }, [base])

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
              baseMap={base}
              baseMaps={baseMaps}
              setBase={setBase}
              />
        </div>
    )

}

ReactDOM.render(<MainApp/>, document.getElementById('app'));