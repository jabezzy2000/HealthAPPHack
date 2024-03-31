// import { StyleSheet } from 'react-native';

// import EditScreenInfo from '@/components/EditScreenInfo';
// import { Text, View } from '@/components/Themed';

// export default function TabOneScreen() {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Tab One</Text>
//       <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
//       <EditScreenInfo path="app/(tabs)/index.tsx" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
//   separator: {
//     marginVertical: 30,
//     height: 1,
//     width: '80%',
//   },
// });

import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import MapView from 'react-native-maps';

const HomePage = () => {
  return (
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapContainer: {
    flex: 1, // Adjust flex values to change the height proportion
  },
  map: {
    width: '100%',
    height: '100%',
  },
  diseasesContainer: {
    flex: 1,
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
    flex: 2,
  },
  newsItem: {
    margin: 10,
    backgroundColor: '#f0f0f0',
    padding: 20,
    borderRadius: 10,
  },
});

export default HomePage;

