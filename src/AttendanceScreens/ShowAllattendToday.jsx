import {ActivityIndicator, FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import api from '../../API/Api';
const ShowAllattendToday = () => {
  const [data, setData] = useState([]);
  const [modal, setModal] = useState();
  const [loading, setLoading] = useState();
  const [message, setMessage] = useState();
  const FetchAttendance = async () => {
    await api
      .post('/attendance/ShowByDayMonthYear/')
      .then(res => {
        const Response = res.data.data;
        setData(Response);
        console.log(Response);
        setLoading(false)
      })
      .catch(err => {
        if(err.request.status === 0)
        {
          setLoading(false)
          setModal(true);
          setMessage("Check internet")
          const timer = setTimeout(()=>{
            setModal(false);
          },2000);
          return ()=>clearTimeout(timer);
        }
        if(err.request.status === 404)
          {
            setLoading(false)
            setModal(true);
            setMessage("Data not found")
            const timer = setTimeout(()=>{
              setModal(false);
            },2000);
            return ()=>clearTimeout(timer);
          }
          if(err.request.status === 503)
            {
              setLoading(false)
              setModal(true);
              setMessage("server error")
              const timer = setTimeout(()=>{
                setModal(false);
              },2000);
              return ()=>clearTimeout(timer);
            }
        
      });
  };

  useEffect(()=>{
    setLoading(true)
    FetchAttendance();
  },[]);

  const renderBox = ({item}) => (
    <View style={styles.DataBox}>
      <Text style={styles.text}>Name: {item.employeeDetails?.name || 'N/A'}</Text>
      <Text style={styles.text}>Advance: {item.advanceSalary}</Text>
      <Text style={styles.text}>Overtime: {item.overTime}</Text>
      <Text style={styles.text}>Attend Date: {item.attendDate}</Text>
    </View>
  );

  return (
    <View style={styles.Maincontainer}>
      <View style={styles.Headercontainer}>
        <Text style={styles.HeaderText}>Today Attendance</Text>
      </View>

      <View style={styles.Showcontainer}>
        {modal && (
                  <Modal animationType="slide" transparent={true} visible={true}>
                    <View style={styles.ModalBox1}>
                      <View style={styles.ModalBox2}>
                        <Text style={styles.Modalsessage}>{message}</Text>
                      </View>
                    </View>
                  </Modal>
                )}
        {loading && data.length === 0 ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <FlatList
            data={data}
            keyExtractor={item => item._id}
            renderItem={renderBox}
          />
        )}
      </View>
    </View>
  );
};

export default ShowAllattendToday;

const styles = StyleSheet.create({
  Maincontainer: {
    flex: 1,
  },
  Headercontainer: {
    height: 60,
    width: '100%',
    backgroundColor: '#27445D',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  HeaderText: {
    fontSize: 22,
    color: '#FAFAFA',
    fontFamily: 'Montserrat-SemiBold',
  },
  Showcontainer: {
    flex: 1,

    alignItems: 'center',
  },
  DataBox: {
    height: 150,
    width: 350,
    borderRadius: 10,
    backgroundColor: '#3674B5',
    justifyContent: 'center',
    paddingLeft: 15,
    marginTop: 16,
  },
  text: {
    fontSize: 20,
    color: '#FAFAFA',
    fontFamily: 'Montserrat-Regular',
  },
  ModalBox1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ModalBox2: {
    height: 100,
    width: 200,
    backgroundColor: '#0D92F4',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:10,
  },
  Modalsessage: {
    fontSize: 20,
    fontfamily: 'Montserrat-Medium',
    color: '#FAFAFA',
  },
});
