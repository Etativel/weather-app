import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import TileJSON from "ol/source/TileJSON";
import { fromLonLat } from "ol/proj";

let map;

function initializeMap() {
  const mapContainer = document.querySelector(".map-container");

  const source = new TileJSON({
    url: `https://api.maptiler.com/maps/outdoor-v2/tiles.json?key=MeDWRjir5sGmDMPsPW8P`,
    tileSize: 512,
    crossOrigin: "anonymous",
  });

  map = new Map({
    layers: [
      new TileLayer({
        source: source,
      }),
    ],
    target: mapContainer,
    view: new View({
      constrainResolution: true,
      center: fromLonLat([0, 0]),
      zoom: 2,
    }),
  });
}

function showMap(location) {
  console.log("Map changed to:", location);

  if (!map) {
    initializeMap();
  }

  map.getView().setCenter(fromLonLat(location));
  map.getView().setZoom(11);
}

export { initializeMap, showMap };
