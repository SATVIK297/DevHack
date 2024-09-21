import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

export default function SplashScreen({ navigation }) {
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial opacity value

  useEffect(() => {
    // Start fade-in animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000, // Animation duration of 2 seconds
      useNativeDriver: true, // Use native driver for performance
    }).start(() => {
      // After animation ends, wait 1 second and navigate to Login
      setTimeout(() => {
        navigation.replace('Login'); // Replace current screen with Login
      }, 1000);
    });
  }, [fadeAnim]);

  return (
    <View style={styles.container}>
      <Animated.Text style={[styles.title, { opacity: fadeAnim }]}>
        HostelCare
      </Animated.Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2196F3', // Blue background for splash screen
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
  },
});
