import {
  ActivityIndicator,
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {Formik} from 'formik';
import * as Yup from 'yup';
import api from '../../API/Api';
import {useNavigation} from '@react-navigation/native';
const validationSchema = Yup.object().shape({
  dd: Yup.number().positive().integer(),
  mm: Yup.number().positive().integer(),
  yyyy: Yup.number().positive().integer(),
});

const UpdateAttendanceList = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState();
  const [data, setData] = useState([]);
  const [modal, setModal] = useState();
  const [message, setMessage] = useState();

  const FetchEmployee = async values => {
    await api
      .post('/attendance/ShowByDayMonthYear/', {
        D: values.dd,
        M: values.mm,
        Y: values.yyyy,
      })
      .then(res => {
        const allData = res.data.data;
        setData(allData);
        console.log(allData);
        setLoading(false);
        if (allData.length === 0) {
          setModal(true);
          setMessage('Empty Attendance');
          const timer = setTimeout(() => {
            setModal(false);
          }, 2000);
          return () => clearTimeout(timer);
        }
      })
      .catch(err => {
        if (err.request.status === 0) {
          setModal(true);
          setMessage('Check internet');
          setLoading(false);
          const timer = setTimeout(() => {
            setModal(false);
          }, 2000);
          return () => clearTimeout(timer);
        }
        if (err.request.status === 404) {
          setModal(true);
          setMessage('Data not found');
          setLoading(false);
          const timer = setTimeout(() => {
            setModal(false);
          }, 2000);
          return () => clearTimeout(timer);
        }
        if (err.request.status === 503) {
          setModal(true);
          setMessage('Server error');
          setLoading(false);
          const timer = setTimeout(() => {
            setModal(false);
          }, 2000);
          return () => clearTimeout(timer);
        }
      });
  };

  const RenderBox = ({item}) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('UpdateAttendance', {
          AttendanceId: item._id,
          name: item.employeeDetails?.name || 'N/A',
        })
      }
      style={styles.DataBox}>
      <Text style={styles.Textdata}>
        Name: {item.employeeDetails?.name || 'N/A'}
      </Text>
      <Text style={styles.Textdata}>Advance: {item.advanceSalary} </Text>
      <Text style={styles.Textdata}>Overtime: {item.overTime} </Text>
      <Text style={styles.Textdata}>Attend Date: {item.attendDate} </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.MainContainer}>
      <View style={styles.SearchContainer}>
        <Formik
          initialValues={{
            dd: '',
            mm: '',
            yyyy: '',
          }}
          validationSchema={validationSchema}
          onSubmit={values => {
            FetchEmployee(values), setLoading(true);
          }}>
          {({handleChange, handleBlur, handleSubmit, values}) => (
            <>
              <TextInput
                keyboardType="numeric"
                onChangeText={handleChange('dd')}
                onBlur={handleBlur('dd')}
                value={values.dd}
                style={styles.Day}
                placeholderTextColor="#4C585B"
                placeholder="DD"></TextInput>
              <TextInput
                keyboardType="numeric"
                onChangeText={handleChange('mm')}
                onBlur={handleBlur('mm')}
                value={values.mm}
                style={styles.Day}
                placeholderTextColor="#4C585B"
                placeholder="MM"></TextInput>

              <TextInput
                keyboardType="numeric"
                onChangeText={handleChange('yyyy')}
                onBlur={handleBlur('yyyy')}
                value={values.yyyy}
                style={styles.Day}
                placeholderTextColor="#4C585B"
                placeholder="YYYY"></TextInput>

              <TouchableOpacity onPress={handleSubmit} style={styles.Button}>
                <Text style={styles.Check}>Check</Text>
              </TouchableOpacity>
            </>
          )}
        </Formik>
      </View>

      <View style={styles.ShowContainer}>
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
            renderItem={RenderBox}
          />
        )}
      </View>
    </View>
  );
};

export default UpdateAttendanceList;

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  SearchContainer: {
    height: 50,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    borderWidth: 1,
    borderColor: 'orange',
    // backgroundColor:"orange"
  },
  ShowContainer: {
    flex: 1,
    alignItems: 'center',
  },

  Day: {
    height: 40,
    width: 80,
    fontSize: 18,
    borderWidth: 0.5,
    borderRadius: 2,
    // backgroundColor:"blue"
  },
  Button: {
    height: 40,
    width: 100,
    borderRadius: 8,
    backgroundColor: 'green',
    elevation: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Check: {
    fontSize: 19,
    color: '#FAFAFA',
  },
  DataBox: {
    height: 150,
    width: 350,
    backgroundColor: '#81BFDA',
    borderRadius: 10,
    marginTop: 10,
    justifyContent: 'center',
  },
  Textdata: {
    fontSize: 20,
    fontFamily: 'Montserrat-Regular',
    color: '#23486A',
    marginLeft: 10,
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
    borderRadius: 10,
  },
  Modalsessage: {
    fontSize: 20,
    fontfamily: 'Montserrat-Medium',
    color: '#FAFAFA',
  },
});
