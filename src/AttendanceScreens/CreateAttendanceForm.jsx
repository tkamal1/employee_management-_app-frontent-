import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {TextInput} from 'react-native-gesture-handler';
import {Formik} from 'formik';
import * as Yup from 'yup';
import api from '../../API/Api';
const validationSchema = Yup.object().shape({
  overtime: Yup.number().positive().integer(),
  advance: Yup.number().positive().integer(),
  dd: Yup.number().positive().integer(),
  mm: Yup.number().positive().integer(),
  yyyy: Yup.number().positive().integer(),
});

const CreateAttendanceForm = ({route}) => {
  const {employeeId, NAME} = route.params || {}; // Get employeeId safely

  const [right, setRight] = useState();
  const [modal, setModal] = useState();
  const [errorMessage, setErrorMessage] = useState();

  const CreateAttendance = async values => {
    await api
      .post('/attendance/Create/', {
        employeeDetails: employeeId,
        advanceSalary: values.advance,
        overTime: values.overtime,
        attend: right,
        D: values.dd,
        M: values.mm,
        Y: values.yyyy,
      })
      .then(res => {
        console.log(res.data);
        setErrorMessage('Done');
        const timer = setTimeout(() => {
          setModal(false);
        }, 2000);
        return () => clearTimeout(timer);
      })
      .catch(err => {
        if (err.request.status === 0) {
          setErrorMessage('Check Internet');

          const timer = setTimeout(() => {
            setModal(false)
          }, 2000);
          return () => clearTimeout(timer);
        }
        if (err.request.status === 503) {
          setErrorMessage('Server error');
          

          const timer = setTimeout(() => {
           setModal(false)
          }, 2000);
          return () => clearTimeout(timer);
        }
      });
  };

  return (
    <View style={styles.MainContainer}>
      {modal && (
        <Modal animationType="slide" transparent={true} visible={true}>
          <View style={styles.modalContainer}>
            <View style={styles.ModalBox}>
              <Text style={styles.ModalMessage}>{errorMessage}</Text>
            </View>
          </View>
        </Modal>
      )}
      <View style={styles.InputBox}>
        <View style={styles.Box1}>
          <Text style={styles.Name}>{NAME}</Text>
        </View>

        <Formik
          initialValues={{
            overtime: '',
            advance: '',
            dd: '',
            mm: '',
            yyyy: '',
          }}
          validationSchema={validationSchema}
          onSubmit={values => {
            CreateAttendance(values),
              setModal(true),
              setErrorMessage('Please wait');
          }}>
          {({handleChange, handleBlur, handleSubmit, values}) => 
            <>
              <View style={styles.Box2}>
                <View style={styles.InputContainer}>
                  <Text style={styles.InputTitle}>Present :</Text>
                  <TouchableOpacity
                    onPressIn={() => setRight(true)}
                    // onPressOut={()=>setRight(false)}

                    style={styles.Checkbox}>
                    {right && <Text style={styles.Right}>✔</Text>}
                  </TouchableOpacity>
                </View>

                <View style={styles.InputContainer}>
                  <Text style={styles.InputTitle}>Overtime :</Text>
                  <TextInput
                    keyboardType="numeric"
                    placeholder="/h"
                    placeholderTextColor="#4C585B"
                    onChangeText={handleChange('overtime')}
                    onBlur={handleBlur('overtime')}
                    value={values.overtime}
                    style={styles.TextInput}></TextInput>
                </View>

                <View style={styles.InputContainer}>
                  <Text style={styles.InputTitle}>Advance :</Text>
                  <TextInput
                    keyboardType="numeric"
                    placeholderTextColor="#4C585B"
                    onChangeText={handleChange('advance')}
                    onBlur={handleBlur('advance')}
                    value={values.advance}
                    style={styles.TextInput}></TextInput>
                </View>

                <View style={styles.InputContainer}>
                  <Text style={styles.InputTitle}>Date:</Text>
                  <TextInput
                    keyboardType="numeric"
                    placeholder="dd"
                    placeholderTextColor="#4C585B"
                    onChangeText={handleChange('dd')}
                    onBlur={handleBlur('dd')}
                    value={values.dd}
                    style={styles.TextInput}></TextInput>
                  <TextInput
                    keyboardType="numeric"
                    placeholder="mm"
                    placeholderTextColor="#4C585B"
                    onChangeText={handleChange('mm')}
                    onBlur={handleBlur('mm')}
                    value={values.mm}
                    style={styles.TextInput}></TextInput>
                  <TextInput
                    keyboardType="numeric"
                    placeholder="yyyy"
                    placeholderTextColor="#4C585B"
                    onChangeText={handleChange('yyyy')}
                    onBlur={handleBlur('yyyy')}
                    value={values.yyyy}
                    style={styles.TextInput}></TextInput>
                </View>
              </View>

              <View style={styles.Box3}>
                <TouchableOpacity onPress={handleSubmit} style={styles.Button}>
                  <Text style={styles.Submit}>SUBMIT</Text>
                </TouchableOpacity>
              </View>
            </>
          }
        </Formik>
      </View>
    </View>
  );
};

export default CreateAttendanceForm;

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    // backgroundColor:"black",
    alignItems: 'center',
  },
  InputBox: {
    height: 350,
    width: '92%',
    backgroundColor: '#F2F9FF',
    // justifyContent: 'center',
    // alignItems: 'center',
    marginTop: 40,
    borderRadius: 10,
    elevation: 10,
  },
  InputContainer: {
    flexDirection: 'row',
    height: 45,
    width: '100%',
    alignItems: 'center',
    marginLeft: 15,
    marginTop: 10,
  },
  TextInput: {
    marginLeft: 10,
    width: 70,
    height: 38,
    backgroundColor: '#AFAFFA',
    fontSize: 16,
    elevation: 10,
    borderRadius: 5,
  },
  InputTitle: {
    fontSize: 18,
    color: 'black',
  },
  Checkbox: {
    marginLeft: 10,
    width: 25,
    height: 25,
    borderWidth: 1, // Thickness of the border
    borderColor: 'black', // Border color
    justifyContent: 'center',
    alignItems: 'center',
  },
  Box1: {
    height: '15%',
    width: '100%',
    // backgroundColor:"orange",
    justifyContent: 'center',
    alignItems: 'center',
  },
  Right: {
    color: 'green',
    fontSize: 18,
  },
  Name: {
    fontSize: 22,
    fontFamily: 'Montserrat-SemiBold',
  },
  Box2: {
    height: '65%',
    width: '100%',
    backgroundColor: 'white',
  },
  Box3: {
    height: '20%',
    width: '100%',
    // backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
  },
  Button: {
    height: 45,
    width: 150,
    backgroundColor: 'green',
    borderRadius: 10,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Submit: {
    fontSize: 20,
    color: '#FAFAFA',
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
