import Parse from 'parse/react-native.js';
const RegisterService = {
  registerBack4App: function (userName, password, email) {
    return new Promise((resolve, reject) => {
      let userApp = new Parse.Object('userApp');
      userApp.set('userName', userName);
      userApp.set('password', password);
      userApp.set('email', email);
      userApp
        .save()
        .then(rs => {
          console.log(rs);
          resolve(rs);
        })
        .catch(err => {
          console.log(err);
          reject('Register Failed');
        });
    });
  },
};
export default RegisterService;
