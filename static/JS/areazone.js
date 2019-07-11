if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(GetMap);
}
else {
     alert("Geolocation is not supported by this browser.");
}


// function showPosition(position) {
//   x.innerHTML = "Latitude: " + position.coords.latitude +
//   "<br>Longitude: " + position.coords.longitude;
// }

function GetMap( position ) {

  fetch('../washingpoints')
      .then(function(response) {
          return response.json();
      })
      .then(function(myJson) {
          console.log(myJson);
      });

fetch('../washingpoints').then(response => {
    console.log(response);
    // Do Rest

    // Create a new map
    var map = new atlas.Map("myMap", {
        //Add your Azure Maps subscription key to the map SDK. Get an Azure Maps key at https://azure.com/maps
        authOptions: {
            authType: 'subscriptionKey',
            subscriptionKey: 'yxBj4IKqdo6W7Hs9TDwIpMVUkiYRQXvMUdp5wBLKJqs'
        }
    });
    map.events.add("load", function () {
      // Add Traffic Flow to the Map

      /*map.setTraffic({
          flow: "relative"
      });
      */

      //Create a data source and add it to the map.
      datasource = new atlas.source.DataSource();
      map.sources.add(datasource);
      //Add a layer for rendering the route lines and have it render under the map labels.
      map.layers.add(new atlas.layer.LineLayer(datasource, null, {
          strokeColor: ['get', 'strokeColor'],
          strokeWidth: ['get', 'strokeWidth'],
          lineJoin: 'round',
          lineCap: 'round',
          filter: ['==', '$type', 'LineString']
      }), 'labels');
      //Add a layer for rendering point data.
      map.layers.add(new atlas.layer.SymbolLayer(datasource, null, {
          iconOptions: {
              image: ['get', 'icon'],
              allowOverlap: true
          },
          textOptions: {
              textField: ['get', 'title'],
              offset: [0, 1.2]
          },
          filter: ['==', '$type', 'Point']
      }));
      //Create the GeoJSON objects which represent the start and end point of the route.

      /**/
      var marker = {style : '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30" height="37" viewBox="0 0 30 37" xml:space="preserve"><rect x="0" y="0" rx="8" ry="8" width="30" height="30" fill="{color}"/><polygon fill="{color}" points="10,29 20,29 15,37 10,29"/><text x="15" y="20" style="font-size:16px;font-family:arial;fill:#ffffff;" text-anchor="middle">{text}</text></svg>',
                    color : 'Red'};
      // var user = {name: "You", position: {long = position.coords.longitude, lat = position.coords.latitude}};
      var user = {name: "You", position: {long : 26.070248, lat : 44.475976}};
      // var startPoint = new atlas.data.Feature(new atlas.data.Point([position.coords.longitude, position.coords.latitude]), {

      var startPoint = {pin: new atlas.data.Feature(new atlas.data.Point([user.position.long, user.position.lat]),
        {
          title: user.name,
          icon: 'pin-round-red'
        }),
      marker: new atlas.HtmlMarker({
          htmlContent: marker.style,
          text: user.name,
          color: marker.color,
          position: [user.position.long, user.position.lat],
          popup: new atlas.Popup({
            content: '<a href="https://www.w3schools.com"> You </a>',
            pixelOffset: [0, -30]
          })
        })
      };

      //Create array with every Washing Point

      /*Database informations*/
      washing_points_info = [];
      washing_points_info.push({name: "1", position: {long: 26.102194, lat: 44.432511}, link: "https://www.w3schools.com"});
      washing_points_info.push({name: "2", position: {long: 26.056066, lat: 44.445172}, link: "https://www.w3schools.com"});
      washing_points_info.push({name: "3", position: {long: 26.089901, lat: 44.432660}, link: "https://www.w3schools.com"});

      var washing_points = [];

      for(let i = 0; i < washing_points_info.length; i++) {
        let cont = '<a width="200" href="https://www.w3schools.com">' + washing_points_info[i].name + '</a>';

        // console.log(washing_points_info[i].name);
        // console.log(washing_points_info[i].position);
        // console.log(cont);
        // console.log(marker);

        washing_points.push({pin: new atlas.data.Feature(new atlas.data.Point([washing_points_info[i].position.long, washing_points_info[i].position.lat]),
          {
            title: washing_points_info[i].name,
            icon: 'pin-round-red'
          }),
            distance:0,
            marker: new atlas.HtmlMarker({
              htmlContent: marker.style,
              text: washing_points_info[i].name,
              color: marker.color,
              position: [washing_points_info[i].position.long, washing_points_info[i].position.lat],
              popup: new atlas.Popup({
                content: cont,
                pixelOffset: [0, -30]})
            })
        });
      }

      // Use SubscriptionKeyCredential with a subscription key
      var subscriptionKeyCredential = new atlas.service.SubscriptionKeyCredential(atlas.getSubscriptionKey());
      // Use subscriptionKeyCredential to create a pipeline
      var pipeline = atlas.service.MapsURL.newPipeline(subscriptionKeyCredential);
      // Construct the RouteURL object
      var routeURL = new atlas.service.RouteURL(pipeline);


      //Start and end point input to the routeURL
      routes_promises = [];


      for(let i = 0; i < washing_points.length; i++){
        washing_points[i].coords = [[startPoint.pin.geometry.coordinates[0], startPoint.pin.geometry.coordinates[1]], [washing_points[i].pin.geometry.coordinates[0], washing_points[i].pin.geometry.coordinates[1]]];
        routes_promises[i] = routeURL.calculateRouteDirections(atlas.service.Aborter.timeout(10000), washing_points[i].coords);
      }

      // Calculate every route to washing points and save distance
      Promise.all(routes_promises).then((directions) => {
        for(let i = 0; i < washing_points.length; i++){
          washing_points[i].distance = directions[i].routes[0].summary.lengthInMeters;
          washing_points[i].directions = directions[i];
        }
        //Sort washing points by shortest distance
        washing_points.sort(function(a, b){ return b.distance - a.distance});

        for(let i = washing_points.length - 1; i >= 0; i--){
          //Get data features from response
          var data = washing_points[i].directions.geojson.getFeatures();
          //Get the route line and add some style properties to it.
          var routeLine = data.features[0];
          if(i == 0) {
            // Shortest path
            routeLine.properties.strokeColor = '#f02e15';
          } else {
            // Other paths
            routeLine.properties.strokeColor = '#2272B9';
          }
          console.log(routeLine);
          routeLine.properties.strokeWidth = 5;
          //Add the route line to the data source. We want this to render below the car route which will likely be added to the data source faster, so insert it at index 0.
          datasource.add(routeLine);
        }

        //Fit the map window to the bounding box defined by the start and end positions.
        map.setCamera({
            bounds: atlas.data.BoundingBox.fromData([startPoint.pin, washing_points[washing_points.length-1].pin]),
            padding: 100
        });

        //Add the data to the data source.

        //datasource.add(startPoint);
        map.markers.add(startPoint.marker);
        for(let i = 0; i < washing_points.length; i++){
          map.markers.add(washing_points[i].marker);
          // Activate Pop-UP on marker click
          map.events.add('click',washing_points[i].marker, () => {
          washing_points[i].marker.togglePopup();
          });
          //datasource.add(washing_points[i].pin);
        }
      });
    });

    });


}

//==================== Log IN Section =================================

// Get the modal
var modalLogin = document.getElementById('id01');
var modalSignUp = document.getElementById('id02');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modalLogin) {
        modalLogin.style.display = "none";
    }
    if (event.target == modalSignUp) {
        modalSignUp.style.display = "none";
    }
}
