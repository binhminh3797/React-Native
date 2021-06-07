import React from 'react';
import {
  ActivityIndicator,
  Animated,
  Button,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import RegisterService from '../../store/service/Auth/Register.Service';
const initialState = {
  userName: '',
  password: '',
  confirmPassword: '',
  email: '',
  dataRegister: [],
  loading: false,
  error: null,
};
export default class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.boxFlex = new Animated.Value(0.8);
  }
  componentDidMount() {
    this.keyboardWillShowSub = Keyboard.addListener(
      'keyboardDidShow',
      this.keyboardWillShow,
    );
    this.keyboardWillHideSub = Keyboard.addListener(
      'keyboardDidHide',
      this.keyboardWillHide,
    );
  }
  componentWillUnmount() {
    this.keyboardWillShowSub.remove();
    this.keyboardWillHideSub.remove();
  }
  onChangeText = (name, value) => {
    this.setState({[name]: value});
  };
  onSubmit = () => {
    const {userName, password, confirmPassword, email} = this.state;
    const {navigation} = this.props;
    if (userName === '') {
      this.setState({['error']: 'UserName is required!'});
    } else if (password === '') {
      this.setState({['error']: 'Password is required!'});
    } else if (confirmPassword === '') {
      this.setState({['error']: 'Confirm Password is required!'});
    } else if (email === '') {
      this.setState({['error']: 'Email is required!'});
    } else if (password !== confirmPassword) {
      this.setState({['error']: 'The Confirm Password does not match! '});
    } else {
      this.setState({['loading']: true});
      RegisterService.registerBack4App(userName, password, email)
        .then(rs => {
          this.setState({['dataRegister']: rs});
          this.setState({['loading']: false});
          navigation.navigate('Login');
        })
        .catch(err => {
          this.setState({['loading']: false});
          this.setState({['error']: err});
        });
    }
  };
  keyboardWillShow = event => {
    Animated.parallel([
      Animated.timing(this.boxFlex, {
        duration: event.duration,
        toValue: 0,
        useNativeDriver: false,
      }).start(),
    ]);
  };
  keyboardWillHide = event => {
    Animated.parallel([
      Animated.timing(this.boxFlex, {
        duration: event.duration,
        toValue: 0.8,
        useNativeDriver: false,
      }).start(),
    ]);
  };
  handlerRegister = () => {
    this.props.navigation.goBack();
  };
  render() {
    const {loading, error} = this.state;
    if (loading === true) {
      return (
        <>
          <Animated.View style={[styles.boxHeader, {flex: this.boxFlex}]}>
            <Animated.Image
              source={require('../../icon/team1.png')}
              style={styles.image}
            />
          </Animated.View>
          <View style={styles.boxItem}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        </>
      );
    }
    return (
      <View style={styles.containerVertical}>
        <Animated.View style={[styles.boxHeader, {flex: this.boxFlex}]}>
          <Animated.Image
            source={require('../../icon/team1.png')}
            style={styles.image}
          />
        </Animated.View>
        <View style={styles.boxItem}>
          <TextInput
            placeholder="UserName"
            style={styles.input}
            onChangeText={value => this.onChangeText('userName', value)}
          />
          <TextInput
            placeholder="Password"
            secureTextEntry={true}
            style={styles.input}
            onChangeText={value => this.onChangeText('password', value)}
          />
          <TextInput
            placeholder="Confirm Password"
            secureTextEntry={true}
            style={styles.input}
            onChangeText={value => this.onChangeText('confirmPassword', value)}
          />
          <TextInput
            placeholder="Email"
            style={styles.input}
            onChangeText={value => this.onChangeText('email', value)}
          />
          {error !== null ? (
            <Text style={styles.errorTextStyle}>{error}</Text>
          ) : (
            <></>
          )}
          <Button title="Register" onPress={this.onSubmit} />
          <TouchableOpacity
            style={styles.boxRegister}
            onPress={this.handlerRegister}>
            <Text style={styles.textRegister}>
              Already have an account? Login
            </Text>
          </TouchableOpacity>
        </View>
        {/* </ScrollView> */}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  containerVertical: {
    flex: 1,
  },
  boxHeader: {
    width: '100%',
    alignItems: 'center',
    marginVertical: 20,
  },
  boxItem: {
    flex: 1.2,
    marginHorizontal: 20,
  },
  image: {
    flex: 3,
  },
  textTitle: {
    flex: 0.5,
    fontSize: 20,
    marginTop: 10,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: '#dadae8',
    fontSize: 17,
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  button: {
    marginVertical: 20,
  },
  boxRegister: {
    marginVertical: 15,
    alignItems: 'center',
  },
  textRegister: {fontSize: 17},
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
    fontSize: 16,
  },
});
