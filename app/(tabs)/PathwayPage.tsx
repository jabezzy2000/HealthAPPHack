import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, Image, ScrollView, StyleSheet, SafeAreaView  } from 'react-native';

interface Suggestion {
  id: number;
  text: string;
  completed: boolean;
}

const initialSuggestions: Suggestion[] = [
  { id: 1, text: "Initial Diagnosis", completed: false },
  { id: 2, text: "Consult Specialist", completed: false },
  { id: 3, text: "Lab Tests Required", completed: false },
  { id: 4, text: "Review Medication Plan", completed: false },
  { id: 5, text: "Schedule Follow-up Appointment", completed: false },
  { id: 6, text: "Consider Lifestyle Changes", completed: false },
  { id: 7, text: "Physical Therapy Sessions", completed: false },
  { id: 8, text: "Mental Health Evaluation", completed: false },
  { id: 9, text: "Dietary Adjustments", completed: false },
  { id: 10, text: "Home Care Instructions", completed: false },
  // Add more suggestions here
];

export default function PathwayPage() {
  const [suggestions, setSuggestions] = useState<Suggestion[]>(initialSuggestions);

  const handlePress = (suggestion: Suggestion) => {
    Alert.alert(
      suggestion.completed ? "Not completed your milestone?" : "Complete Step?",
      suggestion.completed ? "Mark this step as not completed?" : "Did you complete this step?",
      [
        { text: "No" },
        { text: "Yes", onPress: () => toggleCompletion(suggestion.id) },
      ]
    );
  };

  const toggleCompletion = (id: number) => {
    setSuggestions(suggestions.map(suggestion => {
      if (suggestion.id === id) {
        return { ...suggestion, completed: !suggestion.completed };
      }
      return suggestion;
    }));
  };

  return (
    <SafeAreaView style={{ flex: 1 }} >
      <View style={{ flex: 1 }}>
        <Image
          source={require('./pathway.jpg')} // Replace with your actual image source
          style={styles.headerImage}
        />
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerTitle}>Here are some AI generated Ideas you should consider.</Text>
          <Text style={styles.headerSubtitle}>These suggestions are made based on thousands of data from individuals around you.</Text>
        </View>
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {suggestions.map(suggestion => (
            <TouchableOpacity
              key={suggestion.id}
              onPress={() => handlePress(suggestion)}
              style={[styles.card, suggestion.completed ? styles.cardCompleted : null]}
            >
              <Text style={styles.cardText}>{suggestion.text}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    width: '100%',
    height: 300,
    padding: 10,
    position: 'absolute',
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
  },
  scrollView: {
    marginTop: 220, // Adjust this value based on the height of your header
  },
  card: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    marginHorizontal: 20,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardCompleted: {
    backgroundColor: 'lightgreen',
  },
  cardText: {
    fontSize: 18,
  },
  headerTextContainer: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
  },
  headerTitle: {
    color: 'black',
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    color: 'black',
    fontSize: 16,
    marginTop: 8,
    fontWeight: 'bold',
  },
});