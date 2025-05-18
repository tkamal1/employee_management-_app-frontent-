import {Text, View, SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import React  from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();
import Login from '../AuthScreens/Component.Login';
import SignUp from '../AuthScreens/Component.SignUp';
import ForgetPass from '../AuthScreens/Component.ForgetPass';


const AuthStack = ({setIsAuthenticated}) => {


  return (
    <Stack.Navigator>
      <Stack.Screen name="SignIn" options={{headerShown: false}}>
        {props => <Login {...props} setIsAuthenticated={setIsAuthenticated} />}
      </Stack.Screen>

      <Stack.Screen options={{headerShown: false}} name="SignUp">
        {props => <SignUp {...props} setIsAuthenticated={setIsAuthenticated} />}
      </Stack.Screen>

      <Stack.Screen name="ForgetPass" options={{headerShown: false}}>
        {props => 
          <ForgetPass {...props} setIsAuthenticated={setIsAuthenticated} />
        }
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default AuthStack;
