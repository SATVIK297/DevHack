
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons'; // Import the Ionicons icon set
import { useDispatch } from 'react-redux'; // Import useDispatch from Redux
import { login } from '../../redux/slices/studentSlice'; // Import the login action
import Toast from 'react-native-toast-message';

const API_URL = 'http://localhost:3000/api/v1'; // Replace with your backend API URL

export default function StudentLoginPage() {
  const navigation = useNavigation();
  const dispatch = useDispatch(); // Create a dispatch instance
  const [email, setEmail] = useState('');
  const [passcode, setPasscode] = useState('');
  const [emailError, setEmailError] = useState('');

  const handleLogin = async () => {
    if (email.endsWith('@vitstudent.ac.in')) {
      try {
        const response = await fetch(`${API_URL}/students/signin`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password: passcode }),
        });
  
       
        console.log("resppp",response)
        if (response.ok) {
          const data = await response.json();
        console.log(data, "ergfhjjg"); // Logging parsed data

        const studentData = data.rest; // Extract `rest` object which contains student details
        console.log('studentData Data:', studentData);
        dispatch(login(studentData));
          
          // Dispatch the login action and store the user data in Redux
         // dispatch(login(data.student)); // Assuming the backend returns the student object in `data.student`

          Toast.show({
            text1: 'Login Successful',
            text2: data.message,
            type: 'success',
            position: 'bottom', // Show toast at the bottom
            visibilityTime: 1500, // Show for 2 seconds
          });
          navigation.navigate('StudentDashboard'); // Navigate to Dashboard
        } else {
          Toast.show({
            text1: 'Error',
            text2: data.error || 'Login failed. Please try again.',
            type: 'error',
            position: 'bottom',
            visibilityTime: 1500,
          });
        }
      } catch (error) {
        console.error(error);
        Toast.show({
          text1: 'Error',
          text2: 'Failed to connect to server. Please try again later.',
          type: 'error',
          position: 'bottom',
          visibilityTime: 1500,
        });
      }
    } else {
      Toast.show({
        text1: 'Invalid Email',
        text2: 'Please enter a valid email ending with @vitstudent.ac.in',
        type: 'error',
        position: 'bottom',
        visibilityTime: 1500,
      });
    }
  };
  

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Icon name="arrow-back" size={24} color="#2196F3" />
      </TouchableOpacity>

      <Image source={require('../../assets/student.png')} style={styles.image} />
      <Text style={styles.title}>Student Login</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Email ID"
        keyboardType="email-address"
        value={email}
        onChangeText={(text) => {
          setEmail(text);
          if (text.endsWith('@vitstudent.ac.in') || text === '') {
            setEmailError(''); // Clear error if valid
          } else {
            setEmailError('Please enter a valid email ending with @vitstudent.ac.in');
          }
        }}
      />
      {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

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

      <TouchableOpacity onPress={() => navigation.navigate('StudentPasscodeReset')}>
        <Text style={styles.link}>Forgot passcode?</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('StudentRegistration')}>
        <Text style={styles.link}>New student registration</Text>
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
    top: 20,
    left: 20,
    zIndex: 1,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 20,
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
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});
