import 'react-native-get-random-values';
import React, { useState } from 'react';
import * as Keychain from 'react-native-keychain';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook
import { AuthScreenNavigationProp } from './navigationTypes'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Parse from 'parse/react-native';



// //Before using the SDK...
// Parse.setAsyncStorage(AsyncStorage);
//     //Paste below the Back4App Application ID AND the JavaScript KEY
// Parse.initialize('gnQ5OLyRrsSME4wp1F6c1iVa6x5HD5IKIMY2MMBG', 'x2KL2OTnMjOhzSXgQJBpxyDq3nTDFEzWMMN7chMX');
//     //Point to Back4App Parse API address 
// Parse.serverURL = 'https://parseapi.back4app.com/'

type UserType = 'Health Organization' | 'Government Organization' | 'Private Organization' | 'Individual';
Parse.setAsyncStorage(AsyncStorage);
Parse.initialize("gnQ5OLyRrsSME4wp1F6c1iVa6x5HD5IKIMY2MMBG", "x2KL2OTnMjOhzSXgQJBpxyDq3nTDFEzWMMN7chMX");
Parse.serverURL = 'https://parseapi.back4app.com/';



const AuthScreen = () => {
  const navigation = useNavigation<AuthScreenNavigationProp>(); // Initialize useNavigation hook

  const [isSignUp, setIsSignUp] = useState(true);
  const [userType, setUserType] = useState<UserType | undefined>(undefined);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleAuth = async () => {
    if (isSignUp) {
      // Signing up a new user with Parse
      try {
        const user = new Parse.User();
        user.set('username', username);
        user.set('email', email);
        user.set('password', password);
        user.set('userType', userType); // Custom attribute

        await user.signUp();
        Alert.alert('Success', 'User registered successfully');
        navigation.navigate('TabLayout'); // Adjust as needed
      } catch (error) {
        let errorMessage = 'An unexpected error occurred';
        if (error instanceof Error) {
          console.error(isSignUp ? 'Registration Failed' : 'Login Failed', error.message);
          errorMessage = error.message;
        } else {
          // Log the error differently or handle non-Error objects
          console.error(isSignUp ? 'Registration Failed' : 'Login Failed', 'An unknown error occurred');
        }
        Alert.alert('Error', errorMessage);
      }
      
    } else {
      // Logging in an existing user with Parse
      try {
        const user = await Parse.User.logIn(username, password);
        Alert.alert('Success', 'Login successful');
        navigation.navigate('TabLayout'); // Adjust as needed
      } catch (error) {
        let errorMessage = 'An unexpected error occurred';
        if (error instanceof Error) {
          console.error(isSignUp ? 'Registration Failed' : 'Login Failed', error.message);
          errorMessage = error.message;
        } else {
          // Log the error differently or handle non-Error objects
          console.error(isSignUp ? 'Registration Failed' : 'Login Failed', 'An unknown error occurred');
        }
        Alert.alert('Error', errorMessage);
      }
      
    }
  };




  // const handleAuth = async () => {
  //   const url = isSignUp ? 'https://http://10.26.140.164/register' : 'https://http://10.26.140.164/login'; // Use HTTPS

  //   try {
  //     const response = await fetch(url, {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({ username, email, password }),
  //     });

  //     const data = await response.json();

  //     if (response.ok) {
  //       await Keychain.setGenericPassword('token', data.token); // Securely save the token
  //       Alert.alert(isSignUp ? 'Success' : 'Logged In', isSignUp ? 'Registration Successful' : 'Login Successful');
  //       navigation.navigate('TabLayout'); // Navigate to your main screen
  //     } else {
  //       throw new Error(data.error || 'An error occurred');
  //     }
  //   } catch (error) {
  //     // Since error is of type unknown, we perform a type check before accessing .message
  //     let errorMessage = 'An error occurred'; // Default message
  //     if (error instanceof Error) {
  //       // Now TypeScript knows error is an Error object, so we can access .message
  //       console.error(isSignUp ? 'Registration Failed' : 'Login Failed', error.message);
  //       errorMessage = error.message;
  //     } else {
  //       // If it's not an Error instance, you might handle it differently
  //       console.error(isSignUp ? 'Registration Failed' : 'Login Failed', error);
  //     }
    
  //     Alert.alert('Error', errorMessage);
  //   }
    
  // };


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
