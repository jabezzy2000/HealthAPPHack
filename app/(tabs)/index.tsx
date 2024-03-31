import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, ScrollView } from 'react-native';
import MapView from 'react-native-maps';

const HomePage = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.mapContainer}>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: 38.89511, // Example coordinates for Washington, DC
              longitude: -77.03637,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          />
        </View>
        <View style={styles.diseasesContainer}>
          <Text style={styles.diseasesTitle}>Most prevalent in Washington, DC</Text>
          <View style={styles.diseaseList}>
            <Text>HIV</Text><Text>COVID</Text>
            <Text>Cholera</Text><Text>Malaria</Text>
          </View>
        </View>
        <ScrollView style={styles.newsContainer}>
          <Text style={styles.newsItem}>News Item 1</Text>
          <Text style={styles.newsItem}>News Item 2</Text>
          {/* Add more sample news items here */}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff', // or any desired background color
  },
  container: {
    flex: 1,
  },
  mapContainer: {
    height: '30%', // Increased from 25% to 30% for more length
    borderRadius: 20, // Adds rounded corners
    overflow: 'hidden', // Ensures the map view respects the container's borderRadius
    margin: 10, // Optional: adds some margin around the map for spacing
  },
  map: {
    width: '100%',
    height: '100%',
  },
  diseasesContainer: {
    flex: 1, // Adjust if necessary
    padding: 10,
  },
  diseasesTitle: {
    fontWeight: 'bold',
  },
  diseaseList: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  newsContainer: {
    flex: 2, // Adjust if necessary
  },
  newsItem: {
    margin: 10,
    backgroundColor: '#f0f0f0',
    padding: 20,
    borderRadius: 10,
  },
});

export default HomePage;
