// Initialize Platform
let platform = new H.service.Platform({
    apikey: "Oz5Y3E61DihgkPnBbmmj6sCeUlFB3X9VgIqEaOIxPUM"
});

let defaultLayers = platform.createDefaultLayers();

// Create a map and center it around new your and zoom to 11 by default
let map = new H.Map(document.getElementById("map"),
    defaultLayers.vector.normal.map, {
    center: { lat: 40.69505, lng: -73.989731 },
    zoom: 11,
    pixelRatio: window.devicePixelRatio || 1
}
);

// Resize map whenever browser window is resized
window.addEventListener("resize", () => map.getViewPort().resize());

// Add navigation abilities to the map
var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

// Add some user interface for zooming in and out
let ui = H.ui.UI.createDefault(map, defaultLayers);

// Fetching data from DOHMH API
fetch("https://data.cityofnewyork.us/resource/9jgj-bmct.json?$limit=62000")
    .then((response) => {
        if (response.status !== 200) {
            console.log("ERROR");
            return;
        }
        response.json().then((data) => {
            // Use fetched data and visualize it

            // Get relavent fetched data
            let clusteringData = [];
            for (let i = 0; i < data.length; i++) {
                if (data[i].latitude) {
                    clusteringData.push(new H.clustering.DataPoint(data[i].latitude, data[i].longitude));
                }
            }

            // Initialize a clustering provider
            let clusteredDataProvider = new H.clustering.Provider(clusteringData);

            // Add clusters layer
            map.addLayer(new H.map.layer.ObjectLayer(clusteredDataProvider));
        })
    });
