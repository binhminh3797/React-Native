import {Picker} from '@react-native-picker/picker';
import React from 'react';
import {
  Button,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {connect} from 'react-redux';
import {actEditUserPending} from '../../store/action/User/EditUser.Action';
import {
  editUserError,
  editUserPending,
  editUserStatus,
} from '../../store/selector/User/EditUser.Selector';
const mapStateToProps = state => ({
  status: editUserStatus(state.editUser),
  pending: editUserPending(state.editUser),
  error: editUserError(state.editUser),
});
const mapDispatchToProps = dispatch => ({
  editUserAction: (id, fullName, age, email, gender) =>
    dispatch(actEditUserPending(id, fullName, age, email, gender)),
});
class EditUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.route.params.detailsUser;
    console.log(this.state);
  }
  onChangeText = (name, value) => {
    this.setState({[name]: value});
  };
  onSubmit = () => {
    const {editUserAction} = this.props;
    editUserAction(
      this.state.id,
      this.state.fullName,
      this.state.age,
      this.state.email,
      this.state.gender === 'Male' ? 1 : 0,
    );
    this.props.navigation.navigate('DetailsUser', {id: this.state.userId});
  };
  render() {
    const {detailsUser} = this.props.route.params;
    return (
      <View style={styles.boxContent}>
        <TextInput
          placeholder={'Full Name'}
          name="fullName"
          style={styles.input}
          defaultValue={detailsUser.fullName}
          onChangeText={value => this.onChangeText('fullName', value)}
        />
        <TextInput
          placeholder={'Age'}
          keyboardType="number-pad"
          name="age"
          style={styles.input}
          defaultValue={detailsUser.age.toString()}
          onChangeText={value => this.onChangeText('age', value)}
        />
        <TextInput
          placeholder={'Email'}
          keyboardType="email-address"
          name="email"
          style={styles.input}
          defaultValue={detailsUser.email}
          onChangeText={value => this.onChangeText('email', value)}
        />
        <TouchableOpacity style={styles.boxPicker}>
          <Picker
            onValueChange={value => this.onChangeText('gender', value)}
            selectedValue={detailsUser.gender}>
            <Picker.Item label="Please select gender..." selectedValue="-1" />
            <Picker.Item label="Male" value="Male" />
            <Picker.Item label="Female" value="Female" />
          </Picker>
        </TouchableOpacity>
        <Button title="Submit" onPress={this.onSubmit} />
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
  boxPicker: {
    borderWidth: 1,
    margin: 12,
  },
  image: {
    marginRight: 10,
    height: 25,
    width: 25,
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(EditUser);
