import React from 'react';
import { SafeAreaView, StyleSheet, StatusBar, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import StudentDashboard from './components/Student/dasboard'; // Import your StudentDashboard component
import RoomCleaning from './components/Student/Roomcleaning'; // Import the RoomCleaning page component
import Maintenance from './components/Student/Maintenance'; // Import the Maintenance page component
import Header from './components/Header'; // Import the Header component

const Stack = createStackNavigator();

const App = () => {
  const handleProfilePress = () => {
    Alert.alert('Profile Icon Pressed', 'Navigate to profile page');
    // You can implement actual navigation to the profile page here
  };

  return (
    <NavigationContainer>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#f0f0f0" />

        <Stack.Navigator initialRouteName="Dashboard">
          {/* Student Dashboard Screen */}
          <Stack.Screen name="Dashboard" options={{ headerShown: false }}>
            {() => (
              <>
                <Header title="Student Dashboard" onProfilePress={handleProfilePress} />
                <StudentDashboard />
              </>
            )}
          </Stack.Screen>

          {/* Room Cleaning Screen */}
          <Stack.Screen
            name="RoomCleaning"
            component={RoomCleaning}
            options={{ title: 'Room Cleaning Request' }}
          />

          {/* Maintenance Screen */}
          <Stack.Screen
            name="Maintenance"
            component={Maintenance}
            options={{ title: 'Maintenance Request' }} // This title will appear in the header
          />
        </Stack.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
});

export default App;
