import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import TileJSON from "ol/source/TileJSON";
import { fromLonLat } from "ol/proj";

function showMap(location) {
  const mapContainer = document.querySelector(".map-container");
  const source = new TileJSON({
    url: `https://api.maptiler.com/maps/outdoor-v2/tiles.json?key=MeDWRjir5sGmDMPsPW8P`,
    tileSize: 512,
    crossOrigin: "anonymous",
  });

  new Map({
    layers: [
      new TileLayer({
        source: source,
      }),
    ],
    target: mapContainer,
    view: new View({
      constrainResolution: true,
      center: fromLonLat([112.756529, -7.238204]),
      zoom: 11,
    }),
  });
}

export { showMap };
