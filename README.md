
# Bitacora

This is a picture's gallery that allows you to organize yours pictures
in time and space. Is a map that show markers representing the events
in space and by clicking those markers you can view the pictures.

## Data structure

Inside the folder data you must put the events in the next format `YYYYMMDD-Simple_Label.geojson`
and inside that json the next structure:

```json
{
    "type": "Feature",
    "geometry": {
        "type": "Point[1]",
        "coordinates": [":lon", ":lat"]
    },
    "properties": {
        "end": "",
        "folder": ":picture_folder",
        "label": ":optional_label",
        ...
    }
}
```
* **lon:** Longitude of the point
* **lat:** Latitude of the point
* **picture_folder:** Name of the folder that contains the picture of the events
* **optional_label:** Label of the event, replaces the label in the name if is set.

## Base maps

The file `maps.json` contains an array with tiles maps provider.

```json
[
    {"label":"My map Provider", "url":"https://myprovider.org/{z}/{x}/{y}.png"},
    {"label":"My map Provider2", "url":"https://myprovider2.org/{z}/{x}/{y}.png"},
]
```

## Installing

1. First clone the project: `git clone https://github.com/Eng3l/bitacora.git`
2. Install npm modules: `npm install`
3. Build the javascript modules: `./node_modules/.bin/webpack --mode development`
4. Install *Flask* python module: pip install Flask

## Running

Just run `python3 bitacora.py` and the server will be running on localhost.

## Biblio
[1] http://wiki.geojson.org/GeoJson_draft_version_6