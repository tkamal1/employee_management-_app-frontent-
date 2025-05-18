import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';

import api from '../../API/Api';
const AttendanceDelete = ({route}) => {
  const {AttendanceId, name, attendDate} = route.params || {}; // Get employeeId safely
  console.log(AttendanceId);
  const [modal, setModal] = useState(false);
  const [message, setMessage] = useState();

  const handleDeleteAttendance = () => {
    Alert.alert(
      'Delete Attendance',
      'Are you sure you want to delete this attendance?',
      [
        {
          text: 'No',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: async () => {
            setMessage('Please wait...');
            setModal(true);
            await deleteAttendance();
          },
          style: 'destructive',
        },
      ],
    );
  };

  const deleteAttendance = async () => {
    console.log('function call ');
    await api
      .delete('/attendance/delete', {
        data: {attendanceId: AttendanceId},
      })
      .then(res => {
        console.log(res.data);
        setMessage('Done');
        const timer = setTimeout(() => {
          setModal(false);
        }, 2000);
        return () => clearTimeout(timer);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <View style={styles.MainContainer}>
      <View style={styles.headerContainer}>
        <Text style={styles.headertext}>Delete Attendance</Text>
      </View>

      <View style={styles.DeleteContainer}>
        {modal && (
          <Modal transparent={true} visible={true} animationType="slide">
            <View style={styles.modalContainer}>
              <View style={styles.modalBox}>
                <Text style={styles.modaltext}>{message}</Text>
              </View>
            </View>
          </Modal>
        )}

        <View style={styles.DeleteBox}>
          <View style={styles.TextBox}>
            <Text style={styles.titleText}>Name: {name}</Text>
            <Text style={styles.titleText}>Attend Date: {attendDate}</Text>
          </View>
          <TouchableOpacity
            onPress={handleDeleteAttendance}
            style={styles.DeleteButton}>
            <Text style={styles.ButtonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default AttendanceDelete;
// /attendance/delete
// attendanceId
const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
  },
  headerContainer: {
    height: 80,
    width: '100%',
    backgroundColor: '#690B22',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomRightRadius: 16,
    borderBottomLeftRadius: 16,
  },
  headertext: {
    fontSize: 22,
    fontFamily: 'Montserrat-Medium',
    color: '#fafafa',
  },
  DeleteContainer: {
    flex: 1,
    alignItems: 'center',
  },
  DeleteBox: {
    height: 200,
    width: '90%',
    backgroundColor: '#fafafa',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 18,
    elevation: 10,
    borderRadius: 10,
  },
  TextBox: {
    height: 80,
    width: '100%',
    // backgroundColor:"red",
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 18,
    fontFamily: 'Roboto-Medium',
  },
  DeleteButton: {
    height: 60,
    width: '70%',
    backgroundColor: '#690B22',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
  ButtonText: {
    fontSize: 25,
    fontFamily: 'Montserrat-SemiBold',
    color: '#fafafa',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    height: 100,
    width: 200,
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  modaltext: {
    fontSize: 20,
    fontFamily: 'Montserrat-SemiBold',
    color: '#fafafa',
  },
});
