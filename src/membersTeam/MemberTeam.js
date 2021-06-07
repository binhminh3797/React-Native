import React from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {connect} from 'react-redux';
import {actGetUserPending} from '../../store/action/User/GetUser.Action';
import {
  getUser,
  getUserError,
  getUserPending,
} from '../../store/selector/User/GetUser.Selector';
//Được gọi khi trạng thái thay đổi

const mapStateToProps = state => {
  return {
    dataUser: getUser(state.user),
    pending: getUserPending(state.user),
    error: getUserError(state.user),
  };
};
const mapDispatchToProps = dispatch => ({
  getUserAction: searchValue => dispatch(actGetUserPending(searchValue)),
});
const ConvertIcon = ({gender}) => {
  if (gender === 1) {
    return (
      <Image source={require('../../icon/profile.png')} style={styles.image} />
    );
  } else {
    return (
      <Image source={require('../../icon/elf.png')} style={styles.image} />
    );
  }
};

const User = ({user}) => {
  return (
    <View style={styles.item}>
      {/* <Image source={require('../../icon/profile.png')} style={styles.image} /> */}
      <ConvertIcon gender={user.get('gender')} />
      <View style={styles.boxInfo}>
        <Text style={styles.fullName}> {user.get('fullName')} </Text>
        <Text style={styles.email}> {user.get('email')} </Text>
      </View>
    </View>
  );
};
const initialState = {
  searchValue: '',
};
class MemberTeam extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }
  componentDidMount() {
    const {getUserAction} = this.props;
    const {searchValue} = this.state;
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      getUserAction(searchValue);
      this.setState(initialState);
    });
  }
  componentWillUnmount() {
    this._unsubscribe();
  }
  searchValue = (name, value) => {
    this.setState({[name]: value});
  };
  submitSearch = () => {
    const {getUserAction} = this.props;
    const {searchValue} = this.state;
    getUserAction(searchValue);
    this.state = initialState;
  };
  render() {
    const {dataUser, pending} = this.props;
    if (pending === true) {
      return (
        <View style={[styles.container]}>
          <View style={styles.boxHeader}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search"
              value={this.state.searchValue}
              onChangeText={value => this.searchValue('searchValue', value)}
              onSubmitEditing={() => {
                this.submitSearch();
              }}
            />
          </View>
          <View style={styles.containerLoading}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <View style={styles.boxHeader}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            value={this.state.searchValue}
            onChangeText={value => this.searchValue('searchValue', value)}
            onSubmitEditing={() => {
              this.submitSearch();
            }}
          />
        </View>
        <View style={styles.boxItem}>
          <FlatList
            data={dataUser}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate('DetailsUser', {
                    id: item.id,
                  });
                }}>
                <User user={item} />
              </TouchableOpacity>
            )}
            keyExtractor={user => user.id}
          />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    backgroundColor: '#F7F7F7',
  },
  containerLoading: {
    flex: 1,
    justifyContent: 'center',
  },
  boxItem: {
    flex: 1,
    marginTop: 10,
    marginBottom: 10,
  },
  item: {
    marginVertical: 10,
    marginHorizontal: 15,
    padding: 10,
    backgroundColor: '#FFF',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: 5,
  },
  image: {
    width: 80,
    height: 80,
  },
  boxInfo: {
    marginVertical: 20,
    marginHorizontal: 15,
    textAlign: 'center',
    flex: 1,
  },
  fullName: {
    fontFamily: 'Cochin',
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#008080',
    fontSize: 18,
    alignSelf: 'center',
  },
  email: {
    fontSize: 14,
    flex: 1,
    alignSelf: 'center',
    color: '#696969',
  },
  boxHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginHorizontal: 20,
  },
  searchInput: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    borderColor: '#333',
    borderWidth: 1,
    borderRadius: 20,
    width: '100%',
    fontSize: 15,
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(MemberTeam);
