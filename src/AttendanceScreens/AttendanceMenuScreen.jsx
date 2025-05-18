import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

const AttendanceMenuScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.MainContainer}>
      <View style={styles.Box1}>
        <TouchableOpacity
          style={styles.CreateButton1}
          onPress={() => navigation.navigate('CreateAttendance')}>
          <Text style={styles.TitleText}>Create</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('UpdateAttendanceList')}
          style={styles.CreateButton2}>
          <Text style={styles.TitleText}>Update</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.Box1}>
        <TouchableOpacity
          onPress={() => navigation.navigate('ShowAllattendToday')}
          style={styles.CreateButton3}>
          <Text style={styles.TitleText}>Show Today</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('ShowAttendanceBydate')}
          style={styles.CreateButton4}>
          <Text style={styles.TitleText}>By Date</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.Box1}>
        <TouchableOpacity
          onPress={() => navigation.navigate('ShowAttendanceByMonth')}
          style={styles.CreateButton5}>
          <Text style={styles.TitleText}>By Month</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('GetEmployee')}
          style={styles.CreateButton6}>
          <Text style={styles.TitleText}>Total Attend</Text>
        </TouchableOpacity>
      </View>


      <View style={styles.Box1}>
        <TouchableOpacity
          onPress={() => navigation.navigate('AttendanceFindForDelete')}
          style={styles.CreateButton7}>
          <Text style={styles.TitleText}>Delete Attendance</Text>
        </TouchableOpacity>
        
      </View>
    </View>
  );
};

export default AttendanceMenuScreen;

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  Box1: {
    height: "15%",
    width: '100%',
    // backgroundColor:"red",
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: 6,
  },
  CreateButton1: {
    height: "80%",
    width: "40%",
    backgroundColor: '#AA60C8',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  CreateButton2: {
    height: "80%",
    width: "40%",
    backgroundColor: '#3674B5',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  CreateButton3: {
    height: "80%",
    width: "40%",
    backgroundColor: '#F0A04B',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  CreateButton4: {
    height: "80%",
    width: "40%",
    backgroundColor: '#2A3663',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  CreateButton5: {
    height: "80%",
    width: "40%",
    backgroundColor: '#000000',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  CreateButton6: {
    height: "80%",
    width: "40%",
    backgroundColor: '#73C7C7',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  CreateButton7: {
    height: "80%",
    width: "40%",
    backgroundColor: '#A31D1D',
    borderRadius: 8,
    justifyContent: 'center',
    // alignItems: 'center',
  },

  TitleText: {
    fontSize: 22,
    fontFamily: 'Montserrat-SemiBold',
    color: '#FAFAFA',
    textAlign:"center",
  },

});
