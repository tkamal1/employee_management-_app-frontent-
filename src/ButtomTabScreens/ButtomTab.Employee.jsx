import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import ShowEmployee from "../EmployeeScreens/ShowEmployee";
import AddEmployee from '../EmployeeScreens/AddEmployee';
import UpdateEmployee from '../EmployeeScreens/UpdateEmployee';
import EmployeeHistory from '../EmployeeScreens/EmployeeHistory';

const stack = createStackNavigator();
const Employee = () => {
  return (
   <stack.Navigator screenOptions={{headerShown: false}}>
    <stack.Screen name="Employee" component={ShowEmployee}/>
    <stack.Screen name='AddEmployee' component={AddEmployee} />
    <stack.Screen name='UpdateEmployee' component={UpdateEmployee} />
    <stack.Screen name='EmployeeHistory' component={EmployeeHistory} />
   </stack.Navigator>
  )
}

export default Employee;

const styles = StyleSheet.create({})