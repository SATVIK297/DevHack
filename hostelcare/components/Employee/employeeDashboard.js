
import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

const initialLayout = { width: Dimensions.get('window').width };

const EmployeeDashboardPage = () => {
  const [pendingRequests, setPendingRequests] = useState([
    { id: 1, date: '20/09/2024', time: '14:00', description: 'General cleaning of room', status: 'Pending' },
  ]);

  const [history, setHistory] = useState([
    { id: 1, date: '18/09/2024', time: '09:00', status: 'Completed' },
    { id: 2, date: '19/09/2024', time: '12:00', status: 'Completed' },
    { id: 3, date: '15/09/2024', time: '11:00', status: 'Completed' },
    { id: 4, date: '14/08/2024', time: '08:00', status: 'Completed' },
  ]);

  // Handle QR Code Scanning (placeholder)
  const scanQRCode = (requestId) => {
    console.log(`QR Code scanned for request ID: ${requestId}`);
  };

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
            <TouchableOpacity style={styles.qrButton} onPress={() => scanQRCode(request.id)}>
              <Text style={styles.qrButtonText}>Scan QR</Text>
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
    { key: 'pending', title: 'Pending' },
    { key: 'history', title: 'History' },
  ]);

  const renderScene = SceneMap({
    pending: PendingRequests,
    history: RequestHistory,
  });

  return (
    <View style={styles.container}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 20,
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
  },
  pendingStatus: {
    color: 'red',
  },
  completedStatus: {
    color: 'green',
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

export default EmployeeDashboardPage;
