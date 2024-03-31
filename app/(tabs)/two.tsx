<<<<<<< Updated upstream
import React, { useState, useEffect } from 'react';
import { ScrollView, View, Image, Text, StyleSheet, Dimensions } from 'react-native';
=======
import React, { useState } from 'react';
import { ScrollView, View, Image, Text, StyleSheet, TouchableOpacity, FlatList, Alert } from 'react-native';
>>>>>>> Stashed changes
import MapView from 'react-native-maps';
import Parse from 'parse/react-native'; // Ensure Parse is imported

const ProfilePage = () => {
<<<<<<< Updated upstream
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
          source={require('/Users/jabezagyemang-prempeh/Desktop/midnight-hack/HealthAPPHack/app/(tabs)/tttttt.png')} // Replace with your profile picture source
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

=======
  const [showReports, setShowReports] = useState(false);

  // Dummy data for reports - replace with your actual data
  const reports = [
    { id: '1', name: 'Report 1' },
    { id: '2', name: 'Report 2' },
    // Add more reports here
  ];

  const notifications = [
    { id: '1', title: 'Notification 1', fullMessage: "Warning, There is a rise in malaria in DC with over 50 people in the last 10 days"  },
    { id: '2', title: 'Notification 2', fullMessage: "Warning, There is a rise in malaria in DC with over 50 people in the last 10 days"  },
    { id: '1', title: 'Notification 1', fullMessage: "Warning, There is a rise in malaria in DC with over 50 people in the last 10 days"  },
    { id: '2', title: 'Notification 2', fullMessage: "Warning, There is a rise in malaria in DC with over 50 people in the last 10 days"  },
   
    // Add more notifications here
  ];

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header Image */}
      <Image
        source={require('./pathway.jpg')} // Replace with your header image source
        style={styles.headerImage}
      />

      {/* User Information */}
      <View style={styles.userInfo}>
        <Text style={styles.emailText}>example@email.com</Text>
        <Text style={styles.nameText}>John Doe</Text>
      </View>

      {/* Recent Analysis Header */}
      <Text style={styles.recentAnalysisHeader}>Recent Analysis</Text>

>>>>>>> Stashed changes
      {/* Maps */}
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          initialRegion={{
<<<<<<< Updated upstream
            latitude: 38.89511, // Example coordinates for Washington, DC
=======
            latitude: 38.89511,
>>>>>>> Stashed changes
            longitude: -77.03637,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
<<<<<<< Updated upstream
      </View>

      <View style={styles.mapContainer}>
        <MapView style={styles.map} />
      </View>

      {/* Right-aligned Text */}
      <View style={styles.rightAlignedTextContainer}>
        <Text style={styles.rightAlignedText}>Some text aligned to the right</Text>
=======
>>>>>>> Stashed changes
      </View>
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 38.89511,
            longitude: -77.03637,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
      </View>

      {/* View All Button */}
      <TouchableOpacity style={styles.viewAllButton} onPress={() => setShowReports(!showReports)}>
        <Text>View All</Text>
      </TouchableOpacity>

      {/* Conditional Rendering for Reports */}
      {showReports && (
        <FlatList
          data={reports}
          renderItem={({ item }) => (
            <View style={styles.reportCard}>
              <Text style={styles.reportText}>{item.name}</Text>
            </View>
          )}
          keyExtractor={item => item.id}
        />
      )}

      {/* Notifications Always Visible */}
<Text style={styles.notificationsHeader}>Notifications</Text>
<ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.notificationsContainer}>
  {notifications.map((item) => (
    <TouchableOpacity
      key={item.id}
      style={styles.notificationCard}
      onPress={() => Alert.alert(item.title, item.fullMessage)} // Assuming each notification has a fullMessage field
    >
      <Text>{item.title}</Text>
    </TouchableOpacity>
  ))}
</ScrollView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  // Add to your StyleSheet.create({}) call
notificationsContainer: {
  flexDirection: 'row', // Ensures items are laid out horizontally
  marginBottom: 20,
  marginRight: 10,
},
notificationCard: {
  backgroundColor: '#e7e7e7',
  width: '50%',
  padding: 20,
  borderRadius: 10,
  marginRight: 10, // Adds spacing between cards
},

  container: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 20,
  },
<<<<<<< Updated upstream
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
=======
  headerImage: {
    width: '100%',
    height: 200,
    marginBottom: 20,
  },
  userInfo: {
    alignItems: 'center',
>>>>>>> Stashed changes
    marginBottom: 20,
  },
  emailText: {
    fontSize: 16,
<<<<<<< Updated upstream
    marginBottom: 5,
=======
>>>>>>> Stashed changes
  },
  nameText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  recentAnalysisHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
<<<<<<< Updated upstream
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
=======
  mapContainer: {
    height: 200,
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 20,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  viewAllButton: {
    alignItems: 'flex-end',
>>>>>>> Stashed changes
    marginBottom: 20,
  },
  reportCard: {
    backgroundColor: '#f0f0f0',
    padding: 20,
    borderRadius: 10,
    marginBottom: 10,
  },
  reportText: {
    fontSize: 16,
  },
  notificationsHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  
  // Add any additional styles you need
});

export default ProfilePage;
