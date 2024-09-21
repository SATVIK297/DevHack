// import React from 'react';
// import { SafeAreaView, StyleSheet, StatusBar, Alert } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import StudentDashboard from './components/Student/dasboard'; // Import your StudentDashboard component
// import RoomCleaning from './components/Student/Roomcleaning'; // Import the RoomCleaning page component
// import Maintenance from './components/Student/Maintenance'; // Import the Maintenance page component
// import Header from './components/Header'; // Import the Header component

// const Stack = createStackNavigator();

// const App = () => {
//   const handleProfilePress = () => {
//     Alert.alert('Profile Icon Pressed', 'Navigate to profile page');
//     // You can implement actual navigation to the profile page here
//   };

//   return (
//     <NavigationContainer>
//       <SafeAreaView style={styles.container}>
//         <StatusBar barStyle="dark-content" backgroundColor="#f0f0f0" />

//         <Stack.Navigator initialRouteName="Dashboard">
//           {/* Student Dashboard Screen */}
//           <Stack.Screen name="Dashboard" options={{ headerShown: false }}>
//             {() => (
//               <>
//                 <Header title="Student Dashboard" onProfilePress={handleProfilePress} />
//                 <StudentDashboard />
//               </>
//             )}
//           </Stack.Screen>

//           {/* Room Cleaning Screen */}
//           <Stack.Screen
//             name="RoomCleaning"
//             component={RoomCleaning}
//             options={{ title: 'Room Cleaning Request' }}
//           />

//           {/* Maintenance Screen */}
//           <Stack.Screen
//             name="Maintenance"
//             component={Maintenance}
//             options={{ title: 'Maintenance Request' }} // This title will appear in the header
//           />
//         </Stack.Navigator>
//       </SafeAreaView>
//     </NavigationContainer>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f0f0f0',
//   },
// });

// export default App;





// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import SplashScreen from './components/splashScreen';
// import LoginPage from './components/LoginPage/loginPage';
// import StudentLoginPage from './components/Student/studentLoginPage';
// import EmployeeLoginPage from './components/Employee/employeeLoginPage';
// import WardenLoginPage from './components/Warden/wardenLoginPage';
// import StudentRegistrationPage from './components/Student/newStudentRegistration';
// import EmployeeRegistrationPage from './components/Employee/newEmployeeRegistration';
// import WardenRegistrationPage from './components/Warden/newWardenRegistration';
// import ForgotStudentPasscodePage from './components/Student/studentotpreset';
// import ForgotEmployeePasscodePage from './components/Employee/employeeotpreset';
// import ForgotWardenPasscodePage from './components/Warden/wardenotpreset';
// import StudentDashboard from './components/Student/dasboard';
// import EmployeeDashboardPage from './components/Employee/employeeDashboard';
// import WardenDashboardPage from './components/Warden/wardenDashboard';

// const Stack = createStackNavigator();

// export default function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
//         <Stack.Screen name="Splash" component={SplashScreen} />
//         <Stack.Screen name="Login" component={LoginPage} />
//         <Stack.Screen name="StudentLogin" component={StudentLoginPage} />
//         <Stack.Screen name="EmployeeLogin" component={EmployeeLoginPage} />
//         <Stack.Screen name="WardenLogin" component={WardenLoginPage} />
//         <Stack.Screen name="StudentDashboard" component={StudentDashboard} />
//         <Stack.Screen name="EmployeeDashboard" component={EmployeeDashboardPage} />
//         <Stack.Screen name="WardenDashboard" component={WardenDashboardPage} />
//         <Stack.Screen name="StudentPasscodeReset" component={ForgotStudentPasscodePage} />
//         <Stack.Screen name="EmployeePasscodeReset" component={ForgotEmployeePasscodePage} />
//         <Stack.Screen name="WardenPasscodeReset" component={ForgotWardenPasscodePage} />
//         <Stack.Screen name="StudentRegistration" component={StudentRegistrationPage} />
//         <Stack.Screen name="EmployeeRegistration" component={EmployeeRegistrationPage} />
//         <Stack.Screen name="WardenRegistration" component={WardenRegistrationPage} />

//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }




import React from 'react';
import { SafeAreaView, StyleSheet, StatusBar, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

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
            {() => (
              <>
                <Header title="Student Dashboard" onProfilePress={handleProfilePress} />
                <StudentDashboard />
              </>
            )}
          </Stack.Screen>

          {/* Employee Dashboard */}
          <Stack.Screen name="EmployeeDashboard" component={EmployeeDashboardPage} />

          {/* Warden Dashboard */}
          <Stack.Screen name="WardenDashboard" component={WardenDashboardPage} />

          {/* Additional Student Pages */}
          <Stack.Screen name="RoomCleaning" component={RoomCleaning} options={{ title: 'Room Cleaning Request' }} />
          <Stack.Screen name="Maintenance" component={Maintenance} options={{ title: 'Maintenance Request' }} />
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
