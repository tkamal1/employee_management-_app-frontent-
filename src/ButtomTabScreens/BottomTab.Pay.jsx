import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
const stack = createStackNavigator();
import SalaryManuScreen from '../SalaryInvoice/SalaryManuScreen'
import ShowEmployeeForSalary from '../SalaryInvoice/ShowEmployeeForSalary';
import EmployeeInvoiceShowbyMonth from "../SalaryInvoice/EmployeeInvoiceShowbyMonth";
import InvoiceGenaret from '../SalaryInvoice/InvoiceGenaret';
import DownloadInvoice from '../SalaryInvoice/DownloadInvoice';
const Pay= () => {
  return (
    <stack.Navigator screenOptions={{headerShown: false}}>
    <stack.Screen name="SalaryManuScreen" component={SalaryManuScreen}/>
    <stack.Screen name="ShowEmployeeForSalary" component={ShowEmployeeForSalary}/>
    <stack.Screen name="EmployeeInvoiceShowbyMonth" component={EmployeeInvoiceShowbyMonth}/>
    <stack.Screen name="InvoiceGenaret" component={InvoiceGenaret}/>
    <stack.Screen name="DownloadInvoice" component={DownloadInvoice}/>
   
   </stack.Navigator>
  )
}

export default Pay

const styles = StyleSheet.create({})