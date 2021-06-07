import Parse from 'parse/react-native.js';
const LoginService = {
  loginBack4App: function (userName, password) {
    return new Promise((resolve, reject) => {
      let query = new Parse.Query('userApp');
      query.equalTo('userName', userName);
      query
        .find()
        .then(rs => {
          if (rs.length === 0) {
            reject('UserName or Password is not correct !');
          } else {
            if (rs[0].get('password') === password) {
              resolve(rs);
            } else {
              reject('UserName or Password is not correct !');
            }
          }
        })
        .catch(err => {
          reject("Can't connect to database ");
          console.log(err);
        });
    });
  },
};
export default LoginService;
