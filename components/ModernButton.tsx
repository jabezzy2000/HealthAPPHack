// ModernButton.tsx
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

// Define an interface for the component's props
interface ButtonProps {
  title: string;
  onPress: () => void; // You can adjust the function type if needed
}

// Use the ButtonProps interface to type the component's props
const ModernButton: React.FC<ButtonProps> = ({ onPress, title }) => (
  <TouchableOpacity onPress={onPress} style={styles.button}>
    <Text style={styles.text}>{title}</Text>
  </TouchableOpacity>
);

// Styles remain unchanged
const styles = StyleSheet.create({
  button: {
    backgroundColor: 'blue',
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 10,
  },
  text: {
    color: 'white',
    fontSize: 18,
  },
});

export default ModernButton;
