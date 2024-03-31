import React, { useState, useEffect } from 'react';
import Parse from 'parse/react-native.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView, View, Button, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native';
import * as Location from 'expo-location';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import { Alert } from 'react-native';

Parse.setAsyncStorage(AsyncStorage);
Parse.initialize("gnQ5OLyRrsSME4wp1F6c1iVa6x5HD5IKIMY2MMBG", "x2KL2OTnMjOhzSXgQJBpxyDq3nTDFEzWMMN7chMX");
Parse.serverURL = 'https://parseapi.back4app.com/';


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
  const [userType, setUserType] = useState(null); 

  useEffect(() => {
    const fetchUserType = async () => {
      const currentUser = Parse.User.current();
      if (currentUser) {
        // Assuming the user type can be fetched like this; you may need to adjust based on your schema
        setUserType(currentUser.get("userType")); 
      }
    };

    fetchUserType();
  }, []);

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

  const getCurrentUserId = () => {
    const currentUser = Parse.User.current();
    if (currentUser) {
      return currentUser.id;
    } else {
      return null; // No user is currently logged in
    }
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

  
  const handleFileUpload = async () => {
    const result = await DocumentPicker.getDocumentAsync({});
  
    if (result.type === 'success') {
      // Read the File Content
      const fileContent = await FileSystem.readAsStringAsync(result.uri);
  
      // Send to your Flask API
      try {
        const response = await fetch('http://<your-api-url>/compute', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({content: fileContent}),
        });
  
        const jsonResponse = await response.json();
        console.log("Computed Results from API:", jsonResponse);
  
        // Handle the computed results as needed
        Alert.alert('Computation Complete', `Computed result: ${jsonResponse.result}`);
      } catch (error) {
        console.error("Failed to send data to API:", error);
        Alert.alert('Error', 'Failed to process file.');
      }
        console.log(result);
  
        // Example variables - replace these with actual values from your app context
        const userId = "exampleUserId";
        const authToken = "exampleAuthToken";
        const apiEndpoint = '/compute'; // Endpoint for your Python API
  
        
        const textContent = await fileContent.text();
  
        // Convert CSV text to JSON array
        // This requires a CSV parsing function, like one you might write yourself or get from a library
        const jsonData = parseCsvToJson(textContent); // You need to implement this function or use a CSV parsing library
  
        // Prepare data for the API
        let data = jsonData.map(entry => ({
            ...entry,
            user_id: userId, // Assuming you want to attach the user ID to each entry
            // Add other necessary transformations if needed
        }));
  
        // Send processed data to the API
        try {
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
                Alert.alert('Data Processed', responseData.message);
            } else {
                console.error('Failed to process file', responseData.error);
                Alert.alert('Error', 'Failed to process the file.');
            }
        } catch (error) {
            console.error('There was a problem with your fetch operation:', error);
            Alert.alert('Error', 'There was a problem uploading your file.');
        }
    } else if (result.type === 'cancel') {
        Alert.alert('Cancelled', 'File selection was cancelled.');
    } else {
        Alert.alert('Error', 'An unexpected error occurred.');
    }
  };
  
  function parseCsvToJson(csvText) {
    // Split the text into lines
    const lines = csvText.trim().split('\n');

    // Extract headers
    const headers = lines.shift().split(',');

    // Map each line to a JSON object
    const jsonData = lines.map(line => {
        const values = line.split(',');
        return headers.reduce((obj, header, index) => {
            obj[header] = values[index];
            return obj;
        }, {});
    });

    return jsonData;
}

  // const handleSubmit = async () => {
  //   try {
  //     const userId = await getCurrentUserId();
  //     const location = await getCurrentLocation();
  //     const authToken = await AsyncStorage.getItem('authToken');

  //     if (!userId || !location || !authToken) {
  //       console.error('Missing userId, location, or authToken');
  //       return;
  //     }

  //     let apiEndpoint = selectedButton === 'Symptoms' ? '/submit_symptom' : '/submit_disease';
  //     let data = {
  //       user_id: userId,
  //       location,
  //       ...formData,
  //     };

  //     const response = await fetch(`http://10.26.140.164${apiEndpoint}`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Authorization': `Bearer ${authToken}`,
  //       },
  //       body: JSON.stringify(data),
  //     });

  //     const responseData = await response.json();
  //     if (response.ok) {
  //       console.log('Submission Successful', responseData);
  //       // Reset form or navigate to another screen
  //     } else {
  //       console.error('Submission Failed', responseData.error);
  //     }
  //   } catch (error) {
  //     console.error('Error in submission', error);
  //   }
  // };

  const handleSubmit = async () => {
    try {
      if (userType === 'Individual') {
        const currentUser = Parse.User.current();
        if (!currentUser) {
          console.error('No user is currently logged in');
          return;
        }
        
        const location = await getCurrentLocation();
        if (!location) {
          console.error('Failed to get location');
          return;
        }
        const locationGeoPoint = new Parse.GeoPoint(location.latitude, location.longitude);
        
        let objectsToSave = [];
  
        // Define the array to hold pointers to the saved objects for the uploads field
        let uploadsPointers = [];
  
        if (selectedButton === 'Symptoms') {
          const symptomsArray = formData.symptoms.split(',');
          symptomsArray.forEach(symptom => {
            const Symptoms = Parse.Object.extend("Symptoms");
            const symptomObj = new Symptoms();
            
            symptomObj.set("symptom", symptom.trim());
            symptomObj.set("location", locationGeoPoint);
            symptomObj.set("start_date", formData.startDate);
            symptomObj.set("end_date", formData.endDate);
            symptomObj.set("user", currentUser); // Directly associating the user
            
            objectsToSave.push(symptomObj);
          });
        } else if (selectedButton === 'Sickness') {
          const Disease = Parse.Object.extend("Disease");
          const diseaseObj = new Disease();
          
          diseaseObj.set("Disease_Name", formData.diagnosisName);
          diseaseObj.set("modeOfConfirmation", formData.modeOfConfirmation);
          diseaseObj.set("location", locationGeoPoint);
          diseaseObj.set("user", currentUser); // Directly associating the user
          
          objectsToSave.push(diseaseObj);
        }
  
        // Save all objects to Parse in one batch operation
        const savedObjects = await Parse.Object.saveAll(objectsToSave);
        
        // Collect pointers to the saved objects
        savedObjects.forEach(obj => uploadsPointers.push(obj.toPointer()));
  
        // Append new object pointers to the existing uploads array
        currentUser.addUnique("uploads", uploadsPointers);
        await currentUser.save();
  
        console.log('Submission Successful');
        
        // Reset form
        setFormData({
          dateOfDiagnosis: '',
          modeOfConfirmation: '',
          diagnosisName: '',
          age: '',
          symptoms: '',
          startDate: '',
          endDate: '',
        });
        setSelectedButton(null);
        
        // Show success message
        Alert.alert('Success', 'Your submission has been successful.');
      } else {
        console.log('User type is not Individual. Skipping Parse submission.');
      }
    } catch (error) {
      console.error('Error in submission:', error);
      Alert.alert('Error', 'Failed to submit your data. Please try again.');
    }
  };
  
  
  

 


const renderContentBasedOnUserType = () => {
  if (userType === 'Individual') {
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
                  <TextInput
                  style={styles.input}
                  onChangeText={(text) => handleInputChange('age', text)}
                  value={formData.age}
                  placeholder="Current Age"
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
                  <TextInput
                  style={styles.input}
                  onChangeText={(text) => handleInputChange('age', text)}
                  value={formData.age}
                  placeholder="Current Age"
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
  } else {
    // Design for non-individual users to upload a file
    return (
      <View style={styles.container}>
        <Text style={styles.uploadInstruction}>Please upload your file:</Text>
        <TouchableOpacity onPress={handleFileUpload} style={styles.uploadButton}>
          <Text style={styles.uploadButtonText}>Upload File</Text>
        </TouchableOpacity>
      </View>
    );
  }
};

return renderContentBasedOnUserType();
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
  uploadInstruction: {
    fontSize: 16,
    marginBottom: 20,
  },
  uploadButton: {
    backgroundColor: '#4A90E2',
    padding: 10,
    borderRadius: 5,
  },
  uploadButtonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default App;
