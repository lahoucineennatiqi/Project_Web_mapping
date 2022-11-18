mapboxgl.accessToken = 'pk.eyJ1Ijoic2FsYWhlbGZhcmlzc2kiLCJhIjoiY2ttb3p1Yzk3Mjl2bzJ2bno3OGlqcjJ2bCJ9.pErPZNgS_t5jzHlsp_XyRQ';
const map = new mapboxgl.Map({
  container: "map", // container ID
  // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
  style: "mapbox://styles/mapbox/streets-v11", // style URL
  zoom: 16, // starting zoom
  center: [-6.768419574992746, 34.096349628140295],
  projection: "globe", // display map as a 3D globe
  minZoom: 10
});
// style...
map.on("style.load", () => {
  map.setFog({}); // enable atmosphere and stars
});
 
map.on("load", () => {
//  sol
  map.addSource("sol", {
    type: "geojson",
    // Use a URL for the value for the `data` property.
    data: "data/sol.geojson",
  });
  map.addLayer({
        id: "sol",
        type: "fill",
        source: "sol",
        paint: {
          "fill-color": "#ECF87F",
        },
  });
//  sol
  map.addSource("passage", {
    type: "geojson",
    // Use a URL for the value for the `data` property.
    data: "data/pass.geojson",
  });
  map.addLayer({
        id: "passage",
        type: "fill",
        source: "passage",
        paint: {
          "fill-color": "#E97451",
        },
  });
//  eau
  map.addSource("eau", {
    type: "geojson",
    // Use a URL for the value for the `data` property.
    data: "data/eau.geojson",
  });
  map.addLayer({
        id: "eau",
        type: "fill",
        source: "eau",
        paint: {
          "fill-color": "#0E86D4",
        },
  });  
//  vegetation
  map.addSource("Vegetation", {
    type: "geojson",
    // Use a URL for the value for the `data` property.
    data: "data/veg.geojson",
  });
  map.addLayer({
    id: "Vegetation",
    type: "fill-extrusion",
    source: "Vegetation",
    paint: {
      // Get the `fill-extrusion-color` from the source `color` property.
      "fill-extrusion-color": '#228b22',

      // Get `fill-extrusion-height` from the source `height` property.
      "fill-extrusion-height": 2,

      // Make extrusions slightly opaque to see through indoor walls.
      "fill-extrusion-opacity": 0.7
    },
  });
//  construction 3D
  map.addSource("Construction", {
    type: "geojson",
    // Use a URL for the value for the `data` property.
    data: "data/cst.geojson",
  });
  map.addLayer({
    id: "Construction",
    type: "fill-extrusion",
    source: "Construction",
    paint: {
      // Get the `fill-extrusion-color` from the source `color` property.
      "fill-extrusion-color": '#964B00',

      // Get `fill-extrusion-height` from the source `height` property.
      "fill-extrusion-height": 10,

      // Make extrusions slightly opaque to see through indoor walls.
      "fill-extrusion-opacity": 0.8
    },
  });
});
// markers  
let T = ['voliere','vivarium','museum','mosque','WC1','WC2']
let C = [-6.76528842,34.09421557,-6.76781571,34.09600804,-6.76889836,34.09634525,-6.76807271,34.09603533,-6.76902813,34.09624836,-6.76506489,34.09378073]
let D = ['des1','des2','des2','des2','des2','des2']
for (let i = 0; i < T.length; i++) {
const geojson = {
  'type': 'FeatureCollection',
  'features': [
  {
  'type': 'Feature',
  'geometry': {
  'type': 'Point',
  'coordinates': [C[2*i],C[2*i+1]]
  },
  'properties': {
  'title': T[i],
  'description': D[i]
  }
  },
  ]
  };

map.on('load', function() {
  map.loadImage('assets/img/'+T[i]+'.png', function(error, image) { //this is where we load the image file 
      if (error) throw error;
      map.addImage('custom-marker'+T[i], image); //this is where we name the image file we are loading 
      map.addLayer({
          'id': 'markers'+T[i], //this is the name of the layer, it is what we will reference below 
          'type': "symbol",
          'source': { //now we are adding the source to the layer more directly and cleanly 
              type: "geojson",
              data: geojson // CHANGE THIS TO REFLECT WHERE YOUR DATA IS COMING FROM
          },
          'layout': {
              "icon-image": 'custom-marker'+T[i], // the name of image file we used above
              "icon-allow-overlap": false,
              "icon-size": 0.08 //this is a multiplier applied to the standard size. So if you want it half the size put ".5"
          }
      })
  })

})
// When a click event occurs on a feature in the places layer, open a popup at the
// location of the feature, with description HTML from its properties.
map.on('click', 'markers'+T[i], (e) => {
  // Copy coordinates array.
  const coordinates = [C[2*i],C[2*i+1]];
  const description = '<img src="assets/img/'+T[i]+'.png" width=100px height=100px>'+'<h1>'+D[i]+'</h1>';
  
  // Ensure that if the map is zoomed out such that multiple
  // copies of the feature are visible, the popup appears
  // over the copy being pointed to.
  while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
  coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
  }
   
  new mapboxgl.Popup()
  .setLngLat(coordinates)
  .setHTML(description)
  .addTo(map);
  });
   
}



// exemple



// // markers
// const marker1 = new mapboxgl.Marker()
// .setLngLat([-6.76528842,34.09421557])
// .addTo(map);
// const marker2 = new mapboxgl.Marker({ color: 'black' })
// .setLngLat([-6.76781571,34.09600804])
// .addTo(map);
// const marker3 = new mapboxgl.Marker({ color: 'black' })
// .setLngLat([-6.76889836,34.09634525])
// .addTo(map);
// const marker4 = new mapboxgl.Marker({ color: 'black' })
// .setLngLat([-6.76807271,34.09603533])
// .addTo(map);
// const marker5 = new mapboxgl.Marker({ color: 'black' })
// .setLngLat([-6.76902813,34.09624836])
// .addTo(map);
// const marker6 = new mapboxgl.Marker({ color: 'black' })
// .setLngLat([-6.76506489,34.09378073])
// .addTo(map);
// const marker7 = new mapboxgl.Marker({ color: 'black' })
// .setLngLat([-6.76499209,34.09372678])
// .addTo(map);
// const marker8 = new mapboxgl.Marker({ color: 'black' })
// .setLngLat([-6.76472871,34.09417972])
// .addTo(map);
// const marker9 = new mapboxgl.Marker({ color: 'black' })
// .setLngLat([-6.7683925,34.0964594])
// .addTo(map);
// const marker10 = new mapboxgl.Marker({ color: 'black' })
// .setLngLat([-6.7665798,34.0953559])
// .addTo(map);
// const marker11 = new mapboxgl.Marker({ color: 'black' })
// .setLngLat([-6.7686174,34.0967758])
// .addTo(map);
// const marker12 = new mapboxgl.Marker({ color: 'black' })
// .setLngLat([-6.7692427,34.0962986])
// .addTo(map);
// const marker13 = new mapboxgl.Marker({ color: 'black' })
// .setLngLat([-6.7679920,34.0963104])
// .addTo(map);
// const marker14 = new mapboxgl.Marker({ color: 'black' })
// .setLngLat([-6.7676282,34.0960667])
// .addTo(map);
// const marker15 = new mapboxgl.Marker({ color: 'black' })
// .setLngLat([-6.7671132,34.0952713])
// .addTo(map);
// const marker16 = new mapboxgl.Marker({ color: 'black' })
// .setLngLat([-6.7670437,34.0949633])
// .addTo(map);