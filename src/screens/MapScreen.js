import { SafeAreaView, StyleSheet, View, Text, Platform } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useEffect, useState } from "react";
import { fetchData } from "../utils";
import { Location } from "expo-location";

export default function MapScreen({ route, navigation }) {
  const [toiletData, setToiletData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [startRegion, setStartRegion] = useState(null);
  const [startCity, setStartCity] = useState()
  const {city, deviceLocation} = route.params;

  const getLocation = async () => {
    if (city.city === "Manchester") {
      return {
        latitude: 53.47961811497421,
        longitude: -2.234728881062332,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
      };
    } else if(city.city !== "Manchester" || city === null) {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return {
          latitude: 53.47961811497421,
          longitude: -2.234728881062332,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        };
      } else {
        let location = await Location.getCurrentPositionAsync({});
        console.log(location, "<<<<<<<<< Status");
        setCurrentLocation(location.coords);

        return {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.2,
          longitudeDelta: 0.2,
        };
      }
    }
  };

  useEffect(() => {
    
    getLocation().then((response) => {
      setStartRegion(response);
      setIsLoading(false);
    });
    fetchData()
      .then((response) => {
        setToiletData(response);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [city]);

  console.log(startRegion, "<<<<<< Initial Region");
  console.log(city, "<<<<<   City");
  console.log(currentLocation, "<<<<<< Current Location")
  console.log(deviceLocation, "deviceLocation")

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        {isLoading ? (
          <Text>Map is loading.</Text>
        ) : (
          <MapView
            style={styles.mapStyle}
            initialRegion={startRegion}
            customMapStyle={mapStyle}
          >
            <Marker
              coordinate={{
                latitude: 52.2222,
                longitude: -2.2222,
              }}
              title="Your Location"
            />
            {toiletData.map((toilet) => (
              <Marker
                key={toilet.id}
                draggable
                coordinate={{
                  latitude: toilet.latitude,
                  longitude: toilet.longitude,
                }}
                onDragEnd={(e) =>
                  alert(JSON.stringify(e.nativeEvent.coordinate))
                }
                title={toilet.name}
                description={toilet.directions}
              />
            ))}
          </MapView>
        )}
      </View>
    </SafeAreaView>
  );
}

const mapStyle = [
  { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
  {
    featureType: "administrative.locality",
    elementType: "labels.text.fill",
    stylers: [{ color: "#d59563" }],
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [{ color: "#d59563" }],
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [{ color: "#263c3f" }],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.fill",
    stylers: [{ color: "#6b9a76" }],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#38414e" }],
  },
  {
    featureType: "road",
    elementType: "geometry.stroke",
    stylers: [{ color: "#212a37" }],
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [{ color: "#9ca5b3" }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [{ color: "#746855" }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [{ color: "#1f2835" }],
  },
  {
    featureType: "road.highway",
    elementType: "labels.text.fill",
    stylers: [{ color: "#f3d19c" }],
  },
  {
    featureType: "transit",
    elementType: "geometry",
    stylers: [{ color: "#2f3948" }],
  },
  {
    featureType: "transit.station",
    elementType: "labels.text.fill",
    stylers: [{ color: "#d59563" }],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#17263c" }],
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [{ color: "#515c6d" }],
  },
  {
    featureType: "water",
    elementType: "labels.text.stroke",
    stylers: [{ color: "#17263c" }],
  },
];
const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  mapStyle: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
