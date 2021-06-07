import Parse from 'parse/react-native.js';
const EditUserService = {
  editUser: function (id, fullName, age, email, gender) {
    return new Promise((resolve, reject) => {
      fetch('http://192.168.8.23:8080/user/update/' + id, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: fullName,
          age: age,
          email: email,
          gender: gender,
          modified: new Date(),
        }),
      })
        .then(rs => {
          resolve(rs.status);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  editUserBack4App: function (id, fullName, age, email, gender) {
    return new Promise((resolve, reject) => {
      let query = new Parse.Query('Member');
      query.get(id).then(userObj => {
        userObj.set('fullName', fullName);
        userObj.set('age', age);
        userObj.set('email', email);
        userObj.set('gender', gender);
        userObj
          .save(null)
          .then(rs => {
            console.log(rs);
            resolve(rs);
          })
          .catch(err => {
            console.log('Error :' + err);
            reject(err);
          });
      });
    });
  },
};
export default EditUserService;
