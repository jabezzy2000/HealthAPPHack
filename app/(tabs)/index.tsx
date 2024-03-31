import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import Parse from 'parse/react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface LocationData {
  id: string;
  latitude: number;
  longitude: number;
  name: string;
}

interface Disease {
  id: string;
  latitude: number;
  longitude: number;
  name: string; // Ensure this matches the properties you use
}



const HomePage = () => {
  const insets = useSafeAreaInsets();
  const screenWidth = Dimensions.get('window').width;
  // Adjust the map's height dynamically based on safe area insets
  const dynamicMapHeight = (Dimensions.get('window').height - insets.top - insets.bottom) * 0.5;
  

  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  } | undefined>(undefined);
  const [activeMapIndex, setActiveMapIndex] = useState(0); // 0 for diseases, 1 for symptoms
  const [diseases, setDiseases] = useState([]);
  const [symptoms, setSymptoms] = useState([]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permission to access location was denied');
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });

      // Fetch diseases and symptoms from Parse
      // Assuming fetchDiseases and fetchSymptoms are implemented
    })();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* Label indicating the current map */}
      <View style={styles.labelContainer}>
        <Text style={styles.mapLabel}>
          {activeMapIndex === 0 ? 'Diseases Map' : 'Symptoms Map'}
        </Text>
      </View>

      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator
        style={[styles.scrollView, {height: dynamicMapHeight}]}
        onMomentumScrollEnd={(event) => {
          const currentPage = event.nativeEvent.contentOffset.x / screenWidth;
          setActiveMapIndex(Math.round(currentPage));
        }}
      >
        {/* Diseases Map with rounded edges */}
        <View style={[styles.mapContainer, { width: screenWidth, borderRadius: 20, overflow: 'hidden' }]}>
          <MapView
            style={[styles.map, {height: dynamicMapHeight}]}
            initialRegion={location}
          >
            {/* Markers for diseases */}
          </MapView>
        </View>

        {/* Symptoms Map with rounded edges */}
        <View style={[styles.mapContainer, { width: screenWidth, borderRadius: 20, overflow: 'hidden' }]}>
          <MapView
            style={[styles.map, {height: dynamicMapHeight}]}
            initialRegion={location}
          >
            {/* Markers for symptoms */}
          </MapView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

  // return (
  //   <SafeAreaView style={{ flex: 1 }}>
  //     <ScrollView
  //       horizontal
  //       pagingEnabled
  //       showsHorizontalScrollIndicator
  //       style={[styles.scrollView, {height: dynamicMapHeight}]}
  //       onMomentumScrollEnd={(event) => {
  //         const currentPage = event.nativeEvent.contentOffset.x / screenWidth;
  //         setActiveMapIndex(Math.round(currentPage));
  //       }}
  //     >
  //       {/* Diseases Map */}
  //       <View style={[styles.mapContainer, { width: screenWidth }]}>
  //         <MapView
  //           style={[styles.map, {height: dynamicMapHeight}]}
  //           initialRegion={location}
  //         >
  //           {/* Assuming diseases array is populated with { latitude, longitude, id } objects */}
  //           {activeMapIndex === 0 && diseases.map((disease) => (
  //             <Marker
  //               key={disease.id}
  //               coordinate={{ latitude: disease.latitude, longitude: disease.longitude }}
  //               title={disease.name}
  //             />
  //           ))}
  //         </MapView>
  //       </View>

  //       {/* Symptoms Map */}
  //       <View style={[styles.mapContainer, { width: screenWidth }]}>
  //         <MapView
  //           style={[styles.map, {height: dynamicMapHeight}]}
  //           initialRegion={location}
  //         >
  //           {/* Assuming symptoms array is populated similarly */}
  //           {activeMapIndex === 1 && symptoms.map((symptom) => (
  //             <Marker
  //               key={symptom.id}
  //               coordinate={{ latitude: symptom.latitude, longitude: symptom.longitude }}
  //               title={symptom.name}
  //             />
  //           ))}
  //         </MapView>
  //       </View>
  //     </ScrollView>
  //   </SafeAreaView>
  // );


const styles = StyleSheet.create({
  scrollView: {
    // Dynamic height is set inline
  },
  mapContainer: {
    // Width is set inline to take full screen width
    // Height adjustments are now inline, respecting the safe area
  },
  map: {
    // Width and height adjustments are now inline
  },
});

export default HomePage;