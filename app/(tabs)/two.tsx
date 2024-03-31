import React, { useState, useEffect } from 'react';
import { ScrollView, View, Image, Text, StyleSheet, Dimensions } from 'react-native';
import MapView from 'react-native-maps';
import Parse from 'parse/react-native'; // Ensure Parse is imported

const ProfilePage = () => {
  // Assuming you have a state for the user's information
  const [user, setUser] = useState({ email: 'example@email.com', username: 'John Doe' });

  useEffect(() => {
    // Fetch and set the user information here
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Profile Picture */}
      <View style={styles.profilePicContainer}>
        <Image
          source={require('./pathway.jpg')} // Replace with your profile picture source
          style={styles.profilePicture}
        />
      </View>

      {/* User Information */}
      <View style={styles.userInfoSection}>
        <Text style={styles.emailText}>{user.email}</Text>
        <Text style={styles.nameText}>{user.username}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.headerText}>Profile</Text>
      </View>

      {/* Recent Analysis Header */}
      <View style={styles.section}>
        <Text style={styles.recentAnalysisHeader}>Recent Analysis</Text>
      </View>

      {/* Maps */}
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

      <View style={styles.mapContainer}>
        <MapView style={styles.map} />
      </View>

      {/* Right-aligned Text */}
      <View style={styles.rightAlignedTextContainer}>
        <Text style={styles.rightAlignedText}>Some text aligned to the right</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 20,
  },
  profilePicContainer: {
    marginBottom: 20,
  },
  profilePicture: {
    width: 120,
    height: 120,
    borderRadius: 60, // Make the image rounded
  },
  userInfoSection: {
    alignItems: 'center', // Center align the user information
    marginBottom: 20,
  },
  emailText: {
    fontSize: 16,
    marginBottom: 5,
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
  section: {
    width: '100%', // Ensure the content uses full width available
    alignItems: 'center', // Center align content
    marginBottom: 20,
  },
  mapContainer: {
    width: Dimensions.get('window').width - 40, // Subtract horizontal paddings
    height: 200,
    borderRadius: 20,
    overflow: 'hidden', // Ensure the map respects the container's borderRadius
    marginBottom: 20,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  rightAlignedTextContainer: {
    alignSelf: 'flex-end', // Align the container to the right
    marginBottom: 20,
  },
  rightAlignedText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProfilePage;
