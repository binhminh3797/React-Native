import Parse from 'parse/react-native.js';
const GetDetailsUserService = {
  getDetailsUser: function (id) {
    return new Promise((resolve, reject) => {
      fetch('http://192.168.8.23:8080/user/' + id, {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
      })
        .then(rs => {
          rs.json().then(json => {
            let gender = json.gender === 1 ? 'Male' : 'Female';
            resolve({...json, gender: gender});
          });
        })
        .catch(err => {
          console.log(err);
          reject(err);
        });
    });
  },
  getDetailsUserBack4App: function (id) {
    return new Promise((resolve, reject) => {
      let query = new Parse.Query('Member');
      query.equalTo('objectId', id);
      query
        .find()
        .then(rs => {
          let gender = rs[0].get('gender') === 1 ? 'Male' : 'Female';
          let userDetails = {
            id: rs[0].id,
            fullName: rs[0].get('fullName'),
            age: rs[0].get('age'),
            email: rs[0].get('email'),
            gender: gender,
          };
          resolve(userDetails);
        })
        .catch(err => {
          console.log(err);
          reject(err);
        });
    });
  },
};
export default GetDetailsUserService;
