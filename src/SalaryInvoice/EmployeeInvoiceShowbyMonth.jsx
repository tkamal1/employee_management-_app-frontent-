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
  mm: Yup.number().required('!').positive('!').integer(),
  yyyy: Yup.number().required('!').positive('!').integer(),
});

const EmployeeInvoiceShowbyMonth = ({route}) => {
  const {
    employeeId,
    NAME,
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
  } = route.params || {}; // Get employeeId

  const navigation = useNavigation();
  const [loading, setLoading] = useState();
  const [data, setData] = useState([]);
  const [modal, setModal] = useState();
  const [message, setMessage] = useState();
  const [month , setMonth] = useState();
  const [year , setYear] = useState();

  const FetchEmployee = async values => {
    setMonth(values.mm);
    setYear(values.yyyy);
    console.log("month",month)
    console.log("year",year)
    await api
      .post('/attendance/ByidAndMonth/', {
        M: values.mm,
        Y: values.yyyy,
        employeeID: employeeId,
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
          }, 5000);
          return () => clearTimeout(timer);
        }
      })
      .catch(err => {
        if (err.request.status === 0) {
          setModal(true);
          setMessage('Check internet');
          const timer = setTimeout(() => {
            setModal(false);
          }, 5000);
          return () => clearTimeout(timer);
        }
        if (err.request.status === 404) {
          setModal(true);
          setMessage('Data not found');
          const timer = setTimeout(() => {
            setModal(false);
          }, 5000);
          return () => clearTimeout(timer);
        }
        if (err.request.status === 503) {
          setModal(true);
          setMessage('Server error');
          const timer = setTimeout(() => {
            setModal(false);
          }, 5000);
          return () => clearTimeout(timer);
        }
      });
  };

  const RenderBox = ({item}) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('InvoiceGenaret', {
          empId: employeeId,
          name: NAME,
          category: category,
          salary: salary,
          EPF_ID: EPF_ID,
          SI_ID: SI_ID,
          aadhar: aadhar,
          address: address,
          age: age,
          guardian: guardian,
          joinDate: joinDate,
          phone: phone,
          totalAttend: item.totalAttend,
          totalAdvance: item.totalAdvanceSalary,
          totalOvertime: item.totalOverTime,
          M:month,
          Y:year
        })
      }
      style={styles.DataBox}>
      <Text style={styles.Textdata}>Name:{NAME}</Text>
      <Text style={styles.Textdata}>Total Attend: {item.totalAttend} </Text>
      <Text style={styles.Textdata}>
        Total Advance : {item.totalAdvanceSalary}
      </Text>
      <Text style={styles.Textdata}>Total Overtime: {item.totalOverTime} </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.MainContainer}>
      <View style={styles.SearchContainer}>
        <Formik
          initialValues={{
            mm: '',
            yyyy: '',
          }}
          validationSchema={validationSchema}
          onSubmit={values => {
            FetchEmployee(values), setLoading(true);
          }}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <View style={styles.Inputbox}>
              <TextInput
                keyboardType="numeric"
                onChangeText={handleChange('mm')}
                onBlur={handleBlur('mm')}
                value={values.mm}
                style={styles.Day}
                placeholderTextColor="#4C585B"
                placeholder="MM"></TextInput>
              {touched.mm && errors.mm && (
                <Text style={{color: 'red'}}>{errors.mm}</Text>
              )}
              <TextInput
                keyboardType="numeric"
                onChangeText={handleChange('yyyy')}
                onBlur={handleBlur('yyyy')}
                value={values.yyyy}
                style={styles.Day}
                placeholderTextColor="#4C585B"
                placeholder="YYYY"></TextInput>
              {touched.yyyy && errors.yyyy && (
                <Text style={{color: 'red'}}>{errors.yyyy}</Text>
              )}
              <TouchableOpacity onPress={handleSubmit} style={styles.Button}>
                <Text style={styles.Check}>Check</Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
        <View style={styles.TotalDataBox}>
          <Text style={styles.TotalData}> Show Total Attendance </Text>
        </View>
      </View>

      <View style={styles.ShowContainer}>
        {modal && (
          <Modal animationType="fade" transparent={true} visible={true}>
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

export default EmployeeInvoiceShowbyMonth;

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  SearchContainer: {
    height: 120,
    width: '100%',

    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'orange',
    // backgroundColor:"orange"
  },
  Inputbox: {
    height: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  TotalDataBox: {
    height: 50,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  TotalData: {
    fontSize: 22,
    fontFamily: 'Montserrat-Regular',
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
