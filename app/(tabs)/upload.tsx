import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView, View, Button, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native';
import Geolocation from 'react-native-geolocation-service';


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
    setFormData({
      ...formData,
      [fieldName]: value,
    });
  };

  const handleCheckboxChange = () => {
    setPresent(!present);
    if (!present) { // Check if changing to present, clear 'endDate'
      handleInputChange('endDate', '');
    }
  };

  const handleSubmit = async () => {
    try {
      // Fetch user ID and location as before
      const userId = await getCurrentUserId();
      const location = await getCurrentLocation();
      const authToken = await AsyncStorage.getItem('authToken');
  
      let apiEndpoint;
      let data;
  
      if (selectedButton === 'Symptoms') {
        apiEndpoint = '/submit_symptom';
        data = {
          user_id: userId,
          name: formData.symptoms, // Assuming 'name' represents the symptoms described
          description: '', // Add any additional details if necessary
          location: location, // Structure this based on your backend requirements
        };
      } else if (selectedButton === 'Sickness') {
        apiEndpoint = '/submit_disease';
        data = {
          user_id: userId,
          name: formData.diagnosisName,
          description: formData.modeOfConfirmation, // Using modeOfConfirmation as description here
          location: location,
          // Add other disease-specific fields as necessary
        };
      } else {
        console.error('No selected button.');
        return; // Early return if no button is selected
      }
  
      const response = await fetch(`http://10.26.140.164${apiEndpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`, // Ensure you have the auth token available
        },
        body: JSON.stringify(data),
      });
  
      const responseData = await response.json();
      if (response.ok) {
        console.log('Submission Successful', responseData);
        // Handle successful submission
      } else {
        console.error('Submission Failed', responseData.error);
        // Handle submission failure
      }
    } catch (error) {
      console.error('Error in submission', error);
      // Handle other errors
    }
  };
  

  // const handleSubmit = async () => {
  //   try {
  //     const userId = await getCurrentUserId(); 
  //     const location = await getCurrentLocation(); 
  
  //     // Set the API endpoint based on the selected button
  //     let apiEndpoint;
  //     if (selectedButton === 'Symptoms') {
  //       apiEndpoint = '/submit_symptom';
  //     } else if (selectedButton === 'Sickness') {
  //       apiEndpoint = '/submit_disease';
  //     } else {
  //       console.error('No selected button.');
  //       return; // Early return if no button is selected
  //     }
  
  //     // Prepare the data object based on the form data and selected button
  //     const data = {
  //       user_id: userId,
  //       // Assuming the structure for both disease and symptom submission is similar
  //       name: selectedButton === 'Symptoms' ? formData.symptoms : formData.diagnosisName,
  //       description: formData.modeOfConfirmation, // Example field
  //       location: location, // Assuming you're submitting location as an object
  //     };
  
  //     // Make the API call
  //     const response = await fetch(`http://yourapi.com${apiEndpoint}`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Authorization': `Bearer ${yourAuthToken}`, // Ensure you have the auth token available
  //       },
  //       body: JSON.stringify(data),
  //     });
  
  //     const responseData = await response.json();
  //     if (response.ok) {
  //       console.log('Submission Successful', responseData);
  //       // Handle successful submission (e.g., show a message or navigate to a different screen)
  //     } else {
  //       console.error('Submission Failed', responseData.error);
  //       // Handle failure (e.g., show an error message to the user)
  //     }
  //   } catch (error) {
  //     console.error('Error in submission', error);
  //     // Handle other errors, such as network issues or JSON parsing errors
  //   }
  // };
  

  const getCurrentUserId = () => {
    // This example assumes you have the user's ID stored in AsyncStorage after they log in
    return AsyncStorage.getItem('userId');
    // Make sure to handle the promise returned by getItem in your code
  };

  const getCurrentLocation = () => {
    return new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(
        (position) => {
          resolve(position.coords);
        },
        (error) => {
          reject(error);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    });
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
