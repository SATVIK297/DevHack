// import React from 'react';
// import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import Icon from 'react-native-vector-icons/Ionicons'; // Import the Ionicons icon set

// export default function StudentLoginPage() {
//   const navigation = useNavigation();

//   const handleLogin = () => {
//     // Add your login logic here
//     navigation.navigate('StudentDashboard'); // Navigate to Dashboard
//   };

//   return (
//     <View style={styles.container}>
//       <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
//         <Icon name="arrow-back" size={24} color="#2196F3" />
//       </TouchableOpacity>

//       <Image source={require('../../assets/student.png')} style={styles.image} />
//       <Text style={styles.title}>Student Login</Text>
      
//       <TextInput
//         style={styles.input}
//         placeholder="Email ID"
//         keyboardType="email-address"
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Passcode (6 digits)"
//         secureTextEntry
//         maxLength={6} // Restrict to 6 digits
//       />

//       <TouchableOpacity style={styles.button} onPress={handleLogin}>
//         <Text style={styles.buttonText}>Login</Text>
//       </TouchableOpacity>

//       <TouchableOpacity onPress={() => navigation.navigate('StudentPasscodeReset')}>
//         <Text style={styles.link}>Forgot passcode?</Text>
//       </TouchableOpacity>

//       <TouchableOpacity onPress={() => navigation.navigate('StudentRegistration')}>
//         <Text style={styles.link}>New student registration</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//     padding: 20,
//   },
//   backButton: {
//     position: 'absolute',
//     top: 20, // Position it at the top
//     left: 20, // Position it to the left
//     zIndex: 1, // Ensure it’s above other elements
//   },
//   image: {
//     width: 100, // Adjust as needed
//     height: 100, // Adjust as needed
//     marginBottom: 20, // Space between the image and title
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   input: {
//     width: '100%',
//     padding: 15,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 5,
//     marginBottom: 15,
//   },
//   button: {
//     backgroundColor: '#4CAF50',
//     padding: 15,
//     borderRadius: 5,
//     width: '100%',
//     alignItems: 'center',
//   },
//   buttonText: {
//     color: '#fff',
//     fontWeight: 'bold',
//   },
//   link: {
//     color: '#2196F3',
//     marginTop: 10,
//   },
// });


import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons'; // Import the Ionicons icon set

export default function StudentLoginPage() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const handleLogin = () => {
    // Check if the email is valid
    if (email.endsWith('@vitstudent.ac.in')) {
      navigation.navigate('StudentDashboard'); // Navigate to Dashboard
    } else {
      setEmailError('Please enter a valid email ending with @vitstudent.ac.in');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Icon name="arrow-back" size={24} color="#2196F3" />
      </TouchableOpacity>

      <Image source={require('../../assets/student.png')} style={styles.image} />
      <Text style={styles.title}>Student Login</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Email ID"
        keyboardType="email-address"
        value={email}
        onChangeText={(text) => {
          setEmail(text);
          if (text.endsWith('@vitstudent.ac.in') || text === '') {
            setEmailError(''); // Clear error if valid
          } else {
            setEmailError('Please enter a valid email ending with @vitstudent.ac.in');
          }
        }}
      />
      {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

      <TextInput
        style={styles.input}
        placeholder="Passcode (6 digits)"
        secureTextEntry
        maxLength={6} // Restrict to 6 digits
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('StudentPasscodeReset')}>
        <Text style={styles.link}>Forgot passcode?</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('StudentRegistration')}>
        <Text style={styles.link}>New student registration</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 1,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  link: {
    color: '#2196F3',
    marginTop: 10,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});
