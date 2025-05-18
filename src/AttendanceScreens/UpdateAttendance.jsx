import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {TextInput} from 'react-native-gesture-handler';
import {Formik} from 'formik';
import * as Yup from 'yup';
import api from '../../API/Api';

const validationSchema = Yup.object().shape({
  advance: Yup.number().min(0).integer(),
  overtime: Yup.number().min(0).integer(), 
  dd: Yup.number().positive().integer(),
  mm: Yup.number().positive().integer(),
  yyyy: Yup.number().positive().integer(),
});

const UpdateAttendance = ({route}) => {
  const {AttendanceId, name} = route.params || {}; // Get employeeId safely
  const [modal, setModal] = useState();
  const [message, setMessage] = useState();

  const Update = async values => {
    await api
      .patch('/attendance/Update/', {
        AttendanceId: AttendanceId,
        advanceSalary: values.advance,
        overTime: values.overtime,
        D: values.dd,
        M: values.mm,
        Y: values.yyyy,
      })
      .then(res => {
        setMessage('Update Successful');
        const timer = setTimeout(() => {
          setModal(false);
        }, 2000);
        return () => clearTimeout(timer);
      })
      .catch(err => {
        if (err.request.status === 0) {
          setMessage('Check internet');
          const timer = setTimeout(() => {
            setModal(false);
          }, 2000);
          return () => clearTimeout(timer);
        }

        if (err.request.status === 404) {
          setMessage('Update faild');
          const timer = setTimeout(() => {
            setModal(false);
          }, 2000);
          return () => clearTimeout(timer);
        }
        if (err.request.status === 503) {
          setMessage('Server error');
          const timer = setTimeout(() => {
            setModal(false);
          }, 5000);
          return () => clearTimeout(timer);
        }
      });
  };

  return (
    <View style={styles.MainContainer}>
      <View style={styles.HeaderContainer}>
        <Text style={styles.HeaderText}>Update Attendance</Text>
        <Text style={styles.NameText}>{name}</Text>
      </View>

      <View style={styles.FormContainer}>
        {modal && (
          <Modal animationType="slide" transparent={true} visible={true}>
            <View style={styles.ModalBox1}>
              <View style={styles.ModalBox2}>
                <Text style={styles.Modalsessage}>{message}</Text>
              </View>
            </View>
          </Modal>
        )}

        <Formik
          initialValues={{
            dd: '',
            mm: '',
            yyyy: '',
          }}
          validationSchema={validationSchema}
          onSubmit={values => {
            Update(values), setModal(true), setMessage('Please Wait');
          }}>
          {({handleChange, handleBlur, handleSubmit, values}) => (
            <View style={styles.FormBox}>
              <TextInput
                keyboardType="numeric"
                onChangeText={handleChange('advance')}
                onBlur={handleBlur('advance')}
                value={values.advance}
                placeholder="Advance"
                placeholderTextColor="#4C585B"
                style={styles.InputBox1}></TextInput>
              <TextInput
                keyboardType="numeric"
                onChangeText={handleChange('overtime')}
                onBlur={handleBlur('overtime')}
                value={values.overtime}
                placeholder="Overtime"
                placeholderTextColor="#4C585B"
                style={styles.InputBox1}></TextInput>

              <View style={styles.DateBox}>
                <TextInput
                  keyboardType="numeric"
                  onChangeText={handleChange('dd')}
                  onBlur={handleBlur('dd')}
                  value={values.dd}
                  placeholder="dd"
                  placeholderTextColor="#4C585B"
                  style={styles.InputBox2}></TextInput>
                <TextInput
                  keyboardType="numeric"
                  onChangeText={handleChange('mm')}
                  onBlur={handleBlur('mm')}
                  value={values.mm}
                  placeholder="mm"
                  placeholderTextColor="#4C585B"
                  style={styles.InputBox2}></TextInput>
                <TextInput
                  keyboardType="numeric"
                  onChangeText={handleChange('yyyy')}
                  onBlur={handleBlur('yyyy')}
                  value={values.yyyy}
                  placeholder="yyyy"
                  placeholderTextColor="#4C585B"
                  style={styles.InputBox2}></TextInput>
              </View>

              <View style={styles.ButtonContainer}>
                <TouchableOpacity onPress={handleSubmit} style={styles.Button}>
                  <Text style={styles.SubmitText}>Submit</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </Formik>
      </View>
    </View>
  );
};

export default UpdateAttendance;

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
  },
  HeaderContainer: {
    height: 70,
    width: '100%',
    backgroundColor: '#690B22',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
  },
  HeaderText: {
    fontSize: 22,
    color: '#FAFAFA',
  },
  NameText: {
    fontSize: 20,
    color: '#FAFAFA',
  },
  FormContainer: {
    height: '100%',
    width: '100%',

    alignItems: 'center',
  },

  FormBox: {
    height: 290,
    width: '85%',
    backgroundColor: '#FAFAFA',
    borderRadius: 10,
    elevation: 10,
    marginTop: 15,
    // paddingLeft: 15,
    justifyContent: 'center',
  },
  InputBox1: {
    backgroundColor: '#F4CCE9',
    width: '90%',
    marginBottom: 10,
    fontSize: 18,
    borderRadius: 8,
    elevation: 5,
    paddingLeft: 10,
    marginLeft: 15,
  },
  DateBox: {
    height: 55,
    width: '100%',
    // backgroundColor:"red",
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  InputBox2: {
    height: 50,
    width: 80,
    backgroundColor: '#F4CCE9',
    borderRadius: 4,
    fontSize: 18,
  },
  ButtonContainer: {
    width: '100%',
    height: 68,
    justifyContent: 'center',
    alignItems: 'center',

    marginTop: 10,
  },
  Button: {
    height: 50,
    width: 150,
    backgroundColor: 'green',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  SubmitText: {
    fontSize: 20,
    color: '#FAFAFA',
    fontFamily: 'Montserrat-Medium',
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
