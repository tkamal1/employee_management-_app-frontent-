import {Text, StyleSheet, View, StatusBar} from 'react-native';
import React, {Component} from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';

import HomeScreen from '../ButtomTabScreens/ButtomTab.Home';
import Employee from '../ButtomTabScreens/ButtomTab.Employee';
import Attendance from '../ButtomTabScreens/ButtomTab.Attendance';
import Pay from '../ButtomTabScreens/BottomTab.Pay';

import {Image} from 'react-native';
const Tab = createBottomTabNavigator();
export default class ButtomTab extends Component {
  render() {
    return (
      
      <Tab.Navigator
        screenOptions={{
          tabBarHideOnKeyboard: true,
          tabBarShowLabel: false,
          tabBarStyle: {
            height: 60,
            backgroundColor: '#FAFAFA',
          },
        }}>
          
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerStyle: {
              height: 65,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor:"#FFA725"
            },

            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontSize: 23,
              fontFamily: 'Montserrat-Regular',
            },
            tabBarIcon: ({focused}) => (
              <View style={styles.HomeIconContainer}>
                <Image
                  source={require('../../TabBaricons/home.png')}
                  style={{
                    width: 30,
                    height: 30,
                    tintColor: focused ? '#FFB200' : '#A59D84',
                  }}
                />
                <Text style={styles.homeText}> Home </Text>
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Employee"
          // component={AddEmployee}
          options={{
            headerStyle: {
              height: 65,
              justifyContent: 'center',
              alignItems: 'center',
               backgroundColor:"#FFA725"
            },
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontSize: 23,
              fontFamily: 'Montserrat-Regular',
            },
            tabBarIcon: ({focused}) => (
              <View style={styles.HomeIconContainer}>
                <Image
                  source={require('../../TabBaricons/employee.png')}
                  style={{
                    width: 30,
                    height: 30,
                    tintColor: focused ? '#FFB200' : '#A59D84',
                  }}
                />
                <Text style={styles.homeText}>Employee</Text>
              </View>
            ),
          }}>
          {() => <Employee />}
        </Tab.Screen>
        <Tab.Screen
          name="Attendance"
          component={Attendance}
          options={{
            headerStyle: {
              height: 65,
              justifyContent: 'center',
              alignItems: 'center',
               backgroundColor:"#FFA725"
            },
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontSize: 23,
              fontFamily: 'Montserrat-Regular',
            },
            tabBarIcon: ({focused}) => (
              <View style={styles.HomeIconContainer}>
                <Image
                  source={require('../../TabBaricons/attendance.png')}
                  style={{
                    width: 30,
                    height: 30,
                    tintColor: focused ? '#FFB200' : '#A59D84',
                  }}
                />
                <Text style={styles.homeText}>Attendance</Text>
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Invoice"
          component={Pay}
          options={{
            headerStyle: {
              height: 65,
              justifyContent: 'center',
              alignItems: 'center',
               backgroundColor:"#FFA725"
            },
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontSize: 23,
              fontFamily: 'Montserrat-Regular',
            },
            tabBarIcon: ({focused}) => (
              <View style={styles.HomeIconContainer}>
                <Image
                  source={require('../../TabBaricons/bill.png')}
                  style={{
                    width: 30,
                    height: 30,
                    tintColor: focused ? '#FFB200' : '#A59D84',
                  }}
                />
                <Text style={styles.homeText}>Invoice</Text>
              </View>
            ),
          }}
        />
      </Tab.Navigator>
    );
  }
}

const styles = StyleSheet.create({
  HomeIconContainer: {
    // backgroundColor: 'red',
    height: 60,
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
  },
  homeText: {
    fontSize: 13,
    color: 'Black',
    fontFamily: 'Montserrat-Regular',
    fontWeight: 600,
  },
});
