import React from 'react';
import { SafeAreaView, StyleSheet, StatusBar, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store'; // Import Redux store and persistor
import Toast from 'react-native-toast-message';

// Import all necessary components
import SplashScreen from './components/splashScreen';
import LoginPage from './components/LoginPage/loginPage';
import StudentLoginPage from './components/Student/studentLoginPage';
import EmployeeLoginPage from './components/Employee/employeeLoginPage';
import WardenLoginPage from './components/Warden/wardenLoginPage';
import StudentRegistrationPage from './components/Student/newStudentRegistration';
import EmployeeRegistrationPage from './components/Employee/newEmployeeRegistration';
import WardenRegistrationPage from './components/Warden/newWardenRegistration';
import ForgotStudentPasscodePage from './components/Student/studentotpreset';
import ForgotEmployeePasscodePage from './components/Employee/employeeotpreset';
import ForgotWardenPasscodePage from './components/Warden/wardenotpreset';
import StudentDashboard from './components/Student/dasboard';
import EmployeeDashboardPage from './components/Employee/employeeDashboard';
import WardenDashboardPage from './components/Warden/wardenDashboard';
import RoomCleaning from './components/Student/Roomcleaning';
import Maintenance from './components/Student/Maintenance';
import Header from './components/Header'; // Header for Student Dashboard
import RoomCleanDetails from './components/Warden/roomCleanDetails';
import Counselor from './components/Student/counselor';
import MessChange from './components/Student/mess';




const Stack = createStackNavigator();

const App = () => {
  const handleProfilePress = () => {
    Alert.alert('Profile Icon Pressed', 'Navigate to profile page');
    // You can implement actual navigation to the profile page here
  };

  const handleBackPress = () => {
    Alert.alert('BackButton Icon Pressed');
  };

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#f0f0f0" />

            <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
              {/* Splash Screen */}
              <Stack.Screen name="Splash" component={SplashScreen} />

              {/* Login Pages */}
              <Stack.Screen name="Login" component={LoginPage} />
              <Stack.Screen name="StudentLogin" component={StudentLoginPage} />
              <Stack.Screen name="EmployeeLogin" component={EmployeeLoginPage} />
              <Stack.Screen name="WardenLogin" component={WardenLoginPage} />

              {/* Registration Pages */}
              <Stack.Screen name="StudentRegistration" component={StudentRegistrationPage} />
              <Stack.Screen name="EmployeeRegistration" component={EmployeeRegistrationPage} />
              <Stack.Screen name="WardenRegistration" component={WardenRegistrationPage} />

              {/* Forgot Passcode Pages */}
              <Stack.Screen name="StudentPasscodeReset" component={ForgotStudentPasscodePage} />
              <Stack.Screen name="EmployeePasscodeReset" component={ForgotEmployeePasscodePage} />
              <Stack.Screen name="WardenPasscodeReset" component={ForgotWardenPasscodePage} />

              {/* Student Dashboard */}
              <Stack.Screen name="StudentDashboard" options={{ headerShown: false }}>
                {({ navigation }) => (
                  <>
                    <Header
                      title="Student Dashboard"
                      onProfilePress={handleProfilePress}
                      onBackPress={() => navigation.navigate('StudentLogin')} // Navigate to StudentLogin
                    />
                    <StudentDashboard />
                  </>
                )}
              </Stack.Screen>

              {/* Employee Dashboard */}
              <Stack.Screen name="EmployeeDashboard" options={{ headerShown: false }}>
                {({ navigation }) => (
                  <>
                    <Header
                      title="Employee Dashboard"
                      onProfilePress={handleProfilePress}
                      onBackPress={() => navigation.navigate('EmployeeLogin')} // Navigate to EmployeeLogin
                    />
                    <EmployeeDashboardPage />
                  </>
                )}
              </Stack.Screen>

              {/* Warden Dashboard */}
              <Stack.Screen name="WardenDashboard" options={{ headerShown: false }}>
                {({ navigation }) => (
                  <>
                    <Header
                      title="Warden Dashboard"
                      onProfilePress={handleProfilePress}
                      onBackPress={() => navigation.navigate('WardenLogin')} // Navigate to WardenLogin
                    />
                    <WardenDashboardPage />
                  </>
                )}
              </Stack.Screen>

              {/* Room Cleaning Student Pages */}
              <Stack.Screen name="RoomCleaning" options={{ headerShown: false }}>
                {({ navigation }) => (
                  <>
                    <Header
                      title="Room Cleaning Request"
                      onProfilePress={handleProfilePress}
                      onBackPress={() => navigation.goBack()} // Use goBack function
                    />
                    <RoomCleaning />
                  </>
                )}
              </Stack.Screen>

              <Stack.Screen name="RoomCleanDetails" options={{ headerShown: false }}>
                {({ navigation }) => (
                  <>
                    <Header
                      title="Room Cleaning Details"
                      onProfilePress={handleProfilePress}
                      onBackPress={() => navigation.navigate('WardenDashboard')} // Navigate back to WardenDashboard
                    />
                    <RoomCleanDetails />
                  </>
                )}
              </Stack.Screen>


              {/* Maintenance Student Pages */}
              <Stack.Screen name="Maintenance" options={{ headerShown: false }}>
                {({ navigation }) => (
                  <>
                    <Header
                      title="Maintenance Request"
                      onProfilePress={handleProfilePress}
                      onBackPress={() => navigation.goBack()} // Use goBack function
                    />
                    <Maintenance />
                  </>
                )}
              </Stack.Screen>

              {/* Counselor Student Pages */}
              <Stack.Screen name="Counselor" options={{ headerShown: false }}>
                {({ navigation }) => (
                  <>
                    <Header
                      title="Counselor Details"
                      onProfilePress={handleProfilePress}
                      onBackPress={() => navigation.goBack()} // Use goBack function
                    />
                   <Counselor/>
                  </>
                )}
              </Stack.Screen>

              {/* Mess Change Student Pages */}
              <Stack.Screen name="MessChange" options={{ headerShown: false }}>
                {({ navigation }) => (
                  <>
                    <Header
                      title="Mess Request"
                      onProfilePress={handleProfilePress}
                      onBackPress={() => navigation.goBack()} // Use goBack function
                    />
                   <MessChange/>
                  </>
                )}
              </Stack.Screen>

            </Stack.Navigator>

            <Toast ref={(ref) => Toast.setRef(ref)} />
          </SafeAreaView>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
});

export default App;
