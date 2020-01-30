
from flask import Flask, render_template, jsonify
from os import path, listdir
import json
from datetime import datetime

app = Flask('__main__')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/v1/events')
def api_events():
    time_instants = []
    features      = []

    for f in listdir('data'):
        time, label = f.split('-')
        y = time[:4]
        m = time[4:6]
        d = time[6:8]

        ts = int(datetime(year=int(y), month=int(m), day=int(d)).timestamp()) * 1000
        if not ts in time_instants:
            time_instants.append(ts)
        with open(path.join('data', f)) as f:
            ly = json.load(f)
            ly['properties']['time'] = ts
            if not 'label' in ly['properties']:
                ly['properties']['label'] = label[:-5]
            imgs = [f for f in listdir(path.join('static', 'img', ly['properties']['folder']))]
            ly['properties']['imgs'] = imgs
            features.append(ly)

    return jsonify({
        "type": "FeatureCollection",
        "properties": {
            "time_instants": time_instants,
            "num_time_instants": len(time_instants)
        },
        "features": features
    })


if __name__ == "__main__":
    import logging
    log = logging.getLogger('werkzeug')
    log.setLevel(logging.ERROR)
    app.run(debug=True)