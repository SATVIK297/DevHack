import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const LoginPage = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to HostelCare</Text>
      
      <TouchableOpacity style={[styles.button, { backgroundColor: '#FF5733' }]} onPress={() => navigation.navigate('StudentLogin')}>
        <Image source={require('../../assets/student.png')} style={styles.image} />
        <Text style={styles.buttonText}>Student</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={[styles.button, { backgroundColor: '#228B22' }]} onPress={() => navigation.navigate('EmployeeLogin')}> {/* Darker Green */}
        <Image source={require('../../assets/employee.png')} style={styles.image} />
        <Text style={styles.buttonText}>Employee</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={[styles.button, { backgroundColor: '#3357FF' }]} onPress={() => navigation.navigate('WardenLogin')}>
        <Image source={require('../../assets/warden.png')} style={styles.image} />
        <Text style={styles.buttonText}>Warden</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  button: {
    padding: 15, // Reduced padding
    margin: 10,
    borderRadius: 10,
    alignItems: 'center',
    width: '70%', // Reduced width
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    marginTop: 10,
  },
  image: {
    width: 50,
    height: 50,
  },
});

export default LoginPage;
