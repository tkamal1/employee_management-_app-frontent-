import {
  ActivityIndicator,
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Image} from 'react-native';
import api from '../../API/Api';
import {useNavigation} from '@react-navigation/native';
const CreateAttendance = () => {
  const navigation = useNavigation();
  const [Data, setData] = useState([]);
  const [loding, setLoding] = useState(true);
  const [modal, setModal] = useState();
  const [message, setMessage] = useState();

  const FetchData = async () => {
    await api
      .get('/employee/allDataShow')
      .then(res => {
        const dataArray = res.data.data;
        console.log(dataArray);
        dataArray.forEach(item => {
          setData(prevData => {
            // Prevent duplicates by checking if _id already exists
            const exists = prevData.some(emp => emp._id === item._id);
            return exists ? prevData : [...prevData, item];
          });
        });
        setLoding(false);
      })
      .catch(err => {
        if (err.request.status === 0) {
          setLoding(false);
          setModal(true);
          setMessage('check internet');
          const timer = setTimeout(() => {
            setModal(false);
          }, 2000);
          return () => clearTimeout(timer);
        }

        if (err.request.status === 404) {
          setLoding(false);
          setModal(true);
          setMessage('Data not found');
          const timer = setTimeout(() => {
            setModal(false);
          }, 2000);
          return () => clearTimeout(timer);
        }

        if (err.request.status === 503) {
          setLoding(false);
          setModal(true);
          setMessage('Server error');
          const timer = setTimeout(() => {
            setModal(false);
          }, 2000);
          return () => clearTimeout(timer);
        }
      });
  };

  useEffect(() => {
    FetchData();
  }, []);

  const EmployeeBox = ({item}) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('CreateAttendanceForm', {
          employeeId: item._id,
          NAME: item.name,
        })
      }
      style={styles.EmpBox}>
      <View style={styles.DataBox1}>
        <Text style={styles.TextTitle}>Name: {item.name} </Text>
        <Text style={styles.TextTitle}>
          Role: {item.updates[item.updates.length - 1]?.category || 'N/A'}
        </Text>
      </View>
      <View style={styles.DataBox2}>
        <Image
          style={styles.Dot}
          source={require('../../TabBaricons/dot.png')}
        />
      </View>
    </TouchableOpacity>
  );
  return (
    <View style={styles.MainContainer}>
      {modal && (
        <Modal animationType="slide" transparent={true} visible={true}>
          <View style={styles.modalContainer}>
            <View style={styles.ModalBox}>
              <Text style={styles.ModalMessage}>{message}</Text>
            </View>
          </View>
        </Modal>
      )}

      {loding && Data.length === 0 ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={Data}
          keyExtractor={item => item._id}
          renderItem={EmployeeBox}
        />
      )}
    </View>
  );
};

export default CreateAttendance;

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    justifyContent: 'center',
    alignItems: 'center',
  },

  EmpBox: {
    height: 100,
    width: '95%',
    backgroundColor: '#81BFDA',
    borderRadius: 10,

    // paddingLeft:10,
    marginTop: 15,
    flexDirection: 'row',
    marginLeft: 13,
    elevation: 10,
  },
  DataBox1: {
    height: 100,
    width: '90%',
    // backgroundColor:"red",
    justifyContent: 'center',
    paddingLeft: 10,
  },
  DataBox2: {
    height: 100,
    width: '10%',
    // backgroundColor:"black",
  },
  Dot: {
    marginTop: 10,
    height: 20,
    width: 20,
    tintColor: '#347928',
  },
  TextTitle: {
    fontSize: 20,
    fontFamily: 'Montserrat-Medium',
    color: '#fafafa',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ModalBox: {
    height: 100,
    width: 200,
    backgroundColor: 'green',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ModalMessage: {
    fontSize: 22,
    fontFamily: 'Montserrat-Medium',
    color: '#FAFAFA',
  },
});
