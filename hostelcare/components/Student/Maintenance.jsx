import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import DatePicker from "react-native-date-picker";
import { Picker } from '@react-native-picker/picker'; // Import Picker

const initialLayout = { width: Dimensions.get("window").width };

const ApplyRequest = ({ submitRequest }) => {
  const [date, setDate] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [time, setTime] = useState(new Date());
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [maintenanceType, setMaintenanceType] = useState('');
  const [description, setDescription] = useState("");

  const handleSubmit = useCallback(() => {
    const formattedDate = date.toISOString().split("T")[0];
    const formattedTime = time.toTimeString().split(" ")[0];

    submitRequest(formattedDate, formattedTime, description, maintenanceType); // Pass maintenanceType

    // Reset fields
    setDate(new Date());
    setTime(new Date());
    setDescription("");
    setMaintenanceType(''); // Reset maintenanceType
  }, [date, time, description, maintenanceType, submitRequest]);

  const showDatePicker = () => setDatePickerVisibility(true);
  const hideDatePicker = () => setDatePickerVisibility(false);
  const showTimePicker = () => setTimePickerVisibility(true);
  const hideTimePicker = () => setTimePickerVisibility(false);

  return (
    <View style={styles.applyForm}>
      <Text style={styles.inputLabel}>Maintenance Type</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={maintenanceType}
          style={styles.picker}
          onValueChange={(itemValue) => setMaintenanceType(itemValue)}
        >
          <Picker.Item label="Select Maintenance Type" value="" />
          <Picker.Item label="Furniture" value="Furniture" />
          <Picker.Item label="AC" value="AC" />
          <Picker.Item label="Electricity" value="Electricity" />
        </Picker>
      </View>
      <Text style={styles.inputLabel}>Date</Text>
      <TouchableOpacity onPress={showDatePicker} style={styles.dateButton}>
        <Text style={styles.dateText}>{date.toISOString().split("T")[0]}</Text>
      </TouchableOpacity>

      <DatePicker
        modal
        mode="date"
        open={isDatePickerVisible}
        date={date}
        onConfirm={(selectedDate) => {
          hideDatePicker();
          setDate(selectedDate);
        }}
        onCancel={hideDatePicker}
      />

      <Text style={styles.inputLabel}>Time</Text>
      <TouchableOpacity onPress={showTimePicker} style={styles.dateButton}>
        <Text style={styles.dateText}>{time.toTimeString().split(" ")[0]}</Text>
      </TouchableOpacity>

      <DatePicker
        modal
        mode="time"
        open={isTimePickerVisible}
        date={time}
        onConfirm={(selectedTime) => {
          hideTimePicker();
          setTime(selectedTime);
        }}
        onCancel={hideTimePicker}
      />

      <Text style={styles.inputLabel}>Description</Text>
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={setDescription}
        placeholder="Enter Description"
        multiline
      />
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

const Maintenance = () => {
  const [pendingRequests, setPendingRequests] = useState([]);
  const [history, setHistory] = useState([]);

  const rollnum = "21BKT0145";

  useEffect(() => {
    fetchPendingRequests();
    fetchRequestHistory();
  }, []);

  const submitRequest = async (date, time, description, maintenanceType) => { // Accept maintenanceType
    try {
      const requestBody = {
        rollnum,
        date,
        time,
        description,
        serviceType: maintenanceType, // Use maintenanceType here
      };

      const response = await axios.post(
        "http://localhost:3000/api/v1/students/service",
        requestBody
      );

      if (response.status === 201) {
        const newRequest = response.data.data;
        setPendingRequests((prev) => [...prev, newRequest]);
      }
    } catch (error) {
      console.error("Failed to submit request:", error);
    }
  };

  const fetchPendingRequests = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/v1/students/status/${rollnum}`
      );
      setPendingRequests(response.data.requests || []);
    } catch (error) {
      console.error("Failed to fetch pending requests:", error);
    }
  };

  const fetchRequestHistory = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/v1/students/status/${rollnum}`
      );
      setHistory(response.data.requests || []);
    } catch (error) {
      console.error("Failed to fetch request history:", error);
    }
  };

  const PendingRequests = React.memo(() => (
    <ScrollView style={styles.requestList}>
      {pendingRequests.length === 0 ? (
        <Text>No pending requests</Text>
      ) : (
        pendingRequests.map((request) => (
          <View key={request._id} style={styles.requestCard}>
            <Text>Date: {request.date}</Text>
            <Text>Time: {request.time}</Text>
            <Text>Description: {request.description}</Text>
            <Text>
              <Text style={styles.statusLabel}>Status: </Text>
              <Text style={styles.pendingStatus}>{request.status}</Text>
            </Text>
          </View>
        ))
      )}
    </ScrollView>
  ));

  const RequestHistory = React.memo(() => (
    <ScrollView style={styles.requestList}>
      {history.length === 0 ? (
        <Text>No history available</Text>
      ) : (
        history.map((request) => (
          <View key={request._id} style={styles.requestCard}>
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
  ));

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "apply", title: "Apply" },
    { key: "pending", title: "Pending" },
    { key: "history", title: "History" },
  ]);

  const renderScene = SceneMap({
    apply: () => <ApplyRequest submitRequest={submitRequest} />,
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
          indicatorStyle={{ backgroundColor: "#007bff" }}
          style={{ backgroundColor: "#fff" }}
          activeColor="#007bff"
          inactiveColor="#ccc"
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  applyForm: {
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
  dateButton: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#f9f9f9",
    alignItems: "center",
    marginBottom: 15,
  },
  dateText: {
    fontSize: 16,
  },
  requestList: {
    padding: 20,
  },
  requestCard: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  statusLabel: {
    fontWeight: "bold",
    color: "#000",
  },
  pendingStatus: {
    color: "red",
  },
  completedStatus: {
    color: "green",
  },
});

export default Maintenance;
