import {
  ActivityIndicator,
  Button,
  Image,
  Modal,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Calcuate from '../../TabBaricons/Cal.svg';
import api from '../../API/Api';
const Home = () => {
  const [totalEmpdata, setTotalEmpdata] = useState();
  const [totalattendance, setTotalattendance] = useState();
  const [totalOvertime, setTotalOvertime] = useState();
  const [totalAdvance, setTotaladvance] = useState();
  const [Todaytotal, setTodayTotalattend] = useState();
  const [loading, setLoading] = useState();
  const [loading2, setLoading2] = useState();
  const [loading3, setLoading3] = useState();
  const [modalVisible, setModalVisible] = useState();

  const getCurrentDate = () => {
    const today = new Date();
    const date = today.getDate();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const dayNames = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    const dayName = dayNames[today.getDay()];
    return {date: `${date}/${month}/${year}`, day: dayName};
  };
  const {date, day} = getCurrentDate();

  const totalEmployee = async () => {
    setLoading3(true);
    await api
      .get('/employee/allDataShow')
      .then(res => {
        setLoading3(false);
        const allemp = res.data.data;
        setTotalEmpdata(allemp.length);
        console.log(allemp.length);
      })
      .catch(err => {
        setLoading3(false);
      });
  };

  const thismonthtotal = async () => {
    setLoading(true);
    await api
      .get('/attendance/allDataShow')
      .then(res => {
        console.log(res.data.data);
        setTotaladvance(res.data.data.totalAdvanceSalary);
        setTotalattendance(res.data.data.totalAttend);
        setTotalOvertime(res.data.data.totalOverTime);
        setLoading(false);
        console.log('alltotal data', alltotal);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  };
  const TodayTotalAttend = async () => {
    setLoading2(true);
    await api
      .post('/attendance/ShowByDayMonthYear/')
      .then(res => {
        setLoading2(false);
        const today = res.data.data;
        setTodayTotalattend(today.length);
      })
      .catch(err => {
        setLoading2(false);
      });
  };

  useEffect(() => {
    totalEmployee();
    thismonthtotal();
    TodayTotalAttend();
  },[]);

  return (
    <SafeAreaView style={styles.HomeMainContainer}>
      <StatusBar
        animated={true}
        backgroundColor="red"
        hidden={false}
        barStyle={'dark-content'}
        translucent={true}
        showHideTransition="fade"
        />

      <View style={styles.ProfileContainer}>
        {modalVisible && (
          <Modal
            animationType="slide" // Options: 'slide', 'fade', 'none'
            transparent={true} // Makes background transparent
            visible={true} // Controls visibility
            onRequestClose={() => setModalVisible(false)}>
            <View style={styles.Modalcontainer}>
              <View style={styles.ModalBox}>
                <Text style={styles.Modaltext}>hello</Text>
                <Button title="Close" onPress={() => setModalVisible(false)} />
              </View>
            </View>
          </Modal>
        )}
        <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={styles.ProfileBox}>
          <Image
            style={styles.image}
            source={require('../../TabBaricons/profile.png')}
          />
        </TouchableOpacity>
        <View style={styles.DateBox}>
          <Text style={styles.DateText1}>{day} </Text>
          <Text style={styles.DateText2}>{date}</Text>
        </View>
      </View>

      <View style={styles.AttendanceContainer}>
        <View style={styles.attendBox}>
          <Text style={styles.attendText}>Total Employee:</Text>

          {loading3 ? (
            <ActivityIndicator size="large" color="blue" />
          ) : (
            <Text style={styles.attendText}>{totalEmpdata}</Text>
          )}
        </View>
        <View style={styles.attendBox}>
          <Text style={styles.attendText}>Today total Attend:</Text>

          {loading2 ? (
            <ActivityIndicator size="large" color="blue" />
          ) : (
            <Text style={styles.attendText}>{Todaytotal}</Text>
          )}
        </View>
      </View>

      <View style={styles.DynamicDataContainer}>
        <View style={styles.UserBox}>
          <View style={{height: 40, width: '100%'}}>
            <Text
              style={{
                fontSize: 20,
                fontFamily: 'Poppins-Medium',
                color: '#4C585B',
                textAlign: 'center',
              }}>
              User
            </Text>
          </View>
          <Text style={styles.UserText}>tridib kamal </Text>
        </View>
        <View style={styles.AlltotalBox}>
          <View style={styles.totalBox}>
            <Text style={styles.totalText}>This Month Total Attend</Text>

            {loading ? (
              <ActivityIndicator size="large" color="blue" />
            ) : (
              <Text style={styles.totalText}>{totalattendance}</Text>
            )}
          </View>
          <View style={styles.totalBox}>
            <Text style={styles.totalText}>This Month Total Overtime</Text>

            {loading ? (
              <ActivityIndicator size="large" color="blue" />
            ) : (
              <Text style={styles.totalText}>{totalOvertime}</Text>
            )}
          </View>
          <View style={styles.totalBox}>
            <Text style={styles.totalText}>This Month Total Advance</Text>

            {loading ? (
              <ActivityIndicator size="large" color="blue" />
            ) : (
              <Text style={styles.totalText}>{totalAdvance}</Text>
            )}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  HomeMainContainer: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    paddingTop: Platform.OS === 'android' ? 25 : 0, // Prevents content overlap with StatusBar
  },
  
  Modalcontainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)', // Added background overlay for better modal visibility
  },

  ModalBox: {
    height: 200,
    width: 300,
    backgroundColor: '#fafafa',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20, // Added padding for better spacing inside modal
  },

  Modaltext: {
    fontSize: 22,
    paddingBottom: 10,
    fontFamily: 'Poppins-Medium',
    color: '#333', // Added color for better visibility
  },

  ProfileContainer: {
    height: 150,
    width: '100%',
    marginTop: 10,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
  },

  ProfileBox: {
    height: 140,
    width: '30%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  DateBox: {
    height: 140,
    width: '60%',
    backgroundColor: '#E9762B',
    borderRadius: 20,
    elevation: 5, // Improved elevation for better shadow effect
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    justifyContent: 'center',
    alignItems: 'center',
  },

  DateText1: {
    fontSize: 23,
    color: '#F1F0E9',
    fontFamily: 'Montserrat-SemiBold',
  },

  DateText2: {
    fontSize: 30,
    color: '#F1F0E9',
    fontFamily: 'Poppins-Bold',
  },

  image: {
    height: 90,
    width: 90,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#211C84',
  },

  attendBox: {
    height: 50,
    width: '95%',
    backgroundColor: '#C7D9DD',
    borderRadius: 10,
    elevation: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },

  AttendanceContainer: {
    height: 120,
    width: '100%',
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'space-around',
  },

  attendText: {
    fontSize: 20,
    fontFamily: 'Poppins-Medium',
    color: '#4C585B',
  },

  DynamicDataContainer: {
    height: 250,
    width: '100%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 10,
  },

  UserBox: {
    height: 250,
    width: '37%',
    backgroundColor: '#C7D9DD',
    borderRadius: 10,
    elevation: 3,
    paddingVertical: 15, // Added padding for better layout
    paddingHorizontal: 10,
  },

  AlltotalBox: {
    height: 250,
    width: '58%',
    backgroundColor: '#C7D9DD',
    borderRadius: 10,
    elevation: 3,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingVertical: 10, // Added padding
  },

  UserText: {
    fontSize: 20,
    textAlign: 'center',
    fontFamily: 'Poppins-Medium',
    color: '#4C585B',
  },

  totalBox: {
    height: 70,
    width: '93%',
    backgroundColor: '#C7D9DD',
    elevation: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  totalText: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    color: '#4C585B',
  },
});
