import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  RefreshControl,
  ActivityIndicator,
  Modal,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Add from '../../TabBaricons/add.svg';
import Plus from '../../TabBaricons/plus.png';
import {Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import api from '../../API/Api';

const ShowEmployee = () => {
  const navigation = useNavigation();
  const [Data, setData] = useState([]);
  const [error, setError] = useState();
  const [refreshing, setRefreshing] = useState(false);
  const [load, setLoad] = useState(true);
  const [message, setMessage] = useState();

  const FetchData = async () => {
    await api
      .get('/employee/allDataShow/')
      .then(res => {
        const dataArray = res.data.data;
        dataArray.forEach(item => {
          setData(prevData => {
            // Prevent duplicates by checking if _id already exists
            const exists = prevData.some(emp => emp._id === item._id);
            return exists ? prevData : [...prevData, item];
          });
        });
        setRefreshing(false);
        setLoad(false);
      })
      .catch(err => {
        if (err.request.status === 0) {
          setError(true);
          setMessage('Check Internet');

          const timer = setTimeout(() => {
            setError(false);
            setRefreshing(false);
            setLoad(false);
          }, 5000);
          return () => clearTimeout(timer);
        }
        if(err.request.status === 503)
          {
            setError(true);
            setMessage('server error');
  
            const timer = setTimeout(() => {
              setError(false);
              setRefreshing(false);
              setLoad(false);
            }, 5000);
            return () => clearTimeout(timer);
          }
        setRefreshing(false);
        setLoad(false);
      })
      
  };

  useEffect(() => {
    FetchData();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    setData([]); // Clear previous data (optional)
    FetchData();
  };

  const renderItems = ({item}) => (
    <View style={styles.ViewBox}>
      <View style={styles.ViewDataBox}>
        <Text style={styles.EmpData}>Name: {item.name}</Text>
        <Text style={styles.EmpData}>
          Role:
          {item.updates[item.updates.length - 1]?.category || 'N/A'}
        </Text>
        <Text style={styles.EmpData}>Phone: {item.phone}</Text>
        <Text style={styles.EmpData}>Join Date: {item.joinDate}</Text>
        <Text style={styles.EmpData}>
          Salary: ₹{item.updates[item.updates.length - 1]?.salary || 'N/A'}
        </Text>
      </View>
      <View style={styles.ViewDataBoxIcon}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('UpdateEmployee', {
              employeeId: item._id,
              NAME: item.name,
            })
          }>
          <Image
            source={require('../../TabBaricons/edit(2).png')}
            style={{
              height: 40,
              width: 40,
              tintColor: 'yellow',
              marginTop: 10,
            }}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            navigation.navigate('EmployeeHistory', {
              employeeId: item._id,
              NAME: item.name,
            })
          }>
          <Image
            source={require('../../TabBaricons/history.png')}
            style={{
              height: 40,
              width: 40,
              tintColor: 'yellow',
              marginTop: 10,
            }}
          />
        </TouchableOpacity>

      </View>
    </View>
  );

  return (
    <View style={styles.ShowEmployeeContainer}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.AddemployeeButton}
          onPress={() => navigation.navigate('AddEmployee')}>
          <Image
            source={require('../../TabBaricons/plus.png')}
            style={{
              height: 40,
              width: 40,
              tintColor: 'white',
            }}
          />
          <Text style={styles.AddemployeeButtonText}>Add-employee</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.EmployeeListContainer}>
        {error && (
          <Modal animationType="fade" transparent={true} visible={true}>
            <View style={styles.ModalContainer}>
              <View style={styles.modalBox}>
                <Text style={styles.modalMessage}>{message}</Text>
              </View>
            </View>
          </Modal>
        )}
        {load && Data.length === 0 ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <FlatList
            data={Data}
            keyExtractor={item => item._id}
            renderItem={renderItems}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />
        )}
      </View>
    </View>
  );
};

export default ShowEmployee;

const styles = StyleSheet.create({
  ShowEmployeeContainer: {
    // backgroundColor: 'green',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  AddemployeeButton: {
    height: 80,
    width: 300,
    backgroundColor: '#3E7C17',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    elevation: 5,
  },
  AddemployeeButtonText: {
    color: '#FAFAFA',
    fontSize: 20,
    textTransform: 'uppercase',
  },
  buttonContainer: {
    height: '16%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',

    // backgroundColor:"red",
  },
  EmployeeListContainer: {
    height: '84%',
    width: '100%',
    justifyContent: 'center',
    paddingLeft: 20,

    // alignItems: 'center',
   
  },
  ScrollViewContainer: {
    marginTop: 10,
  },
  ViewBox: {
    height: 210,
    width: '95%',
    backgroundColor: '#1C325B',
    marginTop: 15,
    // justifyContent: 'center',
    // paddingLeft: 16,
    borderRadius: 10,
    elevation: 8,
    flexDirection: 'row',
    // alignItems: 'center',
  },
  ViewDataBox: {
    height: '100%',
    width: '85%',
    justifyContent: 'center',
    paddingLeft: 18,
    // backgroundColor:"yellow"
  },
  ViewDataBoxIcon: {
    height: '100%',
    width: '15%',
    // backgroundColor: 'red',
  },
  ImageIcon: {
    height: 20,
    width: 20,
  },
  EmpData: {
    fontSize: 22,
    color: '#FAFAFA',
    fontFamily: 'Montserrat-Regular',
  },
  ModalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    height: 100,
    width: 200,
    backgroundColor: '#AA60C8',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  modalMessage: {
    fontSize: 20,
    fontFamily: 'Montserrat-SemiBold',
    color: '#FBFBFB',
    textAlign: 'center',
  },
});
