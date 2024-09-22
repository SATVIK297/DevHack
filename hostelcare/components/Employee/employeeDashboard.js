// import React, { useState, useEffect } from 'react';
// import axios from 'axios'; // Import Axios
// import { View, Text, ScrollView, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
// import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
// import { useSelector } from 'react-redux'; // Import useSelector to get employeeId from Redux

// const initialLayout = { width: Dimensions.get('window').width };

// const EmployeeDashboardPage = () => {
//   const [pendingRequests, setPendingRequests] = useState([]);
//   const [history, setHistory] = useState([]);

//   // Get employeeId from the Redux store
//   const employeeData = useSelector(state => state.employee.employeeData); // Adjust this to your actual state shape
//  //const employeeId = '66ef2cad6d960d4a7a293345';
//  console.log('idddddd',employeeData._id)

//  // Log the employee data to the console to verify if it's being fetched correctly
// //  console.log('Employee Data:', employeeData);
//   useEffect(() => {
//     if (employeeData._id) {
//       fetchServiceRequests();
//     }
//   }, [employeeData._id]);

//   const fetchServiceRequests = async () => {
//     try {
//       const response = await axios.get(`http://localhost:3000/api/v1/employee/request/${employeeData._id}`);
//       const { data } = response.data;
//       console.log('Fetched data:', data); // Log fetched data

//       const pending = data.filter(request => request.status === 'pending');
//       const completed = data.filter(request => request.status === 'completed');

//       setPendingRequests(pending);
//       setHistory(completed);
//     } catch (error) {
//       console.error('Failed to fetch service requests:', error);
//     }
//   };

//   const scanQRCode = (requestId) => {
//     console.log(`QR Code scanned for request ID: ${requestId}`);
//   };

//   const PendingRequests = () => (
//     <ScrollView style={styles.requestList}>
//       {pendingRequests.length === 0 ? (
//         <Text>No pending requests</Text>
//       ) : (
//         pendingRequests.map((request) => (
//           <View key={request._id} style={styles.requestCard}>
//             <Text>Date: {request.date}</Text>
//             <Text>Time: {request.time}</Text>
//             <Text>Description: {request.description}</Text>
//             <Text>
//               <Text style={styles.statusLabel}>Status: </Text>
//               <Text style={styles.pendingStatus}>{request.status}</Text>
//             </Text>
//             <TouchableOpacity style={styles.qrButton} onPress={() => scanQRCode(request._id)}>
//               <Text style={styles.qrButtonText}>Scan QR</Text>
//             </TouchableOpacity>
//           </View>
//         ))
//       )}
//     </ScrollView>
//   );

//   const RequestHistory = () => (
//     <ScrollView style={styles.requestList}>
//       {history.length === 0 ? (
//         <Text>No history available</Text>
//       ) : (
//         history.map((request) => (
//           <View key={request._id} style={styles.requestCard}>
//             <Text>Date: {request.date}</Text>
//             <Text>Time: {request.time}</Text>
//             <Text>
//               <Text style={styles.statusLabel}>Status: </Text>
//               <Text style={styles.completedStatus}>{request.status}</Text>
//             </Text>
//           </View>
//         ))
//       )}
//     </ScrollView>
//   );

//   const [index, setIndex] = useState(0);
//   const [routes] = useState([
//     { key: 'pending', title: 'Pending' },
//     { key: 'history', title: 'History' },
//   ]);

//   const renderScene = SceneMap({
//     pending: PendingRequests,
//     history: RequestHistory,
//   });

//   return (
//     <View style={styles.container}>
//       <TabView
//         navigationState={{ index, routes }}
//         renderScene={renderScene}
//         onIndexChange={setIndex}
//         initialLayout={initialLayout}
//         renderTabBar={(props) => (
//           <TabBar
//             {...props}
//             indicatorStyle={{ backgroundColor: '#007bff' }}
//             style={{ backgroundColor: '#fff' }}
//             activeColor="#007bff"
//             inactiveColor="#ccc"
//           />
//         )}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#ffffff',
//   },
//   requestList: {
//     padding: 20,
//   },
//   requestCard: {
//     backgroundColor: '#fff',
//     padding: 15,
//     borderRadius: 10,
//     marginBottom: 10,
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowRadius: 5,
//     shadowOffset: { width: 0, height: 2 },
//     elevation: 3,
//   },
//   statusLabel: {
//     fontWeight: 'bold',
//   },
//   pendingStatus: {
//     color: 'red',
//   },
//   completedStatus: {
//     color: 'green',
//   },
//   qrButton: {
//     marginTop: 10,
//     backgroundColor: '#007bff',
//     padding: 10,
//     borderRadius: 5,
//     alignItems: 'center',
//   },
//   qrButtonText: {
//     color: '#fff',
//     fontWeight: 'bold',
//   },
// });

