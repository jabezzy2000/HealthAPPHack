import React from 'react';
import { ScrollView, View, Image, Text, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';

const ProfilePage = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Profile Picture */}
      <Image
        source={require('./tttttt.png')} // Replace with your profile picture source
        style={styles.profilePicture}
      />

      {/* User Information */}
      <Text style={styles.emailText}>example@email.com</Text>
      <Text style={styles.nameText}>John Doe</Text>
      <Text style={styles.headerText}>Profile</Text>

      {/* Recent Analysis */}
      <Text style={styles.recentAnalysisHeader}>Recent Analysis</Text>

      {/* First Map */}
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

      {/* Second Map */}
      <MapView style={styles.map} />

      {/* Text Aligned to the Right */}
      <View style={styles.rightAlignedTextContainer}>
        <Text style={styles.rightAlignedText}>Some text aligned to the right</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
  },
  mapContainer: {
    height: '30%', // Increased from 25% to 30% for more length
    borderRadius: 20, // Adds rounded corners
    overflow: 'hidden', // Ensures the map view respects the container's borderRadius
    margin: 10, // Optional: adds some margin around the map for spacing
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  emailText: {
    fontSize: 16,
    marginBottom: 10,
  },
  nameText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  recentAnalysisHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  map: {
    width: '100%', // Take full width
    aspectRatio: 1, // Maintain aspect ratio
    marginBottom: 20, // Add margin between maps
  },
  rightAlignedTextContainer: {
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  rightAlignedText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProfilePage;
