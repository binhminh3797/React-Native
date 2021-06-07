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
import LoginService from '../../store/service/Auth/Login.Service';

// });
const initialState = {
  userName: '',
  password: '',
  dataLogin: [],
  loading: false,
  error: null,
};
class Login extends React.Component {
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
  clearState = () => {
    this.setState(initialState);
  };
  onSubmit = () => {
    const {userName} = this.state;
    const {password} = this.state;
    const {navigation} = this.props;
    if (userName === '' || password === '') {
      this.setState({['error']: 'UserName or Password is required!'});
    } else {
      this.setState({['loading']: true});
      LoginService.loginBack4App(userName, password)
        .then(rs => {
          this.setState({['dataLogin']: rs});
          navigation.replace('MainApp');
          this.setState({['loading']: false});
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
    this.props.navigation.navigate('Register');
  };

  render() {
    //const {pending, error} = this.props;
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
      <>
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
              value={this.state.userName}
              onChangeText={value => this.onChangeText('userName', value)}
            />
            <TextInput
              placeholder="Password"
              secureTextEntry={true}
              style={styles.input}
              value={this.state.password}
              onChangeText={value => this.onChangeText('password', value)}
            />
            {error !== null ? (
              <Text style={styles.errorTextStyle}>{error}</Text>
            ) : (
              <></>
            )}
            <Button title="Login" onPress={this.onSubmit} />
            <TouchableOpacity
              style={styles.boxRegister}
              onPress={this.handlerRegister}>
              <Text style={styles.textRegister}>
                Don't have an account? Register
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </>
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
    flex: 1,
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
export default Login;