// export default EmployeeDashboardPage;


import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios
import { View, Text, ScrollView, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { useSelector } from 'react-redux'; // Import useSelector to get employeeId from Redux

const initialLayout = { width: Dimensions.get('window').width };

const EmployeeDashboardPage = () => {
  const [pendingRequests, setPendingRequests] = useState([]);
  const [history, setHistory] = useState([]);

  // Get employeeId from the Redux store
  const employeeData = useSelector(state => state.employee.employeeData);

  useEffect(() => {
    if (employeeData._id) {
      fetchServiceRequests();
    }
  }, [employeeData._id]);

  const fetchServiceRequests = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/v1/employee/request/${employeeData._id}`);
      const { data } = response.data;
      console.log('Fetched data:', data);

      const pending = data.filter(request => request.status === 'pending');
      const completed = data.filter(request => request.status === 'completed');

      setPendingRequests(pending);
      setHistory(completed);
    } catch (error) {
      console.error('Failed to fetch service requests:', error);
    }
  };

  // Function to mark the service request as completed
  const markAsCompleted = async (requestId) => {
    try {
      const response = await axios.put(`http://localhost:3000/api/v1/employee/status/${requestId}`);
      console.log('Marked as completed:', response.data);

      // Fetch the updated list of requests
      fetchServiceRequests();
    } catch (error) {
      console.error('Failed to mark as completed:', error);
    }
  };

  const scanQRCode = (requestId) => {
    console.log(`QR Code scanned for request ID: ${requestId}`);
  };

  const PendingRequests = () => (
    <ScrollView style={styles.requestList}>
      {pendingRequests.length === 0 ? (
        <Text>No pending requests</Text>
      ) : (
        pendingRequests.map((request) => (
          <View key={request._id} style={styles.requestCard}>
            <Text>Date: {request.date}</Text>
            <Text>Time: {request.time}</Text>
            <Text>Description: {request.description}</Text>
            <Text>
              <Text style={styles.statusLabel}>Status: </Text>
              <Text style={styles.pendingStatus}>{request.status}</Text>
            </Text>
            
            {/* Scan QR Button */}
            <TouchableOpacity style={styles.qrButton} onPress={() => scanQRCode(request._id)}>
              <Text style={styles.qrButtonText}>Scan QR</Text>
            </TouchableOpacity>

            {/* Mark as Completed Button */}
            <TouchableOpacity style={styles.completeButton} onPress={() => markAsCompleted(request._id)}>
              <Text style={styles.completeButtonText}>Mark as Completed</Text>
            </TouchableOpacity>
          </View>
        ))
      )}
    </ScrollView>
  );

  const RequestHistory = () => (
    <ScrollView style={styles.requestList}>
      {history.length === 0 ? (
        <Text>No history available</Text>
      ) : (
        history.map((request) => (
          <View key={request._id} style={styles.requestCard}>
            <Text>Date: {request.date}</Text>
            <Text>Time: {request.time}</Text>
            <Text>
              <Text style={styles.statusLabel}>Status: </Text>
              <Text style={styles.completedStatus}>{request.status}</Text>
            </Text>
          </View>
        ))
      )}
    </ScrollView>
  );

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'pending', title: 'Pending' },
    { key: 'history', title: 'History' },
  ]);

  const renderScene = SceneMap({
    pending: PendingRequests,
    history: RequestHistory,
  });

  return (
    <View style={styles.container}>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
        renderTabBar={(props) => (
          <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: '#007bff' }}
            style={{ backgroundColor: '#fff' }}
            activeColor="#007bff"
            inactiveColor="#ccc"
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  requestList: {
    padding: 20,
  },
  requestCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  statusLabel: {
    fontWeight: 'bold',
  },
  pendingStatus: {
    color: 'red',
  },
  completedStatus: {
    color: 'green',
  },
  qrButton: {
    marginTop: 10,
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  qrButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  completeButton: {
    marginTop: 10,
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  completeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default EmployeeDashboardPage;
