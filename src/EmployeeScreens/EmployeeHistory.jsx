import {
  FlatList,
  KeyboardAvoidingView,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {TextInput} from 'react-native-gesture-handler';
import {Formik} from 'formik';
import * as Yup from 'yup';
import api from '../../API/Api';

const validationSchema = Yup.object().shape({
  month: Yup.number().min(1).max(12).required('!'),
  year: Yup.number().min(1900).max(new Date().getFullYear()).required('!'),
});

const EmployeeHistory = ({route}) => {
  const {employeeId, NAME} = route.params || {}; // Get employeeId safely
  const [data, setData] = useState([]);
  const [message, setMessage] = useState();
  const [modal, setModal] = useState();

  const GetHistory = async values => {
    const MonthYear = `${values.month}/${values.year}`;

    await api
      .post('/employee/ByMonthYear', {
        _id: employeeId,
        monthYear: MonthYear,
      })
      .then(res => {
        setData(res.data.history);
        setMessage('Done');
        const timer = setTimeout(() => {
          setModal(false);
        }, 2000);
        return () => clearTimeout(timer);
      })
      .catch(err => {
        if (err.request.status === 0) {
          setMessage('Check Internet');
          const timer = setTimeout(() => {
            setModal(false);
          }, 2000);
          return () => clearTimeout(timer);
        }

        if (err.request.status === 404) {
          setData([]);
          setMessage('Employee not found');
          const timer = setTimeout(() => {
            setModal(false);
          }, 2000);
          return () => clearTimeout(timer);
        }

        if (err.request.status === 500) {
          setMessage('Server error');
          const timer = setTimeout(() => {
            setModal(false);
          }, 2000);
          return () => clearTimeout(timer);
        }
      });
  };

  const renderData = ({item}) => (
    <View style={styles.DataShow}>
      <Text style={styles.DataText}>Salary: {item.salary}</Text>
      <Text style={styles.DataText}>Category: {item.category}</Text>
      <Text style={styles.DataText}>Update Date: {item.updateDate}</Text>
    </View>
  );

  return (
    <View style={styles.MainContainer}>
      <View style={styles.HeaderBox}>
        <Text style={styles.HederText1}>Employee History</Text>
        <Text style={styles.HederText2}>{NAME}</Text>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.InputBox}>
        <Formik
          initialValues={{
            month: '',
            year: '',
          }}
          validationSchema={validationSchema}
          onSubmit={
            values => {
              GetHistory(values), setMessage('Please wait'), setModal(true);
            }
            // console.log("Submitted Values:", values)
          }>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <>
              <>
                <TextInput
                  style={styles.MM}
                  placeholder="MM"
                  placeholderTextColor="#7E99A3"
                  keyboardType="numeric"
                  onChangeText={handleChange('month')}
                  onBlur={handleBlur('month')}
                  value={values.month}
                />

                {/* {touched.month && errors.month && (
                  <Text style={styles.error}>{errors.month}</Text>
                )} */}
              </>
              <>
                <TextInput
                  style={styles.YYYY}
                  placeholder="YYYY"
                  placeholderTextColor="#7E99A3"
                  keyboardType="numeric"
                  onChangeText={handleChange('year')}
                  onBlur={handleBlur('year')}
                  value={values.year}
                />

                {/* {touched.year && errors.year && (
                  <Text style={styles.error}>{errors.year}</Text>
                )} */}
              </>
              <TouchableOpacity
                style={styles.SubmitButton}
                onPress={handleSubmit}>
                <Text style={styles.SubmitText}>OK</Text>
              </TouchableOpacity>
            </>
          )}
        </Formik>
      </KeyboardAvoidingView>

      <View style={styles.ShowBox}>
        {modal && (
          <Modal animationType="fade" transparent={true} visible={true}>
            <View style={styles.ModalContainer}>
              <View style={styles.modalBox}>
                <Text style={styles.modalMessage}>{message}</Text>
              </View>
            </View>
          </Modal>
        )}
        <FlatList
          data={data}
          renderItem={renderData}
          keyExtractor={item => item._id.toString()}
        />
      </View>
    </View>
  );
};

export default EmployeeHistory;

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
  },
  HeaderBox: {
    height: 55,
    width: '100%',
    backgroundColor: '#88A9F7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  HederText1: {
    fontSize: 21,
    fontFamily: 'Montserrat-SemiBold',
    color: '#FAFAFA',
  },
  HederText2: {
    fontSize: 17,
    fontFamily: 'Montserrat-SemiBold',
    color: '#FAFAFA',
  },
  InputBox: {
    height: 55,
    width: '100%',
    backgroundColor: '#88A9F7',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  SubmitButton: {
    height: 40,
    width: '30%',
    backgroundColor: '#DE7119',
    borderRadius: 5,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  SubmitText: {
    color: '#FAFAFA',
    fontSize: 20,
    fontFamily: 'Montserrat-SemiBold',
  },
  MM: {
    height: 40,
    width: '20%',
    fontSize: 17,
    paddingLeft: 8,
    borderRadius: 5,
    backgroundColor: '#FAFAFA',
  },
  YYYY: {
    height: 40,
    width: '30%',
    fontSize: 17,
    paddingLeft: 8,
    borderRadius: 5,
    backgroundColor: '#FAFAFA',
  },
  ShowBox: {
    height: "80%",
    width:"100%",
    backgroundColor: '#FAFAFA',
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  DataShow: {
    height: 130,
    width: 350,
    backgroundColor: 'orange',
    justifyContent: 'center',
    paddingLeft: 10,
    borderRadius: 8,
    elevation: 5,
    marginTop: 10,
    marginBottom: 5,
  },
  DataText: {
    fontSize: 22,
    fontFamily: 'NunitoSans_7pt-Medium',
    color: '#1A2849',
  },
  ModalContainer: {
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
  modalMessage: {
    fontSize: 20,
    fontFamily: 'Montserrat-SemiBold',
    color: '#FBFBFB',
    textAlign: 'center',
  },
});
