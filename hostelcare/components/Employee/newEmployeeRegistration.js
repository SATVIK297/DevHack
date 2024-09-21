import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Picker } from '@react-native-picker/picker';
import Toast from 'react-native-toast-message';

const API_URL = 'http://localhost:3000/api/v1'; // Replace with your actual backend API URL

export default function EmployeeRegistrationPage() {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [regNumber, setRegNumber] = useState('');
  const [email, setEmail] = useState('');
  const [block, setBlock] = useState('');
  const [designation, setDesignation] = useState('');
  const [passcode, setPasscode] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpVisible, setIsOtpVisible] = useState(false);
  const [inputFocus, setInputFocus] = useState({});

  // const handleRegister = async () => {
  //  // if (email.endsWith('@vit.ac.in')) {
  //     try {
  //       const response = await fetch(`${API_URL}/employee/signup`, {
  //         method: 'POST',
  //         headers: { 'Content-Type': 'application/json' },
  //         body: JSON.stringify({ empId:regNumber,name, email, block, designation, password:passcode }),
  //       });
        
  //       const data = await response.json();

  //       if (response.ok) {
  //         Alert.alert('OTP Sent', 'A 6-digit OTP has been sent to your email.');
  //         setIsOtpVisible(true);
  //       } else {
  //         Alert.alert('Error', data.error || 'Registration failed. Please try again.');
  //       }
  //     } catch (error) {
  //       console.error(error);
  //       Alert.alert('Error', 'Failed to connect to server. Please try again later.');
  //     }
  //   // else {
  //   //   Alert.alert('Error', 'Please use a valid email address with @vit.ac.in');
  //   // }
  // };

  // const handleVerifyOtp = async () => {
  //   if (otp.length === 6) {
  //     try {
  //       const response = await fetch(`${API_URL}/employee/verify-otp`, {
  //         method: 'POST',
  //         headers: { 'Content-Type': 'application/json' },
  //         body: JSON.stringify({  otp }),
  //       });

  //       const data = await response.json();

  //       if (response.ok) {
  //         Alert.alert('Registration Successful', 'You have been registered successfully.');
  //         navigation.navigate('EmployeeLogin');
  //       } else {
  //         Alert.alert('Error', data.error || 'OTP verification failed. Please try again.');
  //       }
  //     } catch (error) {
  //       console.error(error);
  //       Alert.alert('Error', 'Failed to connect to server. Please try again later.');
  //     }
  //   } else {
  //     Alert.alert('Error', 'Please enter a valid 6-digit OTP.');
  //   }
  // };

  const handleRegister = async () => {
    try {
      const response = await fetch(`${API_URL}/employee/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ empId: regNumber, name, email, block, designation, password: passcode }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        Toast.show({
          text1: 'OTP Sent',
          text2: 'A 6-digit OTP has been sent to your email.',
          type: 'success',
          position: 'bottom',
          visibilityTime: 1500,
        });
        setIsOtpVisible(true);
      } else {
        Toast.show({
          text1: 'Error',
          text2: data.error || 'Registration failed. Please try again.',
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
  };
  
  const handleVerifyOtp = async () => {
    if (otp.length === 6) {
      try {
        const response = await fetch(`${API_URL}/employee/verify-otp`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ otp }),
        });
  
        const data = await response.json();
  
        if (response.ok) {
          Toast.show({
            text1: 'Registration Successful',
            text2: 'You have been registered successfully.',
            type: 'success',
            position: 'bottom',
            visibilityTime: 1500,
          });
          navigation.navigate('EmployeeLogin');
        } else {
          Toast.show({
            text1: 'Error',
            text2: data.error || 'OTP verification failed. Please try again.',
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
        text1: 'Error',
        text2: 'Please enter a valid 6-digit OTP.',
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

      {!isOtpVisible ? (
        <>
          <Text style={styles.title}>Employee Registration</Text>
          <TextInput
            style={[styles.input, inputFocus.name && styles.focusedInput]}
            placeholder="Name"
            value={name}
            onChangeText={setName}
            onFocus={() => setInputFocus({ ...inputFocus, name: true })}
            onBlur={() => setInputFocus({ ...inputFocus, name: false })}
          />
          <TextInput
            style={[styles.input, inputFocus.regNumber && styles.focusedInput]}
            placeholder="6-digit Employee ID"
            value={regNumber}
            onChangeText={setRegNumber}
            maxLength={6}
            onFocus={() => setInputFocus({ ...inputFocus, regNumber: true })}
            onBlur={() => setInputFocus({ ...inputFocus, regNumber: false })}
          />
          <TextInput
            style={[styles.input, inputFocus.email && styles.focusedInput]}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            onFocus={() => setInputFocus({ ...inputFocus, email: true })}
            onBlur={() => setInputFocus({ ...inputFocus, email: false })}
          />
          <Picker
            selectedValue={block}
            style={styles.picker}
            onValueChange={(itemValue) => setBlock(itemValue)}
          >
            <Picker.Item label="Select Block" value="" />
            <Picker.Item label="Block A" value="Block A" />
            <Picker.Item label="Block B" value="Block B" />
            <Picker.Item label="Block C" value="Block C" />
            <Picker.Item label="Block D" value="Block D" />
            <Picker.Item label="Block E" value="Block E" />
            <Picker.Item label="Block F" value="Block F" />
            <Picker.Item label="Block G" value="Block G" />
            <Picker.Item label="Block H" value="Block H" />
            <Picker.Item label="Block I" value="Block I" />
            <Picker.Item label="Block J" value="Block J" />
          </Picker>
          <Picker
            selectedValue={designation}
            style={styles.picker}
            onValueChange={(itemValue) => setDesignation(itemValue)}
          >
            <Picker.Item label="Select Designation" value="" />
            <Picker.Item label="Carpenter" value="Carpenter" />
            <Picker.Item label="Electrician" value="Electrician" />
            <Picker.Item label="Room Cleaner" value="Room Cleaner" />
          </Picker>
          <TextInput
            style={[styles.input, inputFocus.passcode && styles.focusedInput]}
            placeholder="6-digit Passcode"
            value={passcode}
            onChangeText={setPasscode}
            secureTextEntry
            maxLength={6}
            onFocus={() => setInputFocus({ ...inputFocus, passcode: true })}
            onBlur={() => setInputFocus({ ...inputFocus, passcode: false })}
          />

          <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <Text style={styles.buttonText}>Complete Registration</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text style={styles.title}>Enter OTP</Text>
          <TextInput
            style={[styles.input, inputFocus.otp && styles.focusedInput]}
            placeholder="Enter 6-digit OTP"
            value={otp}
            onChangeText={setOtp}
            maxLength={6}
            onFocus={() => setInputFocus({ ...inputFocus, otp: true })}
            onBlur={() => setInputFocus({ ...inputFocus, otp: false })}
          />
          <TouchableOpacity style={styles.button} onPress={handleVerifyOtp}>
            <Text style={styles.buttonText}>Verify OTP</Text>
          </TouchableOpacity>
        </>
      )}
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
  focusedInput: {
    borderColor: '#FFA500', // Golden/Orange color when focused
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
  picker: {
    width: '100%',
    height: 50,
    marginBottom: 15,
    borderBottomWidth: 1, // Add border only at the bottom
    borderColor: '#ccc', // Border color
  },
});
