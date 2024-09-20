import React, { useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

const initialLayout = { width: Dimensions.get('window').width };

const RoomCleaning = () => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [description, setDescription] = useState('');
  const [pendingRequests, setPendingRequests] = useState([
    { id: 1, date: '20/09/2024', time: '14:00', description: 'General cleaning of room', status: 'Pending' },
  ]);
  const [history, setHistory] = useState([
    { id: 1, date: '18/09/2024', time: '09:00', status: 'Completed' },
    { id: 2, date: '19/09/2024', time: '12:00', status: 'Completed' },
    { id: 3, date: '15/09/2024', time: '11:00', status: 'Completed' },
    { id: 4, date: '14/08/2024', time: '08:00', status: 'Completed' },
    { id: 5, date: '02/08/2024', time: '97:00', status: 'Completed' },
    { id: 6, date: '01/08/2024', time: '12:00', status: 'Completed' },


  ]);

  // Submit Room Cleaning Request
  const submitRequest = () => {
    const newRequest = {
      id: Date.now(),
      date,
      time,
      description,
      status: 'Pending',
    };
    setPendingRequests([...pendingRequests, newRequest]);
    setDate('');
    setTime('');
    setDescription('');
  };

  // Handle QR Code Generation (placeholder)
  const generateQRCode = (requestId) => {
    console.log(`QR Code generated for request ID: ${requestId}`);
    // In a real app, you would integrate a QR code library here to generate a QR code
  };

  // Tab Content Functions
  const ApplyRequest = () => (
    <View style={styles.applyForm}>
      <Text style={styles.inputLabel}>Date</Text>
      <TextInput
        style={styles.input}
        value={date}
        onChangeText={setDate}
        placeholder="Enter Date (DD/MM/YYYY)"
      />
      <Text style={styles.inputLabel}>Time</Text>
      <TextInput
        style={styles.input}
        value={time}
        onChangeText={setTime}
        placeholder="Enter Time (HH:MM)"
      />
      <Text style={styles.inputLabel}>Description</Text>
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={setDescription}
        placeholder="Enter Description"
        multiline
      />
      <Button title="Submit" onPress={submitRequest} />
    </View>
  );

  const PendingRequests = () => (
    <ScrollView style={styles.requestList}>
      {pendingRequests.length === 0 ? (
        <Text>No pending requests</Text>
      ) : (
        pendingRequests.map((request) => (
          <View key={request.id} style={styles.requestCard}>
            <Text>Date: {request.date}</Text>
            <Text>Time: {request.time}</Text>
            <Text>Description: {request.description}</Text>
            <Text>
              <Text style={styles.statusLabel}>Status: </Text>
              <Text style={styles.pendingStatus}>{request.status}</Text>
            </Text>
            {/* Button to generate QR code */}
            <TouchableOpacity style={styles.qrButton} onPress={() => generateQRCode(request.id)}>
              <Text style={styles.qrButtonText}>Generate QR</Text>
            </TouchableOpacity>
          </View>
        ))
      )}
    </ScrollView>
  );

  const RequestHistory = () => (
    <ScrollView style={styles.requestList}>
      {history.length === 0 ? (
        <Text>No history available</Text>
      ) : (
        history.map((request) => (
          <View key={request.id} style={styles.requestCard}>
            <Text>Date: {request.date}</Text>
            <Text>Time: {request.time}</Text>
            <Text>
              <Text style={styles.statusLabel}>Status: </Text>
              <Text style={styles.completedStatus}>{request.status}</Text>
            </Text>
          </View>
        ))
      )}
    </ScrollView>
  );

  // Set up tabs for navigation
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'apply', title: 'Apply' },
    { key: 'pending', title: 'Pending' },
    { key: 'history', title: 'History' },
  ]);

  const renderScene = SceneMap({
    apply: ApplyRequest,
    pending: PendingRequests,
    history: RequestHistory,
  });

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
      renderTabBar={(props) => (
        <TabBar
          {...props}
          indicatorStyle={{ backgroundColor: '#007bff' }}
          style={{ backgroundColor: '#fff' }}
          activeColor="#007bff"
          inactiveColor="#ccc"
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  applyForm: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
  requestList: {
    padding: 20,
  },
  requestCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  statusLabel: {
    fontWeight: 'bold',
    color: '#000', // Black color for the "Status:" label
  },
  pendingStatus: {
    color: 'red', // Red color for pending status
  },
  completedStatus: {
    color: 'green', // Green color for completed status
  },
  qrButton: {
    marginTop: 10,
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  qrButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default RoomCleaning;
