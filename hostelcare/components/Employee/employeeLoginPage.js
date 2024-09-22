import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons'; // Import the Ionicons icon set
import Toast from 'react-native-toast-message';
import { useDispatch } from 'react-redux'; // Import useDispatch to dispatch actions
import { login } from '../../redux/slices/employeeSlice'; // Import the login action from employeeSlice

const API_URL = 'http://localhost:3000/api/v1'; // Replace with your actual backend API URL

export default function EmployeeLoginPage() {
  const navigation = useNavigation();
  const dispatch = useDispatch(); // Initialize useDispatch hook

  const [email, setEmail] = useState('');
  const [passcode, setPasscode] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch(`${API_URL}/employee/signin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password: passcode }),
      });
  
      if (response.status === 200) {
        // Assuming successful login returns a 200 status
        const data = await response.json(); // Get the response data
        const employeeData = data.rest; // Extract the `rest` object which contains employee details
        console.log('Employee Data:', employeeData);
        dispatch(login(employeeData));
        // // Dispatch login action to save employee data in Redux
        // dispatch(login(data.rest)); // Assuming `data.employee` contains the employee details

        Toast.show({
          text1: 'Login Successful',
          text2: 'Welcome to the Employee Dashboard!',
          type: 'success',
          position: 'bottom',
          visibilityTime: 1500, // Show for 1.5 seconds
        });

        // Navigate to Dashboard
        navigation.navigate('EmployeeDashboard');
      } else if (response.status === 401) {
        Toast.show({
          text1: 'Login Failed',
          text2: 'Invalid email or passcode.',
          type: 'error',
          position: 'bottom',
          visibilityTime: 1500,
        });
      } else {
        Toast.show({
          text1: 'Error',
          text2: 'An unexpected error occurred. Please try again.',
          type: 'error',
          position: 'bottom',
          visibilityTime: 1500,
        });
      }
    } catch (error) {
      console.error('Login error:', error);
      Toast.show({
        text1: 'Error',
        text2: 'Failed to connect to server. Please try again later.',
        type: 'error',
        position: 'bottom',
        visibilityTime: 1500,
      });
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Icon name="arrow-back" size={24} color="#2196F3" /> {/* Use a back icon */}
      </TouchableOpacity>

      <Image source={require('../../assets/employee.png')} style={styles.image} />
      <Text style={styles.title}>Employee Login</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Email ID"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Passcode (6 digits)"
        secureTextEntry
        maxLength={6} // Restrict to 6 digits
        value={passcode}
        onChangeText={setPasscode}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('EmployeePasscodeReset')}>
        <Text style={styles.link}>Forgot passcode?</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('EmployeeRegistration')}>
        <Text style={styles.link}>New employee registration</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  backButton: {
    position: 'absolute',
    top: 20, // Position it at the top
    left: 20, // Position it to the left
    zIndex: 1, // Ensure it’s above other elements
  },
  image: {
    width: 100, // Adjust as needed
    height: 100, // Adjust as needed
    marginBottom: 20, // Space between the image and title
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  link: {
    color: '#2196F3',
    marginTop: 10,
  },
});
