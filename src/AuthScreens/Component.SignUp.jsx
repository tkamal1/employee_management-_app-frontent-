import {
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  StatusBar,
  TouchableOpacity,
  View,
  Modal,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';

import Welder from '../../svg/welder.svg';
import UserName from '../../svg/user.svg';
import User from '../../svg/email.svg';
import Pass from '../../svg/password.svg';

import Signin from '../../svg/signin.svg';

import Building2 from '../../svg/building2.svg';


import axios from 'axios';
import api from '../../API/Api';


const SignUp = ({setIsAuthenticated}) => {
  // const { setIsAuthenticated } = route.params; // Get function from props
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isemail, setIsEmail] = useState();
  const [isModal, setIsModal] = useState();
  const [allfield, setAllfield] = useState();

  Submit = () => {
    console.log(name, email, password);
    
    CheckallField();
    // setIsModal(true)
  };

  const CheckallField = ()=>{
    if(name.length > 0 && email.length > 0 && password.length > 0)
    {
      emailCheck(email);
      setAllfield(false);
    }
    else{
      setAllfield(true);
    }
  };

  const emailCheck = async email => {
    try {
      const response = await api.post('/admin/GetEmail', {email});

      if (response.data.success) {
        setIsEmail(true); // show msg email already exist
        setIsModal(false) // popup modal false
        console.log('data is find');
      } else {
        console.log('data not found');
      }
    } catch (error) {
      if (error.response.status === 404) {
        console.log('data is not found 404');
        setIsEmail(false);
        setIsModal(false)
        createAdmin();
      } else {
        return {
          success: false,
          message: 'No response from server. Please try again.',
        };
      }
    }
  };

  const createAdmin = async () => {
    await api
      .post('/admin/register', {
        name: name,
        email: email,
        password: password,
      })
      .then(res => {
        console.log(res);
        console.log("account is successfuly created")
        setIsAuthenticated(true)
      })
      .catch(err => {
        console.log("accound created faild server error");
        console.log(err);
      });
  };

  return (
    <View style={styles.Container}>
      <StatusBar hidden={true} />

      {isModal && (
        <Modal
          animationType="fade" // Can be 'slide', 'fade', or 'none'
          transparent={true}
          visible={true}>
          <View style={styles.ModalBackground}>
            <View style={styles.ModalBox}>
              <ActivityIndicator size="large" />
              <Text>Please Wait</Text>
            </View>
          </View>
        </Modal>
      )}

      {/* top box */}
      <View style={styles.topbox}>
        <Signin style={styles.UserhandUp} height={120} width={120} />
      </View>
      {/* //Middlebox */}
      <View style={styles.Middlebox}>
        <View style={styles.InputBox}>
          <UserName
            height={38}
            width={'15%'}
            fill="blue"
            style={styles.UserIcon}
          />
          <TextInput
            style={styles.Input}
            placeholder="Name"
            placeholderTextColor="#23486A"
            keyboardType="default"
            onChangeText={text => setName(text)}></TextInput>
        </View>
        <View style={styles.InputBox}>
          <User height={38} width={'15%'} fill="blue" style={styles.UserIcon} />
          <TextInput
            style={styles.Input}
            placeholder="Email"
            placeholderTextColor="#23486A"
            keyboardType="email-address"
            onChangeText={text => setEmail(text)}></TextInput>
        </View>
        {isemail && (
          <View style={styles.emailExist}>
            <Text style={styles.emailExistMessage}>Email already exist</Text>
          </View>
        )}

        <View style={styles.InputBox}>
          <Pass height={35} width={'15%'} fill="blue" style={styles.UserIcon} />
          <TextInput
            style={styles.Input}
            placeholder="Password"
            placeholderTextColor="#23486A"
            secureTextEntry={true}
            onChangeText={text => setPassword(text)}></TextInput>
        </View>

        {allfield && (
          <View style={styles.emailExist}>
            <Text style={styles.emailExistMessage}>All field Required</Text>
          </View>
        )}
        {/* //sign up */}
        <TouchableOpacity onPress={Submit} style={styles.signup}>
          <Text style={styles.SignInTitle}>Sign Up </Text>
        </TouchableOpacity>
      </View>
      {/* // buttompbox */}
      <View style={styles.buttompbox}>
        <Building2 height={220} width={220} fill="#A6AEBF" />
        <Welder height={100} width={100} fill="#FBA518" />
      </View>
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#9fbfe0',
    backgroundColor: '#FBFBFB',
  },
  ModalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ModalBox: {
    height: 100,
    width: 200,
    backgroundColor: '#fafafa',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    borderColor: '#526D82',
    borderWidth: 1,
    elevation: 5, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  emailExist: {
    height: '20',
    width: '85%',
    paddingRight: 10,
    alignItems: 'flex-end',
  },
  emailExistMessage: {
    color: 'red',
    fontWeight: 500,
  },
  topbox: {
    height: '20%',
    width: '100%',
    // backgroundColor:"orange",
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  UserhandUp: {},
  Middlebox: {
    height: '40%',
    width: '100%',
    // backgroundColor: 'white',
    justifyContent: 'center',

    alignItems: 'center',
  },
  InputBox: {
    height: 50,
    width: '85%',
    backgroundColor: '#F5EFFF',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 8,
    marginTop: 15,
    borderBlockColor: '#022C43',
    borderWidth: 1, // Border width
  },
  Input: {
    height: 45,
    width: '85%',
    fontSize: 18,
    color: '#3B6790',
  },

  login: {
    height: 45,
    width: '85%',
    backgroundColor: '#27445D',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signup: {
    height: 45,
    width: '85%',
    backgroundColor: '#3674B5',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  SignInTitle: {
    fontSize: 18,
    fontWeight: 600,
    color: 'white',
  },
  buttompbox: {
    height: '40%',
    width: '100%',
    flexDirection: 'row',
    // backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingBottom: '4%',
  },
});
