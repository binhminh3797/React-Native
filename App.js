/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Parse from 'parse/react-native.js';
import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {Provider} from 'react-redux';
import {applyMiddleware, combineReducers, createStore} from 'redux';
import createSagaMiddleware from 'redux-saga';
import AddUser from './src/addUser/AddUser';
import DetailsUser from './src/detailsUser/DetailsUser';
import EditUser from './src/editUser/EditUser';
import Home from './src/home/Home';
import Login from './src/Login/Login';
import memberTeam from './src/membersTeam/MemberTeam';
import Register from './src/Register/Register';
import SettingApplication from './src/settingApp/SettingApp';
import TeamDetailsInformation from './src/teamDetails/TeamDetailsInformation';
import addUserReducer from './store/reducer/User/AddUser.Reducer';
import deleteUserReducer from './store/reducer/User/DeleteUser.Reducer';
import getDetailsUserReducer from './store/reducer/User/DetailsUser.Reducer';
import editUserReducer from './store/reducer/User/EditUser.Reducer';
import getUserReducer from './store/reducer/User/GetUser.Reducer';
import root from './store/sagas/indexSaga';
//---------Back4App------------//
Parse.setAsyncStorage(AsyncStorage);
Parse.initialize(
  '3F5Rv67YLuqUMXMJeZYYMqdCkkvDE2uuVls7NX9K',
  'tDSCZI8qZPkly3967LWu55ltd14iF9q52cwjFzHd',
);
Parse.serverURL = 'https://parseapi.back4app.com/';
//------------Redux-----------------//

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  user: getUserReducer,
  detailsUser: getDetailsUserReducer,
  addUser: addUserReducer,
  editUser: editUserReducer,
  deleteUser: deleteUserReducer,
});
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(root);
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Auth = () => {
  return (
    <Provider store={store}>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </Provider>
  );
};
const MainContent = () => {
  return (
    <Provider store={store}>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            title: 'My home',
            headerStyle: {
              backgroundColor: '#f4511e',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="AddUser"
          component={AddUser}
          options={{
            title: 'Create New User',
            headerStyle: {
              backgroundColor: '#f4511e',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="DetailsUser"
          component={DetailsUser}
          options={{
            title: 'Details User',
            headerStyle: {
              backgroundColor: '#f4511e',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="MembersTeam"
          component={memberTeam}
          options={{
            title: "Team's Members",
            headerStyle: {
              backgroundColor: '#f4511e',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="TeamDetails"
          component={TeamDetailsInformation}
          options={{
            title: "Team's Details Information",
            headerStyle: {
              backgroundColor: '#f4511e',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="EditUser"
          component={EditUser}
          options={{
            title: "Edit Team's Member Information",
            headerStyle: {
              backgroundColor: '#f4511e',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="Setting"
          component={SettingApplication}
          options={{
            title: 'Setting Application',
            headerStyle: {
              backgroundColor: '#f4511e',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
      </Stack.Navigator>
    </Provider>
  );
};
const MainApp = () => {
  return (
    <Provider store={store}>
      <Tab.Navigator
        tabBarOptions={{
          labelStyle: {
            fontSize: 15,
            textAlign: 'center',
          },
        }}>
        <Tab.Screen
          name="  "
          component={MainContent}
          options={{
            tabBarIcon: ({focused}) => {
              return (
                <View>
                  <Image
                    source={require('../DemoApplication/icon/home.png')}
                    style={styles.image}
                  />
                </View>
              );
            },
          }}
        />
        <Tab.Screen
          name=" "
          component={AddUser}
          options={{
            tabBarIcon: ({focused}) => {
              return (
                <View>
                  <Image
                    source={require('../DemoApplication/icon/add1.png')}
                    style={styles.imageAdd}
                  />
                </View>
              );
            },
          }}
        />
        <Tab.Screen
          name="   "
          component={TeamDetailsInformation}
          options={{
            tabBarIcon: ({focused}) => {
              return (
                <View>
                  <Image
                    source={require('../DemoApplication/icon/info.png')}
                    style={styles.image}
                  />
                </View>
              );
            },
          }}
        />
      </Tab.Navigator>
    </Provider>
  );
};
const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Auth">
          <Stack.Screen
            name="Auth"
            component={Auth}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="MainApp"
            component={MainApp}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};
const styles = StyleSheet.create({
  image: {
    marginTop: 20,
    width: 30,
    height: 30,
    alignContent: 'center',
  },
  imageAdd: {
    width: 50,
    height: 50,
    alignContent: 'center',
  },
});
export default App;
