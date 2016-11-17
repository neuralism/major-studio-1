var leafletMap;
var canvas;
var mags = [];
var quakes = [];
var slider;

function setup(){
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent('leafletMap');
    initLeaflet();
    loadStrings('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.csv', parseSource);
    slider = createSlider(0, 10, 1);
    slider.position(width/2-50, 25);
    slider.changed(updateQuakes);
}

function parseSource(data) {
    for (var i = 1; i < data.length; i++) {
        var row = split(data[i], ',');
        mags[i] = row[4];   // store data from source in global for later use
        var place = row[13];    // read location to customize marker popup

        // create a leafle circle marker
        quakes[i] = L.circleMarker([row[1], row[2]], {
            stroke: true,
            weight: 1,
            opacity: 0.3,
            fillOpacity: 0.8,
            radius: row[4]
        });
        
        // add marker to the map
        quakes[i]
            .addTo(leafletMap)
            .bindPopup('<b>' + row[4] + '<b> magnitude ' + place);
    }
}

function initLeaflet() {
    L.mapbox.accessToken = 'pk.eyJ1IjoiY3Jvb2tvb2tvbyIsImEiOiJoSWZlQWhnIn0.BZsl4HSikEgkLjem-3Y8CQ';
    leafletMap = L.mapbox.map('leafletMap', 'mapbox.light').setView([20, 0], 2);
    
    function onMapClick(e) {
        // no need but we need the function
    }
    
    // callback for leaflet map interaction
    leafletMap.on('click', onMapClick);
}

function updateQuakes() {
    for (var i = 1; i < quakes.length; i++) {
        // check if lider value excees individual magnitude
        if (mags[i] > slider.value())
            quakes[i].setRadius(mags[i]);
        else
            quakes[i].setRadius(0);
    }
}