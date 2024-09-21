import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function ForgotStudentPasscodePage() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPasscode, setNewPasscode] = useState('');
  const [isOtpVisible, setIsOtpVisible] = useState(false);
  const [isNewPasscodeVisible, setIsNewPasscodeVisible] = useState(false);
  const [inputFocus, setInputFocus] = useState({});

  const handleSendOtp = () => {
    if (email.endsWith('@vitstudent.ac.in')) {
      Alert.alert('OTP Sent', 'A 6-digit OTP has been sent to your email.');
      setIsOtpVisible(true);
    } else {
      Alert.alert('Error', 'Please use a valid email address with @vitstudent.ac.in');
    }
  };

  const handleVerifyOtp = () => {
    if (otp.length === 6) {
      Alert.alert('OTP Verified', 'You can now set a new passcode.');
      setIsNewPasscodeVisible(true);
    } else {
      Alert.alert('Error', 'Please enter a valid 6-digit OTP.');
    }
  };

  const handleResetPasscode = () => {
    if (newPasscode.length === 6) {
      Alert.alert('Passcode Reset', 'Your passcode has been reset successfully.');
      navigation.navigate('StudentLogin'); // Navigate to Student Login page
    } else {
      Alert.alert('Error', 'Please enter a valid 6-digit passcode.');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Icon name="arrow-back" size={24} color="#2196F3" />
      </TouchableOpacity>

      <Text style={styles.title}>Forgot Passcode</Text>
      
      {!isOtpVisible ? (
        <>
          <TextInput
            style={[styles.input, inputFocus.email && styles.focusedInput]}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            onFocus={() => setInputFocus({ ...inputFocus, email: true })}
            onBlur={() => setInputFocus({ ...inputFocus, email: false })}
          />
          <TouchableOpacity style={styles.button} onPress={handleSendOtp}>
            <Text style={styles.buttonText}>Send OTP</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          {!isNewPasscodeVisible ? (
            <>
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
          ) : (
            <>
              <TextInput
                style={[styles.input, inputFocus.newPasscode && styles.focusedInput]}
                placeholder="Enter New 6-digit Passcode"
                value={newPasscode}
                onChangeText={setNewPasscode}
                secureTextEntry
                maxLength={6}
                onFocus={() => setInputFocus({ ...inputFocus, newPasscode: true })}
                onBlur={() => setInputFocus({ ...inputFocus, newPasscode: false })}
              />
              <TouchableOpacity style={styles.button} onPress={handleResetPasscode}>
                <Text style={styles.buttonText}>Reset Passcode</Text>
              </TouchableOpacity>
            </>
          )}
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
});
