import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, Modal, Button, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const StudentDashboard = () => {
  const navigation = useNavigation(); // Use navigation hook
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedNotice, setSelectedNotice] = useState({});

  // Dummy notices data
  const notices = [
    {
      id: 1,
      title: 'Mess Timings Change',
      message: 'The mess timings have been revised. Breakfast will now be served from 7:30 AM to 9:00 AM.',
      details: 'Starting next Monday, breakfast will be served from 7:30 AM to 9:00 AM. The lunch and dinner timings remain the same.',
    },
    {
      id: 2,
      title: 'Hostel Maintenance Alert',
      message: 'Scheduled maintenance will take place on Wednesday. Expect water supply to be affected.',
      details: 'On Wednesday, from 9:00 AM to 1:00 PM, the hostel will undergo routine maintenance. The water supply may be temporarily interrupted.',
    },
    {
      id: 3,
      title: 'Room Cleaning Schedule',
      message: 'The room cleaning schedule has been updated. Check your floor\'s cleaning timing.',
      details: 'The updated room cleaning schedule for each floor is posted on the hostel notice board. Please check your slot and be prepared.',
    },
  ];

  // Handle notice press and open modal
  const handleNoticePress = (notice) => {
    setSelectedNotice(notice);
    setModalVisible(true);
  };

  // Handle button press for different sections
  const handleButtonPress = (section) => {
    if (section === 'Room Cleaning') {
      navigation.navigate('RoomCleaning'); // Navigate to the RoomCleaning page
    } else if (section === 'Maintenance') {
      navigation.navigate('Maintenance'); // Navigate to the Maintenance page
    } else if (section === 'Counselor'){
      navigation.navigate('Counselor');
    } else if (section === 'Mess'){
      navigation.navigate('MessChange');
    }else{
      console.log(`${section} button pressed`);
    }
  };

  const screenWidth = Dimensions.get('window').width * 0.48; // Adjusting for the grid layout

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Notice Board */}
      <View style={styles.noticeBoard}>
        <Text style={styles.noticeText}>Notice Board</Text>

        {notices.map((notice) => (
          <TouchableOpacity key={notice.id} onPress={() => handleNoticePress(notice)}>
            <View style={styles.noticeItem}>
              <Text style={styles.noticeTitle}>{notice.title}</Text>
              <Text style={styles.noticeMessage}>{notice.message}</Text>
            </View>
          </TouchableOpacity>
        ))}

        {/* Modal for more information */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>{selectedNotice.title}</Text>
              <Text style={styles.modalDetails}>{selectedNotice.details}</Text>
              <Button title="Close" onPress={() => setModalVisible(false)} />
            </View>
          </View>
        </Modal>
      </View>

      {/* Button Grid */}
      <View style={styles.buttonGrid}>
        <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('Room Cleaning')}>
          <Image
            source={require('../../assets/cleaning.png')} // Load image from assets
            style={[styles.buttonImage, { width: screenWidth }]} // Full width image
          />
          <Text style={styles.buttonText}>Room Cleaning</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('Maintenance')}>
          <Image
            source={require('../../assets/maintenence.png')} // Load image from assets
            style={[styles.buttonImage, { width: screenWidth }]} // Full width image
          />
          <Text style={styles.buttonText}>Maintenance</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('Mess')}>
          <Image
            source={require('../../assets/mess.jpeg')} // Load image from assets
            style={[styles.buttonImage, { width: screenWidth }]} // Full width image
          />
          <Text style={styles.buttonText}>Mess</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('Counselor')}>
          <Image
            source={require('../../assets/couceler.jpg')} // Load image from assets
            style={[styles.buttonImage, { width: screenWidth }]} // Full width image
          />
          <Text style={styles.buttonText}>Counselor</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  noticeBoard: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  noticeText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  noticeItem: {
    marginBottom: 15,
  },
  noticeTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007bff',
    marginBottom: 5,
  },
  noticeMessage: {
    fontSize: 14,
    color: '#666',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalDetails: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
  },
  buttonGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  button: {
    width: '48%',
    backgroundColor: '#fff',
    padding: 5,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  buttonImage: {
    height: 100, // Maintain an aspect ratio for the image
    resizeMode: 'contain', // Resize the image while keeping the aspect ratio
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default StudentDashboard;
