import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, Modal, Button, Dimensions, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const WardenDashboardPage = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedNotice, setSelectedNotice] = useState({});
  const [notices, setNotices] = useState([]);
  const [newNoticeTitle, setNewNoticeTitle] = useState('');
  const [newNoticeDetails, setNewNoticeDetails] = useState('');
  const [showNoticeFields, setShowNoticeFields] = useState(false);

  // Handle notice press and open modal
  const handleNoticePress = (notice) => {
    setSelectedNotice(notice);
    setModalVisible(true);
  };

  // Handle button press for different sections
  const handleButtonPress = (section) => {
    console.log(`Button pressed: ${section}`);
    if (section === 'Room Cleaning') {
      navigation.navigate('RoomCleanDetails'); // Adjust to the correct name
    }
  };

  // Function to add a new notice
  const addNotice = () => {
    if (newNoticeTitle && newNoticeDetails) {
      const newNotice = {
        id: notices.length + 1, // Simple ID generation
        title: newNoticeTitle,
        details: newNoticeDetails,
      };
      setNotices([...notices, newNotice]);
      setNewNoticeTitle('');
      setNewNoticeDetails('');
      setShowNoticeFields(false); // Hide fields after notice creation
    }
  };

  // Function to delete a notice
  const deleteNotice = () => {
    setNotices(notices.filter((notice) => notice.id !== selectedNotice.id));
    setModalVisible(false);
  };

  const screenWidth = Dimensions.get('window').width * 0.48;

  return (
    <View style={styles.container}>
      {/* Notice Board */}
      <View style={styles.noticeBoard}>
        <Text style={styles.noticeText}>Notice Board</Text>
        <ScrollView style={styles.noticeScroll}>
          {notices.map((notice) => (
            <TouchableOpacity key={notice.id} onPress={() => handleNoticePress(notice)}>
              <View style={styles.noticeItem}>
                <Text style={styles.noticeTitle}>{notice.title}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Create Notice Button */}
        {!showNoticeFields && (
          <Button title="Create Notice" onPress={() => setShowNoticeFields(true)} />
        )}

        {/* Notice fields */}
        {showNoticeFields && (
          <View style={styles.noticeButtonContainer}>
            <TextInput
              placeholder="Notice Title"
              value={newNoticeTitle}
              onChangeText={setNewNoticeTitle}
              style={styles.input}
            />
            <TextInput
              placeholder="Notice Details"
              value={newNoticeDetails}
              onChangeText={setNewNoticeDetails}
              style={[styles.input, styles.textArea]}
              multiline
            />
            <Button title="Submit Notice" onPress={addNotice} />
          </View>
        )}

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
              <Button title="Delete Notice" onPress={deleteNotice} color="red" />
              <Button title="Close" onPress={() => setModalVisible(false)} />
            </View>
          </View>
        </Modal>
      </View>

      {/* Button Grid */}
      <View style={styles.buttonGrid}>
        <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('Room Cleaning')}>
          <Image
            source={require('../../assets/cleaning.png')}
            style={[styles.buttonImage, { width: screenWidth }]}
          />
          <Text style={styles.buttonText}>Room Cleaning</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('Maintenance')}>
          <Image
            source={require('../../assets/maintenence.png')}
            style={[styles.buttonImage, { width: screenWidth }]}
          />
          <Text style={styles.buttonText}>Maintenance</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('Mess')}>
          <Image
            source={require('../../assets/mess.jpeg')}
            style={[styles.buttonImage, { width: screenWidth }]}
          />
          <Text style={styles.buttonText}>Mess</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('Counselor')}>
          <Image
            source={require('../../assets/couceler.jpg')}
            style={[styles.buttonImage, { width: screenWidth }]}
          />
          <Text style={styles.buttonText}>Counselor</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  noticeScroll: {
    maxHeight: 130,
  },
  noticeButtonContainer: {
    marginTop: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  textArea: {
    height: 80,
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
    height: 100,
    resizeMode: 'contain',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default WardenDashboardPage;
