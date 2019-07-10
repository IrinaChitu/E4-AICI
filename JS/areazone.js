// var map, datasource, client;


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

        // var startPoint = new atlas.data.Feature(new atlas.data.Point([position.coords.longitude, position.coords.latitude]), {
        var startPoint = new atlas.data.Feature(new atlas.data.Point([26.070248, 44.475976]), {
            title: 'You',
            icon: 'pin-blue'
        });

        //Create array with every Washing Point
        var washing_points = [];

        // var masina1 = new atlas.data.Feature(new atlas.data.Point([26.056066, 44.445172]), {
        washing_points[0] = new atlas.data.Feature(new atlas.data.Point([26.056066, 44.445172]), {
            title: 'Masina1',
            icon: 'pin-round-red'
        });

        // var masina2 = new atlas.data.Feature(new atlas.data.Point([26.102194, 44.432511]), {
        washing_points[1] = new atlas.data.Feature(new atlas.data.Point([26.102194, 44.432511]), {
            title: 'Masina2',
            icon: 'pin-round-red'
        });

        washing_points[2] = new atlas.data.Feature(new atlas.data.Point([26.089901, 44.432660]), {
            title: 'Masina3',
            icon: 'pin-round-red'
        });


        //Add the data to the data source.

        datasource.add(startPoint);
        for(let i = 0; i < washing_points.length; i++){
          datasource.add(washing_points[i]);
        }

        //Fit the map window to the bounding box defined by the start and end positions.
        map.setCamera({
            bounds: atlas.data.BoundingBox.fromData([startPoint, washing_points[1]]),
            padding: 100
        });
        // Use SubscriptionKeyCredential with a subscription key
        var subscriptionKeyCredential = new atlas.service.SubscriptionKeyCredential(atlas.getSubscriptionKey());
        // Use subscriptionKeyCredential to create a pipeline
        var pipeline = atlas.service.MapsURL.newPipeline(subscriptionKeyCredential);
        // Construct the RouteURL object
        var routeURL = new atlas.service.RouteURL(pipeline);


        //Start and end point input to the routeURL
        var washing_points_coords = [];

        for(let i = 0; i < washing_points.length; i++){
          washing_points_coords[i] = [[startPoint.geometry.coordinates[0], startPoint.geometry.coordinates[1]], [washing_points[i].geometry.coordinates[0], washing_points[i].geometry.coordinates[1]]];

          routeURL.calculateRouteDirections(atlas.service.Aborter.timeout(10000), washing_points_coords[i]).then((directions) => {
              //Get data features from response
              var data = directions.geojson.getFeatures();
              //Get the route line and add some style properties to it.
              var routeLine = data.features[0];
              routeLine.properties.strokeColor = '#2272B9';
              routeLine.properties.strokeWidth = 5;
              //Add the route line to the data source. We want this to render below the car route which will likely be added to the data source faster, so insert it at index 0.
              datasource.add(routeLine);
              console.log(directions.lengthInMeters);
          });
        }


    });
}
