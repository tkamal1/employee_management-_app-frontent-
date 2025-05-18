import {
  ActivityIndicator,
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import api from '../../API/Api';
import {useNavigation} from '@react-navigation/native';

const SalaryManuScreen = () => {
  const navigation = useNavigation();
  const [Data, setData] = useState([]);
  const [loding, setLoding] = useState();
  const [modal, setModal] = useState();
  const [message, setMessage] = useState();

  const FetchData = async () => {
    await api
      .get('/employee/allDataShow')
      .then(res => {
        const dataArray = res.data.data;
        console.log(dataArray);
        dataArray.forEach(item => {
          setData(prevData => {
            // Prevent duplicates by checking if _id already exists
            const exists = prevData.some(emp => emp._id === item._id);
            return exists ? prevData : [...prevData, item];
          });
        });
        setLoding(false);
      })
      .catch(err => {
        if (err.request.status === 0) {
          setLoding(false);
          setModal(true);
          setMessage('check internet');
          const timer = setTimeout(() => {
            setModal(false);
          }, 5000);
          return () => clearTimeout(timer);
        }

        if (err.request.status === 404) {
          setLoding(false);
          setModal(true);
          setMessage('Data not found');
          const timer = setTimeout(() => {
            setModal(false);
          }, 5000);
          return () => clearTimeout(timer);
        }

        if (err.request.status === 503) {
          setLoding(false);
          setModal(true);
          setMessage('Server error');
          const timer = setTimeout(() => {
            setModal(false);
          }, 5000);
          return () => clearTimeout(timer);
        }
      });
  };

  const EmployeeBox = ({item}) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('DownloadInvoice', {
          employeeId: item._id,
          name: item.name,
        })
      }
      style={styles.EmpBox}>
      <View style={styles.DataBox1}>
        <Text style={styles.TextTitle}>Name: {item.name} </Text>
        <Text style={styles.TextTitle}>
          Role: {item.updates[item.updates.length - 1]?.category || 'N/A'}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.MainContainer}>
      <View style={styles.CompanyData}>
        <Text style={styles.Text1}>BISHWA EVERGREEN SOLUTION</Text>
        <Text style={styles.Text2}>
          187,DAKSHIN HARISHPUR,AMTA-I,HOWRAH-711401
        </Text>
      </View>
      <View style={styles.Box1}>
        <TouchableOpacity
          onPress={() => navigation.navigate('ShowEmployeeForSalary')}
          style={styles.Button}>
          <Text style={styles.text}>Invoice Generate</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            FetchData(), setLoding(true);
          }}
          style={styles.Button2}>
          <Text style={styles.text}>Show Invoice</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.Box2}>
        {modal && (
          <Modal animationType="fade" transparent={true} visible={true}>
            <View style={styles.modalContainer}>
              <View style={styles.ModalBox}>
                <Text style={styles.ModalMessage}>{message}</Text>
              </View>
            </View>
          </Modal>
        )}

        {loding && Data.length === 0 ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <FlatList
            data={Data}
            keyExtractor={item => item._id}
            renderItem={EmployeeBox}
          />
        )}
      </View>
    </View>
  );
};

export default SalaryManuScreen;

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
  },
  CompanyData: {
    height: 90,
    width: '100%',
    backgroundColor: '#3E7B27',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
  },
  Text1: {
    fontSize: 23,
    fontFamily: 'Montserrat-SemiBold',
    color: '#fafafa',
  },
  Text2: {
    fontSize: 14,
    fontFamily: 'Montserrat-Medium',
    color: '#fafafa',
  },
  Box1: {
    height: 100,
    width: '100%',
    // backgroundColor:"orange",
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  Button: {
    height: 50,
    width: "45%",
    backgroundColor: '#EC8305',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Button2: {
    height: 50,
    width: "45%",
    backgroundColor: '#3674B5',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 19,
    color: '#fafafa',
  },
  Box2: {
    flex: 1,
    // backgroundColor: 'green',
  },
  EmpBox: {
    height: 100,
    width: '95%',
    backgroundColor: '#81BFDA',
    borderRadius: 10,

    // paddingLeft:10,
    marginTop: 15,
    flexDirection: 'row',
    marginLeft: 13,
    elevation: 10,
  },
  DataBox1: {
    height: 100,
    width: '90%',
    // backgroundColor:"red",
    justifyContent: 'center',
    paddingLeft: 10,
  },
  DataBox2: {
    height: 100,
    width: '10%',
    // backgroundColor:"black",
  },
  Dot: {
    marginTop: 10,
    height: 20,
    width: 20,
    tintColor: '#347928',
  },
  TextTitle: {
    fontSize: 20,
    fontFamily: 'Montserrat-Medium',
    color: '#fafafa',
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
