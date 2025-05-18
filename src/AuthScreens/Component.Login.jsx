import {
  StyleSheet,
  Text,
  TextInput,
  StatusBar,
  TouchableOpacity,
  View,
  Modal,
  ActivityIndicator,
} from 'react-native';
import React, { useState } from 'react';

import UserhandUp from '../../svg/user-handup.svg';
import User from '../../svg/email.svg';
import Pass from '../../svg/password.svg';

import Building1 from '../../svg/building1.svg';
import api from '../../API/Api';

const Login = ({ navigation,setIsAuthenticated}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [fieldCheck, setFieldCheck] = useState(false);
  const [validCheck, setValidCheck] = useState(false);
  
  const SignIn = () => {
    console.log(email, password);
    CheckallField(email, password);
  };

  const CheckallField = (e, p) => {
    if (e?.length > 0 && p?.length > 0) {
      setFieldCheck(false);
      Login2(e, p);
    } else {
      console.log('All fields required');
      setModalVisible(false);
      setFieldCheck(true);
    }
  };

  const Login2 = async (em, pa) => {
    setModalVisible(true);
    try {
      const res = await api.post('/admin/login', {
        email: em,
        password: pa,
      });

      console.log(res.data.success);
      if (res.data.success) {
        setValidCheck(false);
        setIsAuthenticated(true);
      } else {
        setValidCheck(true);
      }
    } catch (err) {
      console.log('Login error:', err);
    } finally {
      setModalVisible(false);
    }
  };

  return (
    <View style={styles.Container}>
      <StatusBar hidden={true} />

      {modalVisible && (
        <Modal animationType="fade" transparent={true} visible={modalVisible}>
          <View style={styles.ModalBackground}>
            <View style={styles.ModalBox}>
              <ActivityIndicator size="large" color="#3498db" />
              <Text>Please Wait</Text>
            </View>
          </View>
        </Modal>
      )}

      <View style={styles.topbox}>
        <UserhandUp style={styles.UserhandUp} height={100} width={100} />
      </View>

      <View style={styles.Middlebox}>
        <View style={styles.InputBox}>
          <User height={38} width={'15%'} fill="blue" style={styles.UserIcon} />
          <TextInput
            style={styles.Input}
            placeholder="Email"
            placeholderTextColor="#23486A"
            keyboardType="email-address"
            onChangeText={(text) => setEmail(text)}
          />
        </View>

        <View style={styles.InputBox}>
          <Pass height={35} width={'15%'} fill="blue" style={styles.UserIcon} />
          <TextInput
            style={styles.Input}
            placeholder="Password"
            placeholderTextColor="#23486A"
            secureTextEntry={true}
            onChangeText={(pass) => setPassword(pass)}
          />
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate('ForgetPass')}
          style={styles.ForgetPass}>
          <Text>Forget Your Password</Text>
        </TouchableOpacity>

        {fieldCheck && (
          <View style={styles.emailExist}>
            <Text style={styles.emailExistMessage}>All fields are required</Text>
          </View>
        )}

        {validCheck && (
          <View style={styles.emailExist}>
            <Text style={styles.emailExistMessage}>Invalid email and password</Text>
          </View>
        )}

        <TouchableOpacity style={styles.login} onPress={SignIn}>
          <Text style={styles.SignInTitle}>Sign In</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.signup}
          onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.SignInTitle}>Register</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttompbox}>
        <Building1 height={230} width={230} fill="#A6AEBF" />
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FBFBFB',
  },
  emailExist: {
    height: 20,
    width: '85%',
    paddingRight: 10,
    alignItems: 'flex-end',
  },
  emailExistMessage: {
    color: 'red',
    fontWeight: 'bold',
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
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  ModalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topbox: {
    height: '25%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  UserhandUp: {
    color: 'red',
  },
  Middlebox: {
    height: '40%',
    width: '100%',
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
    borderWidth: 1,
  },
  Input: {
    height: 45,
    width: '85%',
    fontSize: 18,
    color: '#3B6790',
  },
  ForgetPass: {
    height: 30,
    width: '85%',
    alignItems: 'flex-end',
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
    marginTop: 10,
  },
  SignInTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  buttompbox: {
    height: '35%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
