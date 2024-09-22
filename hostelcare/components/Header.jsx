

// import React from 'react';
// import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
// import Ionicons from 'react-native-vector-icons/Ionicons'; // Import the icon library

// const Header = ({ title, onProfilePress, onBackPress }) => {
//   return (
//     <View style={styles.headerContainer}>
//       <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
//         <Ionicons name="arrow-back" size={24} color="#fff" /> {/* Use an icon here */}
//       </TouchableOpacity>
//       <Text style={styles.headerText}>{title}</Text>
//       <TouchableOpacity onPress={onProfilePress}>
//         <Image
//           source={require('../assets/profile.png')}
//           style={styles.profileIcon}
//         />
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   headerContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 20,
//     backgroundColor: '#007BFF', // Blue background color
//     borderBottomColor: '#ccc',
//     borderBottomWidth: 1,
//     elevation: 2,
//   },
//   backButton: {
//     position: 'absolute',
//     left: 20,
//     padding: 10,
//   },
//   headerText: {
//     flex: 1,
//     textAlign: 'center',
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#fff', // White text color for contrast
//   },
//   profileIcon: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//   },
// });

// export default Header;



import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Header = ({ title, onProfilePress, onBackPress }) => {
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="#fff" />
      </TouchableOpacity>
      <Text style={styles.headerText}>{title}</Text>
      <TouchableOpacity onPress={onProfilePress}>
        <Image
          source={require('../assets/profile.png')}
          style={styles.profileIcon}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20, // Adjusted to ensure the button is vertically centered
    backgroundColor: '#007BFF',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    elevation: 2,
  },
  backButton: {
    padding: 10,
    // Added a margin to ensure it's well spaced from the edges
    marginLeft: 10,
  },
  headerText: {
    flex: 1,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  profileIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});

export default Header;
