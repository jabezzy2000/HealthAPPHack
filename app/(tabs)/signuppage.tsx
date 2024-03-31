import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';

type UserType = 'Health Organization' | 'Government Organization' | 'Private Organization' | 'Individual';

const AuthScreen = () => {
  const [isSignUp, setIsSignUp] = useState(true);
  const [userType, setUserType] = useState<UserType | undefined>(undefined);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleAuth = () => {
    // Placeholder for sign-up or sign-in logic
    console.log(userType, username, email, password);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{isSignUp ? 'Sign Up' : 'Sign In'}</Text>
      {isSignUp && (
        <Picker
          selectedValue={userType}
          onValueChange={(itemValue) => setUserType(itemValue as UserType)}
          style={styles.input}>
          <Picker.Item label="Select User Type" value={undefined} />
          <Picker.Item label="Health Organization" value="Health Organization" />
          <Picker.Item label="Government Organization" value="Government Organization" />
          <Picker.Item label="Private Organization" value="Private Organization" />
          <Picker.Item label="Individual" value="Individual" />
        </Picker>
      )}
      <TextInput
        style={styles.input}
        placeholder={isSignUp ? "Username" : "Username or Email"}
        value={username}
        onChangeText={setUsername}
      />
      {isSignUp && (
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
      )}
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.button} onPress={handleAuth}>
        <Text style={styles.buttonText}>{isSignUp ? 'Sign Up' : 'Sign In'}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.switchButton}
        onPress={() => setIsSignUp(!isSignUp)}>
        <Text style={styles.buttonText}>{isSignUp ? 'Switch to Sign In' : 'Switch to Sign Up'}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    fontSize: 18,
    borderRadius: 6,
  },
  picker: {
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 6,
  },
  button: {
    backgroundColor: 'blue',
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 10,
  },
  switchButton: {
    backgroundColor: 'gray',
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default AuthScreen;
