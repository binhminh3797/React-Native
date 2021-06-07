import React from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {dataItem} from './dataFake';

const Item = ({item}) => {
  return (
    <View style={styles.item}>
      <Image style={styles.imageItem} source={item.iconURL} />
      <Text style={styles.baseText}>{item.nameItem}</Text>
    </View>
  );
};
export default class Home extends React.Component {
  constructor(props) {
    const {width, height} = Dimensions.get('window');
    super(props);
    this.state = {
      navigationFocus: false,
      width: width,
      height: height,
    };
  }
  onChangeHome = () => {
    const windowDevices = Dimensions.get('window');
    this.setState({width: windowDevices.width});
    this.setState({height: windowDevices.height});
  };

  componentDidMount() {
    Dimensions.addEventListener('change', this.onChangeHome);
  }

  componentWillUnmount() {
    Dimensions.removeEventListener('change', this.onChangeHome);
  }
  render() {
    if (this.state.height > this.state.width) {
      return (
        <View style={styles.containerVertical}>
          <View style={styles.boxHeader}>
            <Text style={styles.titleText}>Team Management </Text>
            <Image
              source={require('../../icon/team1.png')}
              style={styles.image}
            />
          </View>
          <View style={styles.boxItem}>
            <FlatList
              styles={styles.flatList}
              contentContainerStyle={styles.flatListContent}
              data={dataItem}
              renderItem={({item}) => (
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate(item.navigate);
                  }}>
                  <Item item={item} />
                </TouchableOpacity>
              )}
              keyExtractor={item => item.id}
            />
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.containerHorizontal}>
          <View style={styles.boxHeader}>
            <Text style={styles.titleText}>Team Management </Text>
            <Image
              source={require('../../icon/team1.png')}
              style={styles.image}
            />
          </View>
          <View style={styles.boxItem}>
            <FlatList
              styles={styles.flatList}
              contentContainerStyle={styles.flatListContent}
              data={dataItem}
              renderItem={({item}) => (
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate(item.navigate);
                  }}>
                  <Item item={item} />
                </TouchableOpacity>
              )}
              keyExtractor={item => item.id}
            />
          </View>
        </View>
      );
    }
  }
}
const styles = StyleSheet.create({
  baseText: {
    fontFamily: 'Cochin',
    marginHorizontal: 30,
    fontSize: 18,
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'red',
    textAlign: 'center',
    marginBottom: 5,
  },
  image: {
    flex: 1,
    width: '100%',
  },
  containerVertical: {
    flexDirection: 'column',
    height: '100%',
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#F7F7F7',
  },
  containerHorizontal: {
    flexDirection: 'row',
    height: '100%',
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#F7F7F7',
  },
  boxHeader: {
    width: '100%',
    flex: 0.8,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginVertical: 10,
    marginHorizontal: 20,
  },
  boxItem: {
    flex: 1.2,
    width: '100%',
  },

  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 10,
    marginHorizontal: 16,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  imageItem: {
    height: 50,
    width: 50,
    resizeMode: 'stretch',
  },
  flatList: {
    width: '100%',
  },
  flatListContent: {
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
});
