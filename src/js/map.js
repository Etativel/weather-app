import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import TileJSON from "ol/source/TileJSON";
import { fromLonLat, toLonLat } from "ol/proj";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import { Icon, Style } from "ol/style";
import marker from "../assets/maps-and-flags.png";
import { fetchData } from "./api";

let map;
let markerLayer;

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

  markerLayer = new VectorLayer({
    source: new VectorSource(),
  });
  map.addLayer(markerLayer);

  map.on("click", (event) => {
    const coordinates = event.coordinate;

    const location = toLonLat(coordinates);
    const roundedLocation = [
      parseFloat(location[0].toFixed(2)),
      parseFloat(location[1].toFixed(2)),
    ];
    console.log(roundedLocation);
    fetchData(roundedLocation);
    addMarker(coordinates);
  });
}

function showMap(location) {
  if (!map) {
    initializeMap();
  }

  map.getView().setCenter(fromLonLat(location));
  map.getView().setZoom(11);
}

function addMarker(coordinates) {
  markerLayer.getSource().clear();
  const iconFeature = new Feature({
    geometry: new Point(coordinates),
  });

  const iconStyle = new Style({
    image: new Icon({
      anchor: [0.5, 1],
      src: marker,
      scale: 0.05,
    }),
  });

  iconFeature.setStyle(iconStyle);
  markerLayer.getSource().addFeature(iconFeature);
}
export { initializeMap, showMap };
