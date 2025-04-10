mapboxgl.accessToken = 'pk.eyJ1IjoiaG9oMjAwNiIsImEiOiJjbTkxeXpqZWMwNmI4Mmpvam5pc3BrZzh3In0.f3u-9QwEhntO7BGXqxoTkg';

const map = new mapboxgl.Map({
    container: 'map-container',
    style: 'mapbox://styles/mapbox/light-v11',
    projection: 'globe', // Display the map as a globe, since satellite-v9 defaults to Mercator
    zoom: 12.5, // starting zoom
    center: [-81.69992, 41.49757],   // starting position [lng, lat],
    maxZoom: 24
    // bearing: 30,
    // hash: true,     // can help map stay fixed depending on link sent
});

// turning on 3D terrain on the map
map.on('load', () => {
    map.addSource('mapbox-dem', {
        type: 'raster-dem',
        url: 'mapbox://mapbox.mapbox-terrain-dem-v1',
        tileSize: 512,
        maxZoom: 14
    });

    // adding terrain and exaggeration factor
    map.setTerrain({
        source: 'mapbox-dem',
        exaggeration: 2,
    });

    // adding the buildings themselves through add layer and some help from ChatGPT
    map.addLayer({
        'id': '3d-buildings',
        'type': 'fill-extrusion',
        'source': 'composite',
        'source-layer': 'building',
        'minzoom': 15,
        'paint': {
            'fill-extrusion-color': '#808080',
            'fill-extrusion-height': ['get', 'height'],
            'fill-extrusion-base': ['get', 'min_height'],
            'fill-extrusion-opacity': 0.6,
        }
    });
});


// loading in positions to use in a function later on
const marker1Position = [-81.70345, 41.48479];
const marker2Position = [-81.70439, 41.48445];
const marker3Position = [-81.69543, 41.50863]; // Rock N Roll Hall of Fame
const marker4Position = [-81.69368, 41.49964]; // Public Square
const marker5Position = [-81.68080, 41.50133]; // Playhouse Square

// name the marker 1 to know where you are
const marker1 = new mapboxgl.Marker({ color: 'blue' })
    .setLngLat(marker1Position)
    .addTo(map);

const marker2 = new mapboxgl.Marker({ color: 'green' })
    .setLngLat(marker2Position)
    .addTo(map);

const marker3 = new mapboxgl.Marker({ color: 'red' })
    .setLngLat(marker3Position)
    .addTo(map);

const marker4 = new mapboxgl.Marker({ color: 'orange' })
    .setLngLat(marker4Position)
    .addTo(map);

const marker5 = new mapboxgl.Marker({ color: 'purple' })
    .setLngLat(marker5Position)
    .addTo(map);

// pop ups - offset adjusts where the popup is in relation to the marker
const popup1 = new mapboxgl.Popup({ offset: 40 }).setText('West Side Market');

const popup2 = new mapboxgl.Popup({ offset: 40 }).setText('Great Lakes Brewing');

const popup3 = new mapboxgl.Popup({ offset: 40 }).setText('Rock N Roll Hall of Fame');

const popup4 = new mapboxgl.Popup({ offset: 40 }).setText('Public Square');

const popup5 = new mapboxgl.Popup({ offset: 40 }).setText('Playhouse Square');

// setting popup to markers 1 through 5
marker1.setPopup(popup1);
marker2.setPopup(popup2);
marker3.setPopup(popup3);
marker4.setPopup(popup4);
marker5.setPopup(popup5);

function zoomToMarker() {
    map.easeTo({
        center: marker1Position,
        zoom: 16,
        pitch: 45,
        bearing: 0,
        duration: 1000
    })
};

// zoomToMarker();
// experimenting with zoom to marker functionality

// adding zoom in and out buttons
const zoominout = new mapboxgl.NavigationControl({
    showZoom: true,
    showCompass: false,
});

// adding the actual buttons to the layout
map.addControl(zoominout, 'bottom-right');


// .forEach

// for densely packed markers, you can turn them into different shapes as you zoom in and out


