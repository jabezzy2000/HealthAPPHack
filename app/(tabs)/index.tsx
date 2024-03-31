import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, StyleSheet, ScrollView, Dimensions, TouchableOpacity, Linking  } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
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
  Disease_name: string; // Ensure this matches the properties you use
}

interface Symptom {
  id: string;
  latitude: number;
  longitude: number;
  symptom: string; // Ensure this matches the properties you use
}


const HomePage = () => {
  const insets = useSafeAreaInsets();
  const screenWidth = Dimensions.get('window').width;
  // Adjust the map's height dynamically based on safe area insets
  const dynamicMapHeight = (Dimensions.get('window').height - insets.top - insets.bottom) * 0.5;
  


   // Example disease names and colors
   const diseaseNames = [
    { name: 'Malaria', color: '#FF6347' },
    { name: 'COVID-19', color: '#1E90FF' },
    { name: 'Tuberculosis', color: '#32CD32' },
    { name: 'Diabetes', color: '#FFD700' },
    { name: 'Hypertension', color: '#FF69B4' },
  ];

  // News briefings data - replace URLs with actual article links
  const newsBriefings = [
    { title: 'Latest Developments on Malaria', url: 'http://example.com/malaria' },
    { title: 'COVID-19: What You Need to Know', url: 'http://example.com/covid' },
    // Add more news briefings as needed
  ];

  // Overview data
  const overviewStats = [
    { label: 'Total Diseases Tracked', count: 120 },
    { label: 'Symptoms Reported', count: 450 },
    // Add more statistics as needed
  ];




  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  } | undefined>(undefined);
  const [activeMapIndex, setActiveMapIndex] = useState(0); // 0 for diseases, 1 for symptoms
  const [diseases, setDiseases] = useState<Disease[]>([]);
  const [symptoms, setSymptoms] = useState<Symptom[]>([]); // Use the Symptom interface for the state
  

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

  useEffect(() => {
    const fetchDiseases = async () => {
      const Disease = Parse.Object.extend("Disease");
      const query = new Parse.Query(Disease);
      try {
        const results = await query.find();
        const mappedResults = results.map(d => {
          const location = d.get("location");
          if (!location) {
            console.warn(`Disease object with id ${d.id} does not have location.`);
            return null; // Return null for now and filter it out later
          }
          return {
            id: d.id,
            latitude: location.latitude,
            longitude: location.longitude,
            name: d.get("Disease_name"),
          };
        }).filter(Boolean); // Filter out any null entries due to missing location
    
        console.log("Fetched Diseases:", mappedResults); // Log the diseases data
        setDiseases(mappedResults);
      } catch (error) {
        console.error('Error fetching diseases:', error);
      }
    };
    

    const fetchSymptoms = async () => {
      const Symptom = Parse.Object.extend("Symptom");
      const query = new Parse.Query(Symptom);
      try {
        const results = await query.find();
        const mappedResults = results.map(s => {
          const location = s.get("location");
          if (!location) {
            console.warn(`Symptom object with id ${s.id} does not have location.`);
            return null; // Handle missing location
          }
          return {
            id: s.id,
            latitude: location.latitude,
            longitude: location.longitude,
            name: s.get("symptom"), // Assuming you have a 'name' field in your Parse class
            color: getColorForDisease(index), 
          };
        }).filter(Boolean);// Ensure no null entries
    
        console.log("Fetched Symptoms:", mappedResults); // Log the fetched symptoms data
        setSymptoms(mappedResults); // Update state with the fetched data
      } catch (error) {
        console.error('Error fetching symptoms:', error);
      }
    };
    

    if (activeMapIndex === 0) {
      fetchDiseases();
    } else {
      fetchSymptoms();
    }
  }, [activeMapIndex]);

  function getColorForDisease(index) {
    const colors = ['#FF6347', '#1E90FF', '#32CD32', '#FFD700', '#FF69B4'];
    return colors[index % colors.length];
  }


  return (
    <SafeAreaView style={{ flex: 1}}>
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
<View style={[styles.mapContainer, { width: screenWidth,  borderRadius: 20, overflow: 'hidden' }]}>
  <MapView
    style={[styles.map, {height: dynamicMapHeight}]}
    initialRegion={location}
  >
    
    {activeMapIndex === 0 && diseases.map((disease) => (
  <Marker
    key={disease.id}
    coordinate={{ latitude: disease.latitude, longitude: disease.longitude }}
  >
    <Callout tooltip style={styles.customCallout}>
      <View style={styles.calloutView}>
        <Text style={styles.calloutTitle}>{disease.Disease_name}</Text>
        {/* Add any additional information you want to include in the callout */}
      </View>
    </Callout>
  </Marker>
))}

  </MapView>
</View>

{/* Symptoms Map with rounded edges */}
<View style={[styles.mapContainer, { width: screenWidth, borderRadius: 20, overflow: 'hidden' }]}>
  <MapView
    style={[styles.map, {height: dynamicMapHeight}]}
    initialRegion={location}
  >
   {activeMapIndex === 1 && symptoms.map((symptom) => (
  <Marker
    key={symptom.id}
    coordinate={{ latitude: symptom.latitude, longitude: symptom.longitude }}
  >
    <Callout tooltip style={styles.customCallout}>
      <View style={styles.calloutView}>
        <Text style={styles.calloutTitle}>{symptom.symptom}</Text>
        {/* Add any additional information you want to include in the callout */}
      </View>
    </Callout>
  </Marker>
))}
  </MapView>
</View>
</ScrollView>

{/* Displaying disease names */}
<View style={styles.diseaseContainer}>
          {diseases.map((disease, index) => (
            <Text key={index} style={[styles.diseaseName, { color: disease.color }]}>{disease.name}</Text>
          ))}
        </View>

        {/* News Briefings Section */}
        <Text style={styles.sectionHeader}>News Briefings</Text>
        {newsBriefings.map((news, index) => (
          <TouchableOpacity key={index} style={styles.newsItem} onPress={() => Linking.openURL(news.url)}>
            <Text style={styles.newsTitle}>{news.title}</Text>
          </TouchableOpacity>
        ))}

        {/* Overview Stats Section */}
        <Text style={styles.sectionHeader}>Overview</Text>
        <View style={styles.overviewContainer}>
          {overviewStats.map((stat, index) => (
            <View key={index} style={styles.statCard}>
              <Text style={styles.statCount}>{stat.count}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>
      
    </SafeAreaView>
  );
};



 
const styles = StyleSheet.create({
  scrollView: {
    // Dynamic height is set inline
  },
  mapContainer: {
    // Width is set inline to take full screen width
    // Height adjustments are now inline, respecting the safe area
  },
  diseaseContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
  },
  diseaseName: {
    fontSize: 10,
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    marginRight:10,
    justifyContent: 'space-around',
  },
  newsItem: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    marginHorizontal: 20,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    }
  },
  newsTitle: {
    fontSize: 16,
    color: '#0000ff',
    textDecorationLine: 'underline',
  },
  overviewContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 10,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    }
  },
  statCount: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 16,
  },
  map: {
    // Width and height adjustments are now inline
  },
  customCallout: {
    // This style can be adjusted or might not be needed depending on your overall design
  },
  calloutView: {
    width: 220, // Adjust based on your content needs
    padding: 10,
    borderRadius: 6,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 3,
  },
  calloutTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  calloutDescription: {
    fontSize: 14,
    marginTop: 5,
  },
  calloutNote: {
    fontSize: 12,
    marginTop: 5,
    fontStyle: 'italic',
  },
});

export default HomePage;


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