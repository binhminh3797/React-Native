import {Picker} from '@react-native-picker/picker';
import React from 'react';
import {
  Button,
  TextInput,
  StyleSheet,
  View,
  Alert,
  Text,
  Image,
  TouchableOpacity,
  TouchableNativeFeedback,
} from 'react-native';
import {connect} from 'react-redux';
import {
  actAddUserPending,
  actClearError,
} from '../../store/action/User/AddUser.Action';
import {
  addUserError,
  addUserPending,
  addUserStatus,
} from '../../store/selector/User/AddUser.Selector';

const mapStateToProps = state => ({
  status: addUserStatus(state.addUser),
  pending: addUserPending(state.addUser),
  error: addUserError(state.addUser),
});
const mapDispatchToProps = dispatch => ({
  addUserAction: (fullName, age, email, gender) =>
    dispatch(actAddUserPending(fullName, age, email, gender)),
  clearError: () => dispatch(actClearError()),
});
const initState = {
  fullName: '',
  age: '',
  email: '',
  gender: '-1',
};
class AddUser extends React.Component {
  constructor(props) {
    super(props);
    const {clearError} = this.props;
    clearError();
  }
  state = initState;
  onChangeText = (name, value) => {
    this.setState({[name]: value});
  };
  clearState = () => {
    this.setState(initState);
  };
  onSubmit = () => {
    const {addUserAction} = this.props;
    const {clearError} = this.props;
    console.log(this.state);
    //console.log(this.props.error);

    addUserAction(
      this.state.fullName,
      this.state.age,
      this.state.email,
      this.state.gender,
    );
    setTimeout(() => {
      if (this.props.error != null) {
        console.log(this.props.error);
        Alert.alert('Add User Error');
        clearError();
      } else {
        Alert.alert('Add User Success');
        this.clearState();
        this.props.navigation.navigate('Home');
      }
    }, 1000);
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.boxHeader}>
          <Text style={styles.header}>Add Team's Member</Text>
        </View>
        <View style={styles.boxContent}>
          {/* <TextInput
            placeholder={'User Name'}
            name="userName"
            style={styles.input}
            value={this.state.userName}
            onChangeText={value => this.onChangeText('userName', value)}
          /> */}
          <TextInput
            placeholder={'Full Name'}
            name="fullName"
            style={styles.input}
            value={this.state.fullName}
            onChangeText={value => this.onChangeText('fullName', value)}
          />
          <TextInput
            placeholder={'Age'}
            keyboardType="number-pad"
            name="age"
            style={styles.input}
            value={this.state.age}
            onChangeText={value => this.onChangeText('age', value)}
          />
          <TextInput
            placeholder={'Email'}
            keyboardType="email-address"
            name="email"
            style={styles.input}
            value={this.state.email}
            onChangeText={value => this.onChangeText('email', value)}
          />
          <TouchableOpacity style={styles.boxPicker}>
            <Picker
              selectedValue={this.state.gender}
              style={styles.picker}
              onValueChange={value => this.onChangeText('gender', value)}>
              <Picker.Item label="Please select gender..." selectedValue="-1" />
              <Picker.Item label="Male" value="1" />
              <Picker.Item label="Female" value="0" />
            </Picker>
          </TouchableOpacity>
          <Button title="Add New User" onPress={this.onSubmit} />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  boxHeader: {
    paddingVertical: 20,
    backgroundColor: '#f4511e',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  boxContent: {
    flex: 1.8,
  },
  header: {
    marginLeft: 10,
    fontWeight: 'bold',
    fontSize: 18,
    color: 'white',
  },
  input: {
    height: 50,
    margin: 12,
    padding: 12,
    borderWidth: 1,
    fontSize: 17,
  },
  image: {
    marginRight: 10,
    height: 25,
    width: 25,
  },
  boxPicker: {
    borderWidth: 1,
    margin: 12,
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(AddUser);
