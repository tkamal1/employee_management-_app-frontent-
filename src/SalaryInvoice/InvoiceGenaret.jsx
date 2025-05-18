import {
  KeyboardAvoidingView,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {Formik} from 'formik';
import * as Yup from 'yup';
import api from '../../API/Api';
import {ScrollView} from 'react-native-gesture-handler';
import {TextInput} from 'react-native';
const validationSchema = Yup.object().shape({
  company_name: Yup.string(),
  company_address: Yup.string(),
  UAN_no: Yup.string(),
  bank_Name: Yup.string(),
  accound_number: Yup.string(),
});

const InvoiceGenaret = ({route}) => {
  const {
    name,
    category,
    salary,
    EPF_ID,
    SI_ID,
    aadhar,
    address,
    age,
    guardian,
    joinDate,
    phone,
    empId,
    totalAttend,
    totalAdvance,
    totalOvertime,
    M,
    Y,
  } = route.params || {};

  
  const NetSalary =
    totalAttend * salary + (salary / 8) * totalOvertime - totalAdvance;

  const [isModal, setModal] = useState();
  const [message, setMessage] = useState();

  const SalaryGenerate = async values => {
   
    await api
      .post('/salary/create/', {
        empId: empId,
        name: name,
        age: age,
        guardian: guardian,
        phone: phone,
        address: address,
        aadhar: aadhar,
        category: category,
        salary: salary,
        joinDate: joinDate,
        totalAttend: totalAttend,
        totalAdvnce: totalAdvance,
        totalOvertime: totalOvertime,
        M: M,
        Y: Y,
        EPF_ID: EPF_ID,
        SI_ID: SI_ID,
        Net_Salary: NetSalary,
        company_name: values.company_name,
        company_address: values.company_address,
        UAN_no: values.UAN_no,
        bank_Name: values.bank_Name,
        accound_number: values.accound_number,
      })
      .then(res => {
        setMessage('salary slip ready');
        const timer = setTimeout(() => {
          setModal(false);
        }, 2000);
        return () => clearTimeout(timer);
      })
      .catch(err => {
        if (err.request.status === 0) {
          setMessage('check internet');
          const timer = setTimeout(() => {
            setModal(false);
          }, 2000);
          return () => clearTimeout(timer);
        }
        if (err.request.status === 409) {
          setMessage('Salary slip already existst');
          const timer = setTimeout(() => {
            setModal(false);
          }, 2000);
          return () => clearTimeout(timer);
        }
        if (err.request.status === 503) {
          setMessage('Server error');
          const timer = setTimeout(() => {
            setModal(false);
          }, 2000);
          return () => clearTimeout(timer);
        }
        if (err.request.status === 500) {
          setMessage('server down');
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
        <Text style={styles.HaderTitle}>Salary Generate</Text>
        <Text style={styles.nametitle}>{name}</Text>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.FormContainer}>
        <ScrollView
          style={styles.Form}
          contentContainerStyle={{padding: 20, alignItems: 'center'}}>
          <Formik
            initialValues={{
              company_name: '',
              company_address: '',
              UAN_no: '',
              bank_Name: '',
              accound_number: '',
            }}
            validationSchema={validationSchema}
            onSubmit={values => {
              SalaryGenerate(values), setModal(true), setMessage('Please wait');
            }}>
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
                        <Text style={styles.Modalmessage}> {message} </Text>
                      </View>
                    </View>
                  </Modal>
                )}

                <View style={styles.InputContainer}>
                  <View style={styles.labelBox}>
                    <Text style={styles.labelName}>Company_name</Text>
                  </View>

                  <View style={styles.TextinputBox}>
                    <TextInput
                      placeholder="Abcd"
                      placeholderTextColor="#4C585B"
                      style={styles.TextInput}
                      onChangeText={handleChange('company_name')}
                      onBlur={handleBlur('company_name')}
                      value={values.company_name}
                    />
                  </View>
                </View>

                <View style={styles.InputContainer}>
                  <View style={styles.labelBox}>
                    <Text style={styles.labelName}>Company_address</Text>
                  </View>

                  <View style={styles.TextinputBox}>
                    <TextInput
                      placeholder="45, Park Street, Mumbai, India"
                      placeholderTextColor="#4C585B"
                      style={styles.TextInput}
                      onChangeText={handleChange('company_address')}
                      onBlur={handleBlur('company_address')}
                      value={values.company_address}
                    />
                  </View>
                </View>

                <View style={styles.InputContainer}>
                  <View style={styles.labelBox}>
                    <Text style={styles.labelName}>UAN No</Text>
                  </View>
                  <View style={styles.TextinputBox}>
                    <TextInput
                      placeholder="12345"
                      placeholderTextColor="#4C585B"
                      style={styles.TextInput}
                      onChangeText={handleChange('UAN_no')}
                      onBlur={handleBlur('UAN_no')}
                      value={values.UAN_no}
                    />
                  </View>
                </View>

                <View style={styles.InputContainer}>
                  <View style={styles.labelBox}>
                    <Text style={styles.labelName}>Bank Name</Text>
                  </View>
                  <View style={styles.TextinputBox}>
                    <TextInput
                      placeholder="State Bank"
                      placeholderTextColor="#4C585B"
                      style={styles.TextInput}
                      onChangeText={handleChange('bank_Name')}
                      onBlur={handleBlur('bank_Name')}
                      value={values.bank_Name}
                    />
                  </View>
                </View>

                <View style={styles.InputContainer}>
                  <View style={styles.labelBox}>
                    <Text style={styles.labelName}>Accound_Number</Text>
                  </View>
                  <View style={styles.TextinputBox}>
                    <TextInput
                      placeholder="9876543210"
                      placeholderTextColor="#4C585B"
                      style={styles.TextInput}
                      onChangeText={handleChange('accound_number')}
                      onBlur={handleBlur('accound_number')}
                      value={values.accound_number}
                    />
                  </View>
                </View>

                {/* submit button */}
                <View style={styles.SubmitContainer}>
                  <TouchableOpacity
                    style={styles.Button}
                    onPress={handleSubmit}>
                    <Text style={styles.ButtonText}>Generate</Text>
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

export default InvoiceGenaret;

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  HeaderContainer: {
    height: 60,
    width: '100%',
    backgroundColor: '#9376E0',
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  HaderTitle: {
    fontSize: 22,
    color: '#fafafa',
    fontFamily: 'Montserrat-SemiBold',
  },
  nametitle: {
    fontSize: 18,
    color: '#fafafa',
    fontFamily: 'Montserrat-SemiBold',
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
    backgroundColor: '#FF8225',
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
