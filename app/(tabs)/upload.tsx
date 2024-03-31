import React, { useState } from 'react';
import { View, Button, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native';

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
    // Clear existing form data when changing selection
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
    if (present) {
      handleInputChange('endDate', ''); // Reset end date when present checkbox is unchecked
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button
          title="Symptoms"
          onPress={() => handleButtonPress("Symptoms")}
          color={selectedButton === "Symptoms" ? "blue" : null}
        />
        <Button
          title="Sickness"
          onPress={() => handleButtonPress("Sickness")}
          color={selectedButton === "Sickness" ? "blue" : null}
        />
      </View>
      {selectedButton === "Symptoms" && (
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Age"
            keyboardType="numeric"
            value={formData.age}
            onChangeText={(text) => handleInputChange('age', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Start Date"
            value={formData.startDate}
            onChangeText={(text) => handleInputChange('startDate', text)}
          />
          <TextInput
            style={[styles.input, { opacity: present ? 0.5 : 1 }]}
            placeholder="End Date"
            value={formData.endDate}
            onChangeText={(text) => handleInputChange('endDate', text)}
            editable={!present}
          />
          <View style={styles.checkboxContainer}>
            <TouchableOpacity onPress={handleCheckboxChange} style={styles.checkbox}>
              {present && <Text>✓</Text>}
            </TouchableOpacity>
            <Text>Present</Text>
          </View>
        </View>
      )}
      {selectedButton === "Sickness" && (
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Date of Diagnosis"
            value={formData.dateOfDiagnosis}
            onChangeText={(text) => handleInputChange('dateOfDiagnosis', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Mode of Confirmation"
            value={formData.modeOfConfirmation}
            onChangeText={(text) => handleInputChange('modeOfConfirmation', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Name of Diagnosis"
            value={formData.diagnosisName}
            onChangeText={(text) => handleInputChange('diagnosisName', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Your Age"
            keyboardType="numeric"
            value={formData.age}
            onChangeText={(text) => handleInputChange('age', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Symptoms"
            value={formData.symptoms}
            onChangeText={(text) => handleInputChange('symptoms', text)}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  inputContainer: {
    width: '80%',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
