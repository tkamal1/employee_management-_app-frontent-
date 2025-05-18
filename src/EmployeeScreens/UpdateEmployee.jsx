import {
  KeyboardAvoidingView,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {Image} from 'react-native';

import {Formik} from 'formik';
import * as Yup from 'yup';

import api from '../../API/Api';

const validationSchema = Yup.object().shape({
  name: Yup.string(),
  age: Yup.number().positive().integer(),
  guardian: Yup.string(),
  phone: Yup.string().matches(/^[0-9]{10}$/),
  aadhar: Yup.string(),
  address: Yup.string(),
  category: Yup.string(),
  salary: Yup.number().positive().integer(),
  EPF_ID: Yup.string(),
  SI_ID: Yup.string(),
});

const UpdateEmployee = ({route}) => {
  const {employeeId, NAME} = route.params || {}; // Get employeeId safely
  const [Done, setDone] = useState();
  const [isModal, setModal] = useState(false);

  const EmployeeRegister = async (values, resetForm) => {
    console.log(values.name);
    console.log('employee response1');
    await api
      .patch('/employee/Update/', {
        _id: employeeId,
        name: values.name,
        age: values.age,
        phone: values.phone,
        guardian: values.guardian,
        aadhar: values.aadhar,
        address: values.address,
        salary: values.salary,
        category: values.category,
        EPF_ID: values.EPF_ID,
        SI_ID: values.SI_ID,
      })
      .then(res => {
        console.log('employee response2');
        console.log(res.data.success);
        setDone('Done');
        const timer = setTimeout(() => {
          setModal(false);
          resetForm();
        }, 2000);
        return () => clearTimeout(timer);
      })
      .catch(err => {
        if (err.request.status === 0) {
          setDone('Check Internet');
          const timer = setTimeout(() => {
            setModal(false);
          }, 2000);
          return () => clearTimeout(timer);
        }

        if (err.request.status === 404) {
          setDone('Employee not found');
          const timer = setTimeout(() => {
            setModal(false);
          }, 2000);
          return () => clearTimeout(timer);
        }

        if (err.request.status === 503) {
          setDone('Server error');
          const timer = setTimeout(() => {
            setModal(false);
          }, 2000);
          return () => clearTimeout(timer);
        }
      });
  };

  return (
    <View style={styles.MainContainer}>
      <View style={styles.HeaderContainer}>
        <Text style={styles.HeaderContainerText}>Update Employee</Text>
        <Text style={styles.UpName}>{NAME}</Text>
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.FormContainer}>
        <ScrollView
          style={styles.Form}
          contentContainerStyle={{padding: 20, alignItems: 'center'}}>
          <Formik
            initialValues={{
              name: '',
              age: '',
              guardian: '',
              phone: '',
              aadhar: '',
              address: '',
              category: '',
              salary: '',
              EPF_ID: '',
              SI_ID: '',
            }}
            validationSchema={validationSchema}
            onSubmit={(values, {resetForm}) => (
              EmployeeRegister(values, resetForm),
              setModal(true),
              setDone('Please Wait')
            )}>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
            }) => (
              <>
                {isModal && (
                  <Modal
                    animationType="fade" // Can be 'slide', 'fade', or 'none'
                    transparent={true}
                    visible={true}>
                    <View style={styles.ModalMaincontainer}>
                      <View style={styles.ModalBox}>
                        <Text style={styles.Modalmessage}> {Done} </Text>
                      </View>
                    </View>
                  </Modal>
                )}

                <View style={styles.InputContainer}>
                  <View style={styles.labelBox}>
                    <Text style={styles.labelName}>Name</Text>
                  </View>

                  <View style={styles.TextinputBox}>
                    <TextInput
                      placeholder="Amit Verma"
                      placeholderTextColor="#7E99A3"
                      style={styles.TextInput}
                      onChangeText={handleChange('name')}
                      onBlur={handleBlur('name')}
                      value={values.name}
                    />

                    <View style={styles.CheckmarkBox}>
                      {touched.name && (
                        <Image
                          source={
                            errors.name
                              ? require('../../TabBaricons/shape.png')
                              : require('../../TabBaricons/checkmark.png')
                          }
                          style={styles.Checkmark}
                        />
                      )}
                    </View>
                  </View>
                </View>

                <View style={styles.InputContainer}>
                  <View style={styles.labelBox}>
                    <Text style={styles.labelName}>Age</Text>
                  </View>

                  <View style={styles.TextinputBox}>
                    <TextInput
                      placeholder="25"
                      placeholderTextColor="#7E99A3"
                      style={styles.TextInput}
                      onChangeText={handleChange('age')}
                      onBlur={handleBlur('age')}
                      value={values.age}
                    />

                    <View style={styles.CheckmarkBox}>
                      {touched.age && (
                        <Image
                          source={
                            errors.age
                              ? require('../../TabBaricons/shape.png')
                              : require('../../TabBaricons/checkmark.png')
                          }
                          style={styles.Checkmark}
                        />
                      )}
                    </View>
                  </View>
                </View>

                <View style={styles.InputContainer}>
                  <View style={styles.labelBox}>
                    <Text style={styles.labelName}>C/O</Text>
                  </View>
                  <View style={styles.TextinputBox}>
                    <TextInput
                      placeholder="Amar Verma"
                      placeholderTextColor="#7E99A3"
                      style={styles.TextInput}
                      onChangeText={handleChange('guardian')}
                      onBlur={handleBlur('guardian')}
                      value={values.guardian}
                    />
                    <View style={styles.CheckmarkBox}>
                      {touched.guardian && (
                        <Image
                          source={
                            errors.guardian
                              ? require('../../TabBaricons/shape.png')
                              : require('../../TabBaricons/checkmark.png')
                          }
                          style={styles.Checkmark}
                        />
                      )}
                    </View>
                  </View>
                </View>

                <View style={styles.InputContainer}>
                  <View style={styles.labelBox}>
                    <Text style={styles.labelName}>Phone</Text>
                  </View>
                  <View style={styles.TextinputBox}>
                    <TextInput
                      placeholder="9500000095"
                      placeholderTextColor="#7E99A3"
                      style={styles.TextInput}
                      onChangeText={handleChange('phone')}
                      onBlur={handleBlur('phone')}
                      value={values.phone}
                    />
                    <View style={styles.CheckmarkBox}>
                      {touched.phone && (
                        <Image
                          source={
                            errors.phone
                              ? require('../../TabBaricons/shape.png')
                              : require('../../TabBaricons/checkmark.png')
                          }
                          style={styles.Checkmark}
                        />
                      )}
                    </View>
                  </View>
                </View>

                <View style={styles.InputContainer}>
                  <View style={styles.labelBox}>
                    <Text style={styles.labelName}>Address</Text>
                  </View>
                  <View style={styles.TextinputBox}>
                    <TextInput
                      placeholder="45, Park Street, Mumbai, India"
                      placeholderTextColor="#7E99A3"
                      style={styles.TextInput}
                      onChangeText={handleChange('address')}
                      onBlur={handleBlur('address')}
                      value={values.address}
                    />
                    <View style={styles.CheckmarkBox}>
                      {touched.address && (
                        <Image
                          source={
                            errors.address
                              ? require('../../TabBaricons/shape.png')
                              : require('../../TabBaricons/checkmark.png')
                          }
                          style={styles.Checkmark}
                        />
                      )}
                    </View>
                  </View>
                </View>

                <View style={styles.InputContainer}>
                  <View style={styles.labelBox}>
                    <Text style={styles.labelName}>Designation</Text>
                  </View>
                  <View style={styles.TextinputBox}>
                    <TextInput
                      placeholder="Welder"
                      placeholderTextColor="#7E99A3"
                      style={styles.TextInput}
                      onChangeText={handleChange('category')}
                      onBlur={handleBlur('category')}
                      value={values.category}
                    />
                    <View style={styles.CheckmarkBox}>
                      {touched.category && (
                        <Image
                          source={
                            errors.category
                              ? require('../../TabBaricons/shape.png')
                              : require('../../TabBaricons/checkmark.png')
                          }
                          style={styles.Checkmark}
                        />
                      )}
                    </View>
                  </View>
                </View>

                <View style={styles.InputContainer}>
                  <View style={styles.labelBox}>
                    <Text style={styles.labelName}>Salary</Text>
                  </View>
                  <View style={styles.TextinputBox}>
                    <TextInput
                      placeholder="500"
                      placeholderTextColor="#7E99A3"
                      style={styles.TextInput}
                      onChangeText={handleChange('salary')}
                      onBlur={handleBlur('salary')}
                      value={values.salary}
                    />
                    <View style={styles.CheckmarkBox}>
                      {touched.salary && (
                        <Image
                          source={
                            errors.salary
                              ? require('../../TabBaricons/shape.png')
                              : require('../../TabBaricons/checkmark.png')
                          }
                          style={styles.Checkmark}
                        />
                      )}
                    </View>
                  </View>
                </View>

                <View style={styles.InputContainer}>
                  <View style={styles.labelBox}>
                    <Text style={styles.labelName}>Aadhar</Text>
                  </View>
                  <View style={styles.TextinputBox}>
                    <TextInput
                      placeholder="0000 0000 0000"
                      placeholderTextColor="#7E99A3"
                      style={styles.TextInput}
                      onChangeText={handleChange('aadhar')}
                      onBlur={handleBlur('aadhar')}
                      value={values.aadhar}
                    />
                    <View style={styles.CheckmarkBox}>
                      {touched.aadhar && (
                        <Image
                          source={
                            errors.aadhar
                              ? require('../../TabBaricons/shape.png')
                              : require('../../TabBaricons/checkmark.png')
                          }
                          style={styles.Checkmark}
                        />
                      )}
                    </View>
                  </View>
                </View>

                <View style={styles.InputContainer}>
                  <View style={styles.labelBox}>
                    <Text style={styles.labelName}>PF_ID</Text>
                  </View>
                  <View style={styles.TextinputBox}>
                    <TextInput
                      placeholder="EPF1002"
                      placeholderTextColor="#7E99A3"
                      style={styles.TextInput}
                      onChangeText={handleChange('EPF_ID')}
                      onBlur={handleBlur('EPF_ID')}
                      value={values.EPF_ID}
                    />
                    <View style={styles.CheckmarkBox}>
                      {touched.EPF_ID && (
                        <Image
                          source={
                            errors.EPF_ID
                              ? require('../../TabBaricons/shape.png')
                              : require('../../TabBaricons/checkmark.png')
                          }
                          style={styles.Checkmark}
                        />
                      )}
                    </View>
                  </View>
                </View>

                <View style={styles.InputContainer}>
                  <View style={styles.labelBox}>
                    <Text style={styles.labelName}>ESI_ID</Text>
                  </View>
                  <View style={styles.TextinputBox}>
                    <TextInput
                      placeholder="SI2002"
                      placeholderTextColor="#7E99A3"
                      style={styles.TextInput}
                      onChangeText={handleChange('SI_ID')}
                      onBlur={handleBlur('SI_ID')}
                      value={values.SI_ID}
                    />
                    <View style={styles.CheckmarkBox}>
                      {touched.SI_ID && (
                        <Image
                          source={
                            errors.SI_ID
                              ? require('../../TabBaricons/shape.png')
                              : require('../../TabBaricons/checkmark.png')
                          }
                          style={styles.Checkmark}
                        />
                      )}
                    </View>
                  </View>
                </View>

                {/* submit button */}
                <View style={styles.SubmitContainer}>
                  <TouchableOpacity
                    style={styles.Button}
                    onPress={handleSubmit}>
                    <Text style={styles.ButtonText}>UPDATE</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </Formik>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default UpdateEmployee;

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  HeaderContainer: {
    height: 55,
    width: '100%',
    backgroundColor: '#69247C',
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  HeaderContainerText: {
    fontSize: 23,
    color: '#FAFAFA',
    fontFamily: 'Montserrat-SemiBold',
    // fontFamily:'Roboto_Condensed-Light',
  },
  UpName: {
    fontSize: 19,
    fontFamily: 'Roboto-Regular',
    color: '#FAFAFA',
  },
  InputContainer: {
    height: 82,
    width: '95%',
    marginBottom: 5,
    // backgroundColor: 'red',
  },
  FormContainer: {
    flex: 1,
  },
  Form: {
    flex: 1,
    // backgroundColor: '#f8f8f8',
    // fontSize: 20,
  },
  labelBox: {
    height: 30,
    width: '95%',
  },
  labelName: {
    fontSize: 20,
    color: '#384B70',
    fontFamily: 'Poppins-Regular',
    paddingLeft: 8,
  },
  TextinputBox: {
    height: 50,
    width: '100%',
    backgroundColor: '#F8FAFC',
    flexDirection: 'row',
    elevation: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  TextInput: {
    height: 50,
    width: '90%',
    // backgroundColor: '#F8FAFC',
    fontSize: 20,
    paddingLeft: 15,
    // marginTop:10,
    // elevation:10,
    // fontFamily: 'Poppins-Regular',
  },
  CheckmarkBox: {
    height: 30,
    width: '10%',
  },
  Checkmark: {
    height: 30,
    width: 30,
    // backgroundColor:"red"
  },
  SubmitContainer: {
    height: 100,
    width: '90%',
    // backgroundColor:"red",
    justifyContent: 'center',
    alignItems: 'center',
  },
  Button: {
    height: 55,
    width: '90%',
    backgroundColor: '#0D8549',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    elevation: 10,
  },
  ButtonText: {
    fontSize: 20,
    fontFamily: 'Montserrat-SemiBold',
    color: '#FAFAFA',
  },
  ModalMaincontainer: {
    flex: 1,
    // backgroundColor: 'white',
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
  Modalmessage: {
    fontSize: 23,
    fontFamily: 'Montserrat-SemiBold',
    color: '#FBFBFB',
    textAlign: 'center',
  },
});
