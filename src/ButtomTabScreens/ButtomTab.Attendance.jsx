import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
const stack = createStackNavigator();
import AttendanceMenuScreen from '../AttendanceScreens/AttendanceMenuScreen';
import CreateAttendance from '../AttendanceScreens/CreateAttendance';
import UpdateAttendance from '../AttendanceScreens/UpdateAttendance';
import ShowAllattendToday from '../AttendanceScreens/ShowAllattendToday';
import CreateAttendanceForm from '../AttendanceScreens/CreateAttendanceForm';
import UpdateAttendanceList from '../AttendanceScreens/UpdateAttendanceList';
import ShowAttendanceBydate from '../AttendanceScreens/ShowAttendanceBydate';
import ShowAttendanceByMonth from '../AttendanceScreens/ShowAttendanceByMonth';
import GetEmployee from '../AttendanceScreens/Getemployee';
import ShowAllattendance from '../AttendanceScreens/ShowAllattendance';
import AttendanceDelete from '../AttendanceScreens/AttendanceDelete';
import AttendanceFindForDelete from '../AttendanceScreens/AttendanceFindForDelete';
const Attendance = () => {
  return (
    <stack.Navigator screenOptions={{headerShown: false}}>
      <stack.Screen name="Attendance" component={AttendanceMenuScreen} />
      <stack.Screen name="CreateAttendance" component={CreateAttendance} />
      <stack.Screen name="CreateAttendanceForm" component={CreateAttendanceForm}/>
      <stack.Screen name="UpdateAttendanceList" component={UpdateAttendanceList}/>
      <stack.Screen name="ShowAttendanceBydate" component={ShowAttendanceBydate}/>
      <stack.Screen name="ShowAttendanceByMonth" component={ShowAttendanceByMonth}/>
      <stack.Screen name="GetEmployee" component={GetEmployee}/>
      <stack.Screen name="ShowAllattendance" component={ShowAllattendance}/>
      <stack.Screen name="UpdateAttendance" component={UpdateAttendance} />
      <stack.Screen name="ShowAllattendToday" component={ShowAllattendToday} />
      <stack.Screen name="AttendanceFindForDelete" component={AttendanceFindForDelete} />
      <stack.Screen name="AttendanceDelete" component={AttendanceDelete} />
    </stack.Navigator>
  );
};

export default Attendance;

const styles = StyleSheet.create({});
