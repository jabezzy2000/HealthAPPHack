import React, { useState } from 'react';
import { ScrollView, View, Image, Text, StyleSheet, TouchableOpacity, FlatList, Alert } from 'react-native';
import MapView from 'react-native-maps';

const ProfilePage = () => {
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
        <Text style={styles.emailText}>Theo@email.com</Text>
        <Text style={styles.nameText}>Theo</Text>
      </View>

      {/* Recent Analysis Header */}
      <Text style={styles.recentAnalysisHeader}>Recent Analysis</Text>

      {/* Maps */}
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
    padding: 20,
  },
  headerImage: {
    width: '100%',
    height: 200,
    marginBottom: 20,
  },
  userInfo: {
    alignItems: 'center',
    marginBottom: 20,
  },
  emailText: {
    fontSize: 16,
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
