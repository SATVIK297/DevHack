import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, Modal, Button, TextInput, ScrollView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/Feather';
import Toast from 'react-native-toast-message';

const counselors = [
  // Dummy data
  { id: 1, name: 'Dr. John Doe', room: 'SJT 406', designation: 'Senior Counselor', description: 'Expert in dealing with stress, anxiety, and personal issues. Specializes in relationship counseling and emotional wellness.' },
  { id: 2, name: 'Dr. Jane Smith', room: 'TT 104', designation: 'Junior Counselor', description: 'Specializes in relationship counseling and emotional wellness. Helps students with career advice, internships, and job placements.' },
  { id: 3, name: 'Dr. Albert Gray', room: 'PRP 401', designation: 'Psychologist', description: 'Experienced in behavioral therapy and psychological assessments. Specializes in relationship counseling and emotional wellness.' },
  { id: 4, name: 'Dr. Emily White', room: 'SMV 231', designation: 'Career Counselor', description: 'Helps students with career advice, internships, and job placements. Specializes in relationship counseling and emotional wellness.' },
  { id: 5, name: 'Dr. Michael Green', room: 'MGB 102', designation: 'Mental Health Specialist', description: 'Focuses on mental health issues like depression and mood disorders. Specializes in relationship counseling and emotional wellness.' },
];

const Counselor = () => {
  const [selectedCounselor, setSelectedCounselor] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [appointmentDetails, setAppointmentDetails] = useState({ date: new Date(), description: '' });
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleSelectCounselor = (counselor) => {
    setSelectedCounselor(counselor);
    setModalVisible(true);
  };

  const handleBookAppointment = () => {
    setModalVisible(false);

    // Show a green success toast when the appointment is booked
    Toast.show({
      type: 'success',
      text1: 'Appointment booked!',
      text2: 'Your appointment has been successfully booked.',
      position: 'bottom',
      visibilityTime: 3000,
    });
  };

  const handleBackPress = () => {
    setModalVisible(false);
    setSelectedCounselor(null);
  };

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: '#f0f0f0' }}>
      <ScrollView>
        {counselors.map((counselor) => (
          <TouchableOpacity key={counselor.id} onPress={() => handleSelectCounselor(counselor)}>
            <View style={styles.counselorTile}>
              <Image source={require('../../assets/profile.png')} style={styles.profileImage} />
              <View style={{ flex: 1 }}>
                <Text style={styles.counselorName}>{counselor.name}</Text>
                <Text>{counselor.designation}</Text>
                <Text>{counselor.room}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {selectedCounselor && (
        <Modal visible={modalVisible} animationType="slide">
          <View style={{ padding: 20, backgroundColor: '#fff', flex: 1 }}>
            <TouchableOpacity onPress={handleBackPress}>
              <Icon name="arrow-left" size={24} color="black" style={{ marginBottom: 20 }} />
            </TouchableOpacity>

            <Text style={styles.modalTitle}>{selectedCounselor.name}</Text>
            <Text>{selectedCounselor.designation}</Text>
            <Text>{selectedCounselor.room}</Text>

            <Text style={{ marginTop: 10, fontWeight: 'bold' }}>Description:</Text>
            <Text numberOfLines={4}>{selectedCounselor.description}</Text>

            {/* Date and Time Picker */}
            <Text style={{ marginTop: 20, fontWeight: 'bold' }}>Select Appointment Date & Time:</Text>
            <TouchableOpacity onPress={() => setShowDatePicker(true)}>
              <Text style={styles.datePicker}>
                {appointmentDetails.date.toLocaleString()}
              </Text>
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                value={appointmentDetails.date}
                mode="datetime"
                display="default"
                onChange={(event, selectedDate) => {
                  const currentDate = selectedDate || appointmentDetails.date;
                  setShowDatePicker(false);
                  setAppointmentDetails({ ...appointmentDetails, date: currentDate });
                }}
              />
            )}

            {/* Description */}
            <Text style={{ marginTop: 20, fontWeight: 'bold' }}>Description:</Text>
            <TextInput
              placeholder="Describe your concerns..."
              value={appointmentDetails.description}
              onChangeText={(text) => setAppointmentDetails({ ...appointmentDetails, description: text })}
              style={styles.textInput}
              multiline
            />

            {/* Book Appointment Button */}
            <Button title="Book Appointment" onPress={handleBookAppointment} />

            {/* Close Modal */}
            <Button title="Close" onPress={() => setModalVisible(false)} color="red" />
          </View>
        </Modal>
      )}

      {/* Add Toast Component */}
      <Toast />
    </View>
  );
};

const styles = {
  counselorTile: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 3,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  counselorName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  datePicker: {
    padding: 10,
    backgroundColor: '#ddd',
    marginVertical: 10,
    borderRadius: 5,
  },
  textInput: {
    borderWidth: 1,
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
    borderColor: '#ccc',
  },
};

export default Counselor;
