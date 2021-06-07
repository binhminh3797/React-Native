import Parse from 'parse/react-native.js';
const GetUserService = {
  getUserInfo: function () {
    return new Promise((resolve, reject) => {
      fetch('http://192.168.8.23:8080/user/all', {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
      })
        .then(rs => {
          rs.json().then(json => {
            resolve(json);
          });
        })
        .catch(err => {
          console.log(err);
          reject(err);
        });
    });
  },
  getUserInfoBack4App: function (searchValue) {
    return new Promise((resolve, reject) => {
      let query = new Parse.Query('Member');
      query.ascending('createdAt');
      query.matches('fullName', searchValue, 'i');
      query
        .find()
        .then(rs => {
          resolve(rs);
        })
        .catch(err => {
          console.log(err);
          reject(err);
        });
    });
  },
};
export default GetUserService;
