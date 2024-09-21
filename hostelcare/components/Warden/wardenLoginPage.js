import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons'; // Import the Ionicons icon set
import Toast from 'react-native-toast-message';

const API_URL = 'http://localhost:3000/api/v1'; // Replace with your backend URL

export default function WardenLoginPage() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [passcode, setPasscode] = useState('');
  
  // const handleLogin = async () => {
  //   if (email === '' || passcode === '') {
  //     Alert.alert('Error', 'Please fill out both fields.');
  //     return;
  //   }

  //   try {
  //     const response = await fetch(`${API_URL}/warden/signin`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         email,
  //         password:passcode,
  //       }),
  //     });

  //     const data = await response.json();

  //     if (response.ok) {
  //       Alert.alert('Login Successful', 'Welcome to your dashboard!');
  //       navigation.navigate('WardenDashboard'); // Navigate to the WardenDashboard page upon successful login
  //     } else {
  //       Alert.alert('Login Failed', data.error || 'Invalid credentials. Please try again.');
  //     }
  //   } catch (error) {
  //     console.error('Login error:', error);
  //     Alert.alert('Error', 'An error occurred while logging in.');
  //   }
  // };
  const handleLogin = async () => {
    if (email === '' || passcode === '') {
      Toast.show({
        text1: 'Error',
        text2: 'Please fill out both fields.',
        type: 'error',
        position: 'bottom',
        visibilityTime: 1500,
      });
      return;
    }
  
    try {
      const response = await fetch(`${API_URL}/warden/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password: passcode,
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        Toast.show({
          text1: 'Login Successful',
          text2: 'Welcome to your dashboard!',
          type: 'success',
          position: 'bottom',
          visibilityTime: 1500,
        });
        navigation.navigate('WardenDashboard'); // Navigate to the WardenDashboard page upon successful login
      } else {
        Toast.show({
          text1: 'Login Failed',
          text2: data.error || 'Invalid credentials. Please try again.',
          type: 'error',
          position: 'bottom',
          visibilityTime: 1500,
        });
      }
    } catch (error) {
      console.error('Login error:', error);
      Toast.show({
        text1: 'Error',
        text2: 'An error occurred while logging in.',
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

      <Image source={require('../../assets/warden.png')} style={styles.image} />
      <Text style={styles.title}>Warden Login</Text>
      
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

      <TouchableOpacity onPress={() => navigation.navigate('WardenPasscodeReset')}>
        <Text style={styles.link}>Forgot passcode?</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('WardenRegistration')}>
        <Text style={styles.link}>New warden registration</Text>
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
});
