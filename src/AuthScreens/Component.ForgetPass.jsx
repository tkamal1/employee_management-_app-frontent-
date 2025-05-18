import {
  ActivityIndicator,
  Modal,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Bolt from '../../svg/bolt.svg';

import Man from '../../svg/man-f.svg';

import User from '../../svg/email.svg';
import Pass from '../../svg/password.svg';

import api from '../../API/Api';
const ForgetPass = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const [activity, setActivity] = useState();
  const [checkEmail, setChekEmail] = useState();

  const [allField, setAllField] = useState();
  const [emailExist, setEmailExist] = useState();

  Submit = () => {
    FillCheck(email, password)
    
  }

  const FillCheck = (email, password) => {

    if (email?.length > 0 && password?.length > 0) {
      setAllField(false)
      EmailCheck(email,password)
      setActivity(true)
    } else {
      console.log('all field rewuired')
      setActivity(false)
      setAllField(true)
    }
  };

  const EmailCheck = async (email,password) => {
    await api.put('/admin/forgate-pass',{email:email, newPassword:password})
    .then(res=>{
      console.log(res.data.data._id)
      setEmailExist(false)
      setActivity(false)

    }).catch(err=>{
      if(err.status === 404)
      {
        setEmailExist(true)
        setActivity(false)
      }
    })
  };

  return (
    <View style={styles.MainContainer}>
      <StatusBar hidden={true} />

      {activity && (
        <Modal animationType="fade" transparent={true} visible={true}>
          <View style={styles.ModalContainer}>
            <View style={styles.ModalBox}>
              <ActivityIndicator size="large" color="#3498db" />
              <Text style={styles.ModalBoxText}>Please Wait</Text>
            </View>
          </View>
        </Modal>
      )}

      {/* Top Box */}
      <View style={styles.TopBox}>
        <Man style={styles.Man} height={120} width={200} />
      </View>

      {/*  MidBox */}
      <View style={styles.MidBox}>
        {/* //EmailBox */}
        <Text style={styles.HeaderText}>Create New Password</Text>
        <View style={styles.EmailBox}>
          <User height={30} width={40} style={styles.EmailSvg} />
          <TextInput
            style={styles.EmailInput}
            placeholder="Email"
            placeholderTextColor="#524C42"
            keyboardType="email-address"
            onChangeText={text => setEmail(text)}></TextInput>
        </View>
        {/* //Password  */}
        <View style={styles.EmailBox}>
          <Pass height={30} width={40} style={styles.EmailSvg} />
          <TextInput
            style={styles.EmailInput}
            placeholder="New Password"
            placeholderTextColor="#524C42"
            keyboardType="email-address"
            onChangeText={text => setPassword(text)}></TextInput>
        </View>

        {allField && (
          <View style={styles.msgBox}>
            <Text style={styles.msgText}> All field required</Text>
          </View>
        )}
        {emailExist && (
          <View style={styles.msgBox}>
            <Text style={styles.msgText}> Email Dose not exist </Text>
          </View>
        )}

        {/* //Submit Button */}
        <TouchableOpacity style={styles.SubmitButton} onPress={Submit}>
          <Text style={styles.SubmitText}> SUBMIT</Text>
        </TouchableOpacity>
      </View>

      {/* ButtomBox */}
      <View style={styles.ButtomBox}>
        <Bolt style={styles.Bolt} height={200} fill={'#BC9F8B'} width={220} />
      </View>
    </View>
  );
};

export default ForgetPass;

const styles = StyleSheet.create({
  HeaderText: {
    fontSize: 28,
    color: '#0E2954',
    fontWeight: 600,
    elevation: 10,
  },
  ModalContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: 200,
  },
  ModalBox: {
    height: 100,
    width: 200,
    backgroundColor: 'green',
    borderRadius: 10,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ModalBoxText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 500,
  },
  MainContainer: {
    fles: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  TopBox: {
    height: '25%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'orange',
  },
  Man: {
    // backgroundColor:"red"
  },
  MidBox: {
    height: '40%',
    width: '100%',
    // justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'white',
  },
  EmailBox: {
    height: 50,
    width: '85%',
    backgroundColor: '#D9EAFD',
    flexDirection: 'row',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'grey',
    alignItems: 'center',
    marginTop: 16,
    elevation: 4,
  },
  EmailSvg: {
    width: '10%',
    height: 45,
    // backgroundColor:"blue"
  },
  EmailInput: {
    width: '90%',
    height: 45,
    fontSize: 18,
    // backgroundColor:"red"
  },
  SubmitButton: {
    height: 50,
    width: '60%',
    backgroundColor: '#F97300',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    elevation: 6,
    borderColor: '#A6AEBF',
    borderWidth: 2,
  },
  SubmitText: {
    fontSize: 23,
    fontWeight: 600,
    color: 'white',
  },
  ButtomBox: {
    height: '35%',
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    // backgroundColor: 'green',
  },
  msgBox: {
    height: 25,
    width: '84%',
    // backgroundColor:"red",
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  msgText: {
    fontSize: 18,
    color: 'red',
  },
});
