import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
export default class TeamDetailsInformation extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.boxHeader}>
          <Image
            source={require('../../icon/secure.png')}
            style={styles.image}
          />
        </View>
        <View style={styles.boxContent}>
          <Text>
            In any industry where the people behind a company are as important
            as the company itself, you’re likely to find a kind of expanded
            “about” page that includes information on individual employees.
            “Meet the Team” pages are popular among web design and other
            creative firms, but are also found on sites within various other
            industries. These pages are a valuable addition to any site where
            human contact is an important part of the industry. It adds a
            personal touch to the company and can lend trust to visitors.
            There’s suddenly faces behind the names, and it becomes a “real”
            company to the visitor, rather than just another website. This
            builds credibility for many, especially considering how concerned
            many people are with online scams and phishing schemes. Adding
            information to a website on a company’s key employees is a simple
            but effective way to make that company stand out in the mind of its
            prospective clients. Below are a handful of trends and some
            interesting examples of “Meet the Team” pages.
          </Text>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },
  boxHeader: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    marginHorizontal: 10,
    flex: 0.5,
  },
  boxContent: {
    flex: 1.5,
    marginHorizontal: 15,
    marginVertical: 10,
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
  },
});
