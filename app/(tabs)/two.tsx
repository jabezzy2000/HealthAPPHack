import React from 'react';
import { ScrollView, View, Image, Text, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';

const ProfilePage = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Profile Picture */}
      <Image
        source={require('./profile-picture.jpg')} // Replace with your profile picture source
        style={styles.profilePicture}
      />

      {/* User Information */}
      <Text style={styles.emailText}>example@email.com</Text>
      <Text style={styles.nameText}>John Doe</Text>
      <Text style={styles.headerText}>Profile</Text>

      {/* Map Views */}
      <View style={styles.mapContainer}>
        <MapView style={styles.map} />
        <MapView style={styles.map} />
      </View>

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
  mapContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  map: {
    width: '48%', // Adjust as needed
    aspectRatio: 1,
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
