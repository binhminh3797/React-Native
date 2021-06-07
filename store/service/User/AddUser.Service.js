import Parse from 'parse/react-native.js';
const AddUserService = {
  addUser: function (userName, fullName, age, email, gender) {
    return new Promise((resolve, reject) => {
      fetch('http://192.168.8.23:8080/admin/signup', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userName: userName,
          password: '123',
          age: age,
          fullName: fullName,
          email: email,
          img: 'test',
          gender: gender,
          created: '2020-12-17',
          modified: '2020-12-17',
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
  addUserBack4App: function (fullName, age, email, gender) {
    return new Promise((resolve, reject) => {
      const memberObj = new Parse.Object('Member');
      memberObj.set('fullName', fullName);
      memberObj.set('age', Number(age));
      memberObj.set('email', email);
      memberObj.set('gender', Number(gender));
      memberObj
        .save()
        .then(rs => {
          //console.log(fullName, age, email, gender);
          console.log(rs);
          resolve(rs);
        })
        .catch(err => {
          console.log(err);
          reject(err);
        });
    });
  },
};
export default AddUserService;
