(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD
        define(['leaflet'], factory);
    } else if (typeof module !== 'undefined') {
        // Node/CommonJS
        module.exports = factory(require('leaflet'));
    } else {
        // Browser globals
        if (typeof window.L === 'undefined') {
            throw new Error('Leaflet must be loaded first');
        }
        factory(window.L);
    }
}(function (L) {
    L.Control.Coords = L.Control.extend({
        options: {
            position: 'bottomright'
        },

        onAdd: function (map) {
            var container = L.DomUtil.create('div', 'leaflet-cords leaflet-bar leaflet-control');

            this.link = L.DomUtil.create('a', 'leaflet-cords-a leaflet-bar-part', container);
            this.link.href = '#';
            this.link.text = '-----:-----';

            this._map = map;
            this._map.on('mousemove', this._move, this);
            this._map.on('mouseout', this._leave, this);

            return container;
        },

        _move: function (e) {
            var lat = e.latlng.lat.toFixed(3),
                lon = e.latlng.lng.toFixed(3);
            this.link.text = lat + ":" + lon;
        },

        _leave: function (e) {
            this.link.text = '-----:-----';
        }
    });


    L.control.coords = function (options) {
        return new L.Control.Coords(options);
    };

    L.Control.Hidder = L.Control.extend({

        options: {
            position: 'bottomright'
        },

        onAdd: function (map) {
            var container = L.DomUtil.create('div', 'leaflet-bar leaflet-control');

            this.link = L.DomUtil.create('a', 'leaflet-bar-part', container);
            this.link.href = '#';
            this.link.setAttribute('data-md-tooltip', 'Modo sin distracciones')
            L.DomEvent.on(this.link, 'click', this._click, this);
            L.DomUtil.create('i', 'fa fa-eye-slash', this.link)
            this.visible = true;

            this._map = map;
            this._class = 'oculto';

            this._sidebar = L.DomUtil.get('app')
            this._topright = document.querySelector('.leaflet-top.leaflet-right');
            this._botleft = document.querySelector('.leaflet-bottom.leaflet-left');
            this._legend  = null;
            
            return container;
        },

        _click: function () {
            if (this._legend == null) {
                this._legend   = document.querySelector('.leaflet-control.legend');
            }
            if (this.visible) {
                L.DomUtil.addClass(this._sidebar, this._class);
                this._topright.classList.add(this._class);
                this._botleft.classList.add(this._class);
                this._legend.classList.add(this._class);
            } else {
                L.DomUtil.removeClass(this._sidebar, this._class);
                this._topright.classList.remove(this._class);
                this._botleft.classList.remove(this._class);
                this._legend.classList.remove(this._class);
            }

            this.visible = !this.visible;
        }

    });

    L.control.hidder = function (options) {
        return new L.Control.Hidder(options);
    };

    L.Control.Legend = L.Control.extend({

        options: {
            position: 'bottomright'
        },

        onAdd: function (map) {
            var container = L.DomUtil.create('div', 'leaflet-bar leaflet-control legend');

            return container;
        }
        
    });

    L.control.legend = function (options) {
        return new L.Control.Legend(options);
    }

}));