import React, { useState } from 'react';
import { View, Text, Button, TextInput, Alert } from 'react-native';
import Toast from 'react-native-toast-message';

const MessChange = () => {
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [reason, setReason] = useState('');

  const handleApplyApproval = () => {
    if (fromDate && toDate && reason) {
      // Show a green toast message on success
      Toast.show({
        type: 'success',
        text1: 'Request sent successfully!',
        visibilityTime: 1500, // 1.5 seconds
        position: 'bottom',
        bottomOffset: 40,
      });
      // Clear the input fields
      setFromDate('');
      setToDate('');
      setReason('');
    } else {
      Alert.alert('Error', 'Please fill out all fields.', [{ text: 'OK' }], {
        cancelable: true,
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 18, fontWeight: 'bold' }}>From Date (DD/MM/YYYY):</Text>
      <TextInput
        placeholder="Enter From Date"
        value={fromDate}
        onChangeText={text => setFromDate(text.slice(0, 10))} // Limit the input to 10 characters
        style={styles.dateInput}
        keyboardType="numeric" // Ensures number input
      />

      <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 20 }}>To Date (DD/MM/YYYY):</Text>
      <TextInput
        placeholder="Enter To Date"
        value={toDate}
        onChangeText={text => setToDate(text.slice(0, 10))} // Limit the input to 10 characters
        style={styles.dateInput}
        keyboardType="numeric" // Ensures number input
      />

      <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 20 }}>Reason:</Text>
      <TextInput
        placeholder="Enter your reason here..."
        value={reason}
        onChangeText={setReason}
        style={styles.reasonInput}
        multiline
      />

      <Button title="Apply for Approval" onPress={handleApplyApproval} />

      {/* Add Toast component */}
      <Toast />
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#fff', // Set background to white
    padding: 20,
  },
  dateInput: {
    borderWidth: 1,
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
    borderColor: '#ccc',
  },
  reasonInput: {
    borderWidth: 1,
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
    borderColor: '#ccc',
    height: 100, // Larger input for reason
    textAlignVertical: 'top', // Ensures text starts at the top
  },
};

export default MessChange;
