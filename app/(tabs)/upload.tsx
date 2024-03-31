import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView, View, Button, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native';
import * as Location from 'expo-location';

const App = () => {
  const [selectedButton, setSelectedButton] = useState(null);
  const [formData, setFormData] = useState({
    dateOfDiagnosis: '',
    modeOfConfirmation: '',
    diagnosisName: '',
    age: '',
    symptoms: '',
    startDate: '',
    endDate: '',
  });
  const [present, setPresent] = useState(false);

  const handleButtonPress = (buttonName) => {
    setSelectedButton(buttonName);
    // Reset form data when switching between Symptoms and Sickness
    setFormData({
      dateOfDiagnosis: '',
      modeOfConfirmation: '',
      diagnosisName: '',
      age: '',
      symptoms: '',
      startDate: '',
      endDate: '',
    });
  };

  const handleInputChange = (fieldName, value) => {
    setFormData(prevState => ({
      ...prevState,
      [fieldName]: value,
    }));
  };

  const handleCheckboxChange = () => {
    setPresent(!present);
    if (!present) {
      // If checkbox is checked (present becomes true), clear 'endDate'
      setFormData(prevState => ({
        ...prevState,
        endDate: '',
      }));
    }
  };

  const getCurrentUserId = async () => {
    // Retrieve user's ID stored in AsyncStorage
    return await AsyncStorage.getItem('userId');
  };

  const getCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.error('Permission to access location was denied');
      return;
    }
    let location = await Location.getCurrentPositionAsync({});
    return location.coords;
  };

  const handleSubmit = async () => {
    try {
      const userId = await getCurrentUserId();
      const location = await getCurrentLocation();
      const authToken = await AsyncStorage.getItem('authToken');

      if (!userId || !location || !authToken) {
        console.error('Missing userId, location, or authToken');
        return;
      }

      let apiEndpoint = selectedButton === 'Symptoms' ? '/submit_symptom' : '/submit_disease';
      let data = {
        user_id: userId,
        location,
        ...formData,
      };

      const response = await fetch(`http://10.26.140.164${apiEndpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();
      if (response.ok) {
        console.log('Submission Successful', responseData);
        // Reset form or navigate to another screen
      } else {
        console.error('Submission Failed', responseData.error);
      }
    } catch (error) {
      console.error('Error in submission', error);
    }
  };

  
return (
  <ScrollView contentContainerStyle={styles.container}>
    <View style={styles.formContainer}>
      <View style={styles.buttonContainer}>
        <Button
          title="Symptoms"
          onPress={() => handleButtonPress('Symptoms')}
          color={selectedButton === 'Symptoms' ? '#4A90E2' : '#ccc'}
        />
        <View style={styles.spacer} />
        <Button
          title="Sickness"
          onPress={() => handleButtonPress('Sickness')}
          color={selectedButton === 'Sickness' ? '#4A90E2' : '#ccc'}
        />
      </View>
      {selectedButton === 'Symptoms' && (
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            onChangeText={(text) => handleInputChange('symptoms', text)}
            value={formData.symptoms}
            placeholder="Symptoms"
            placeholderTextColor="#000000"
          />
          <TextInput
            style={styles.input}
            onChangeText={(text) => handleInputChange('startDate', text)}
            value={formData.startDate}
            placeholder="Start Date (YYYY-MM-DD)"
            placeholderTextColor="#000000"
          />
          <TextInput
            style={styles.input}
            onChangeText={(text) => handleInputChange('endDate', text)}
            value={formData.endDate}
            placeholder="End Date (YYYY-MM-DD)"
            placeholderTextColor="#000000"
            editable={!present}
          />
        </View>
      )}
      {selectedButton === 'Sickness' && (
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            onChangeText={(text) => handleInputChange('dateOfDiagnosis', text)}
            value={formData.dateOfDiagnosis}
            placeholder="Date of Diagnosis (YYYY-MM-DD)"
            placeholderTextColor="#000000"
          />
          <TextInput
            style={styles.input}
            onChangeText={(text) => handleInputChange('modeOfConfirmation', text)}
            value={formData.modeOfConfirmation}
            placeholder="Mode of Confirmation"
            placeholderTextColor="#000000"
          />
          <TextInput
            style={styles.input}
            onChangeText={(text) => handleInputChange('diagnosisName', text)}
            value={formData.diagnosisName}
            placeholder="Name of Diagnosis"
            placeholderTextColor="#000000"
          />
          {/* Additional TextInput for age was not shown for Sickness, but you can add it if needed */}
        </View>
      )}
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  </ScrollView>
);

};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    width: '90%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  spacer: {
    width: 20, // Spacing between buttons
  },
  inputContainer: {
    alignItems: 'center', // Center align text inputs for a cleaner look
  },
  input:{
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: '100%', // Full width of the form container
  },
  submitButton: {
    backgroundColor: '#4A90E2', // A more vibrant color for the submit button
    padding: 15,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center', // Center the text within the button
  },
  submitButtonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default App;
