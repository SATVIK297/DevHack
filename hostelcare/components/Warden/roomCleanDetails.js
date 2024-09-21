
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

const employees = [
  { id: 1, name: 'Alice Johnson' },
  { id: 2, name: 'Bob Smith' },
  { id: 3, name: 'Charlie Brown' },
  { id: 4, name: 'Daisy Miller' },
  { id: 5, name: 'Ethan Clark' },
  { id: 6, name: 'Fiona Davis' },
  { id: 7, name: 'George Wilson' },
  { id: 8, name: 'Hannah Lee' },
  { id: 9, name: 'Isaac Roberts' },
  { id: 10, name: 'Julia Martinez' },
];

// Dummy history data for each employee
const historyData = {
  1: [
    { id: 1, date: '18/09/2024', time: '09:00', status: 'Completed' },
    { id: 2, date: '19/09/2024', time: '12:00', status: 'Completed' },
    { id: 3, date: '20/09/2024', time: '10:00', status: 'Pending' },
    { id: 4, date: '21/09/2024', time: '11:00', status: 'Completed' },
  ],
  2: [
    { id: 1, date: '22/09/2024', time: '10:00', status: 'Completed' },
    { id: 2, date: '23/09/2024', time: '11:00', status: 'Completed' },
    { id: 3, date: '24/09/2024', time: '09:00', status: 'Pending' },
  ],
  // Add history for other employees as needed
};

const RoomCleanDetails = () => {
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [employeeHistory, setEmployeeHistory] = useState([]);
  const [showAllEmployees, setShowAllEmployees] = useState(false);
  const [showAllHistory, setShowAllHistory] = useState(false);

  const handleEmployeeSelect = (employee) => {
    setSelectedEmployee(employee);
    setEmployeeHistory(historyData[employee.id] || []);
  };

  const RequestHistory = () => (
    <View style={styles.requestContainer}>
      {selectedEmployee ? (
        <>
          <Text style={styles.historyTitle}>{selectedEmployee.name}'s Cleaning History</Text>
          <ScrollView style={styles.requestList}>
            {employeeHistory.length === 0 ? (
              <Text>No history available</Text>
            ) : (
              employeeHistory.slice(0, showAllHistory ? employeeHistory.length : 3).map((request) => (
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
            {employeeHistory.length > 3 && !showAllHistory && (
              <TouchableOpacity onPress={() => setShowAllHistory(true)}>
                <Text style={styles.showMore}>... See more</Text>
              </TouchableOpacity>
            )}
          </ScrollView>
        </>
      ) : (
        <Text></Text>
      )}
    </View>
  );
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Room Cleaning Employees</Text>
      <ScrollView style={styles.employeeList}>
        {employees.slice(0, showAllEmployees ? employees.length : 5).map((employee) => (
          <TouchableOpacity key={employee.id} onPress={() => handleEmployeeSelect(employee)}>
            <Text style={styles.employeeItem}>{employee.name}</Text>
          </TouchableOpacity>
        ))}
        {employees.length > 5 && !showAllEmployees && (
          <TouchableOpacity onPress={() => setShowAllEmployees(true)}>
            <Text style={styles.showMore}>... See more</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
      <RequestHistory />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#ffffff',
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  employeeList: {
    marginBottom: 20,
    maxHeight: 280, // Limit height for employee list
  },
  employeeItem: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    marginVertical: 5,
    borderRadius: 5,
  },
  historyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  requestList: {
    marginTop: 10,
    maxHeight: 280, // Limit height for history list
  },
  requestCard: {
    padding: 10,
    backgroundColor: '#e7f3fe',
    marginBottom: 5,
    borderRadius: 5,
  },
  statusLabel: {
    fontWeight: 'bold',
  },
  completedStatus: {
    color: 'green',
  },
  showMore: {
    color: '#007bff',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 5,
  },
});

export default RoomCleanDetails;
