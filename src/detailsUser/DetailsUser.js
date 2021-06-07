import React from 'react';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {connect} from 'react-redux';
import {actDeleteUserPending} from '../../store/action/User/DeleteUser.Action';
import {actGetDetailsUserPending} from '../../store/action/User/DetailsUser.Action';
import {
  getDeleteUserError,
  getDeleteUserPending,
  getDeleteUserStatus,
} from '../../store/selector/User/DeleteUser.Selector';
import {
  getDetailsUser,
  getDetailsUserError,
  getDetailsUserPending,
} from '../../store/selector/User/GetDetailsUser.Selector';
const mapStateToProps = state => ({
  detailsUser: getDetailsUser(state.detailsUser),
  pending: getDetailsUserPending(state.detailsUser),
  error: getDetailsUserError(state.detailsUser),
  pendingDelete: getDeleteUserPending(state.deleteUser),
  statusDelete: getDeleteUserStatus(state.deleteUser),
  errorDelete: getDeleteUserError(state.deleteUser),
});
const mapDispatchToProps = dispatch => ({
  getDetailsUserAction: id => dispatch(actGetDetailsUserPending(id)),
  deleteUserAction: id => dispatch(actDeleteUserPending(id)),
});
const ConvertIcon = ({gender}) => {
  if (gender === 'Male') {
    return (
      <Image source={require('../../icon/profile.png')} style={styles.image} />
    );
  } else {
    return (
      <Image source={require('../../icon/elf.png')} style={styles.image} />
    );
  }
};
const BoxHeader = ({detailsUser}) => {
  return (
    <View style={styles.boxHeader}>
      <ConvertIcon gender={detailsUser.gender} />
      <View style={styles.boxInfo}>
        <Text style={styles.fullName}>{detailsUser.fullName}</Text>
        {/* <Text style={styles.userName}>({detailsUser.userName})</Text> */}
      </View>
    </View>
  );
};
const InfoContent = ({infoUser, titleInfo}) => {
  return (
    <>
      <View>
        <Text style={styles.textInfo}>{infoUser}</Text>
        <Text style={styles.title}>{titleInfo}</Text>
      </View>
    </>
  );
};
class DetailsUser extends React.Component {
  constructor(props) {
    const {width, height} = Dimensions.get('window');
    super(props);
    this.state = {
      navigationFocus: false,
      width: width,
      height: height,
    };
    this.props.navigation.setOptions({
      headerRight: () => (
        <View style={styles.navigationHeader}>
          <TouchableOpacity style={styles.boxIconAction} onPress={this.IsEdit}>
            <Image
              source={require('../../icon/edit1.png')}
              style={styles.iconAction}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.boxIconAction}
            onPress={this.DeleteAlert}>
            <Image
              source={require('../../icon/x-mark.png')}
              style={styles.iconAction}
            />
          </TouchableOpacity>
        </View>
      ),
    });
  }
  onChangeDetails = () => {
    const windowDevices = Dimensions.get('window');
    this.setState({width: windowDevices.width});
    this.setState({height: windowDevices.height});
  };
  componentDidMount() {
    const {getDetailsUserAction} = this.props;
    const {id} = this.props.route.params;

    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      getDetailsUserAction(id);
    });
    Dimensions.addEventListener('change', this.onChangeDetails);
  }

  componentWillUnmount() {
    Dimensions.removeEventListener('change', this.onChangeDetails);
    this._unsubscribe();
  }
  IsEdit = () => {
    this.props.navigation.navigate('EditUser', {
      detailsUser: this.props.detailsUser,
    });
  };
  DeleteAlert = () => {
    Alert.alert('Delete Member', 'Are you sure you want to delete?', [
      {
        text: 'OK',
        onPress: () => {
          const {id} = this.props.route.params;
          const {deleteUserAction} = this.props;
          deleteUserAction(id);
          Alert.alert('Delete Success');
          this.props.navigation.navigate('MembersTeam');
        },
      },
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
    ]);
  };

  render() {
    const {detailsUser, pending} = this.props;
    if (pending === true) {
      return (
        <View style={styles.containerLoading}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    } else {
      if (this.state.height > this.state.width) {
        return (
          <View style={styles.containerVertical}>
            <BoxHeader detailsUser={detailsUser} />
            <View style={styles.boxContent}>
              <View style={styles.infoUser}>
                <Image
                  source={require('../../icon/id-card.png')}
                  style={styles.icon}
                />
                <View style={styles.infoContent}>
                  <InfoContent
                    infoUser={detailsUser.fullName}
                    titleInfo={'Full Name'}
                  />
                </View>
              </View>
              <View style={styles.infoUser}>
                <Image
                  source={require('../../icon/hourglass.png')}
                  style={styles.icon}
                />
                <View style={styles.infoContent}>
                  <InfoContent infoUser={detailsUser.age} titleInfo={'Age'} />
                </View>
              </View>
              <View style={styles.infoUser}>
                <Image
                  source={require('../../icon/man.png')}
                  style={styles.icon}
                />
                <View style={styles.infoContent}>
                  <InfoContent
                    infoUser={detailsUser.gender}
                    titleInfo={'Gender'}
                  />
                </View>
              </View>
              <View style={styles.infoUser}>
                <Image
                  source={require('../../icon/email.png')}
                  style={styles.icon}
                />
                <View style={styles.infoContent}>
                  <InfoContent
                    infoUser={detailsUser.email}
                    titleInfo={'Email'}
                  />
                </View>
              </View>
            </View>
          </View>
        );
      } else {
        return (
          <View style={styles.containerHorizontal}>
            <BoxHeader detailsUser={detailsUser} />
            <View style={styles.boxContent}>
              <View style={styles.infoUser}>
                <Image
                  source={require('../../icon/id-card.png')}
                  style={styles.icon}
                />
                <View style={styles.infoContent}>
                  <InfoContent
                    infoUser={detailsUser.fullName}
                    titleInfo={'Full Name'}
                  />
                </View>
              </View>
              <View style={styles.infoUser}>
                <Image
                  source={require('../../icon/hourglass.png')}
                  style={styles.icon}
                />
                <View style={styles.infoContent}>
                  <InfoContent infoUser={detailsUser.age} titleInfo={'Age'} />
                </View>
              </View>
              <View style={styles.infoUser}>
                <Image
                  source={require('../../icon/man.png')}
                  style={styles.icon}
                />
                <View style={styles.infoContent}>
                  <InfoContent
                    infoUser={detailsUser.gender}
                    titleInfo={'Gender'}
                  />
                </View>
              </View>
              <View style={styles.infoUser}>
                <Image
                  source={require('../../icon/email.png')}
                  style={styles.icon}
                />
                <View style={styles.infoContent}>
                  <InfoContent
                    infoUser={detailsUser.email}
                    titleInfo={'Email'}
                  />
                </View>
              </View>
            </View>
          </View>
        );
      }
    }
  }
}
const styles = StyleSheet.create({
  containerVertical: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },
  containerHorizontal: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    backgroundColor: '#F7F7F7',
  },
  containerLoading: {
    flex: 1,
    justifyContent: 'center',
  },
  boxHeader: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3498db',
    marginVertical: 20,
    marginHorizontal: 10,
    flex: 0.9,
  },
  boxInfo: {
    marginVertical: 20,
    marginHorizontal: 15,
  },
  boxContent: {
    flex: 1.1,
    marginHorizontal: 15,
  },
  infoUser: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flex: 1,
  },
  infoContent: {
    marginHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 50,
    height: 50,
  },
  textInfo: {
    color: 'black',
    fontSize: 18,
    fontWeight: '400',
  },
  image: {
    width: 150,
    height: 150,
  },
  fullName: {
    fontFamily: 'Cochin',
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
    fontSize: 18,
    alignSelf: 'center',
  },
  userName: {
    fontFamily: 'Cochin',
    color: 'white',
    fontSize: 15,
    alignSelf: 'center',
  },
  title: {
    fontSize: 12,
    color: 'grey',
  },
  textInput: {},
  iconAction: {
    width: 30,
    height: 30,
  },
  navigationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  boxIconAction: {
    marginHorizontal: 5,
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(DetailsUser);
